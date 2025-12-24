const CACHE_NAME = 'falaai-v1';
const STATIC_CACHE_NAME = 'falaai-static-v1';
const DYNAMIC_CACHE_NAME = 'falaai-dynamic-v1';

// Recursos estáticos para cache inicial
const STATIC_ASSETS = [
  '/',
  '/index.html',
];

// Tipos de recursos para cache
const CACHEABLE_TYPES = [
  'application/javascript',
  'text/css',
  'image/webp',
  'image/png',
  'image/jpeg',
  'image/svg+xml',
  'font/woff2',
  'font/woff',
];

// Estratégia: Cache First para assets estáticos
async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  
  if (cached) {
    return cached;
  }
  
  try {
    const response = await fetch(request);
    
    // Só cachear se for um tipo cacheável e status OK
    if (response.ok && shouldCache(request, response)) {
      cache.put(request, response.clone());
    }
    
    return response;
  } catch (error) {
    // Se falhar e tiver cache, retornar do cache mesmo que antigo
    if (cached) {
      return cached;
    }
    throw error;
  }
}

// Estratégia: Network First para HTML
async function networkFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  
  try {
    const response = await fetch(request);
    
    if (response.ok) {
      cache.put(request, response.clone());
    }
    
    return response;
  } catch (error) {
    const cached = await cache.match(request);
    if (cached) {
      return cached;
    }
    throw error;
  }
}

// Verificar se deve cachear o recurso
function shouldCache(request, response) {
  const url = new URL(request.url);
  
  // Não cachear requisições de API externas
  if (url.origin !== location.origin) {
    // Permitir apenas recursos estáticos de CDNs confiáveis
    const allowedOrigins = ['https://vlibras.gov.br'];
    if (!allowedOrigins.some(origin => url.href.startsWith(origin))) {
      return false;
    }
  }
  
  // Verificar tipo de conteúdo
  const contentType = response.headers.get('content-type');
  if (!contentType) return false;
  
  return CACHEABLE_TYPES.some(type => contentType.includes(type));
}

// Instalação do Service Worker
self.addEventListener('install', (event) => {
  console.log('[SW] Instalando service worker...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Cache estático criado');
        // Não pre-cachear tudo aqui para instalação mais rápida
        return cache.addAll(STATIC_ASSETS).catch((err) => {
          console.warn('[SW] Erro ao pre-cachear:', err);
        });
      })
      .then(() => self.skipWaiting())
  );
});

// Ativação do Service Worker
self.addEventListener('activate', (event) => {
  console.log('[SW] Ativando service worker...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => {
              // Remover caches antigos
              return cacheName !== STATIC_CACHE_NAME && 
                     cacheName !== DYNAMIC_CACHE_NAME &&
                     cacheName.startsWith('falaai-');
            })
            .map((cacheName) => {
              console.log('[SW] Removendo cache antigo:', cacheName);
              return caches.delete(cacheName);
            })
        );
      })
      .then(() => self.clients.claim())
  );
  
  // Atualizar imediatamente quando nova versão é ativada
  event.waitUntil(self.clients.matchAll().then(clients => {
    clients.forEach(client => {
      client.postMessage({ type: 'SW_UPDATED' });
    });
  }));
});

// Interceptação de requisições
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Ignorar requisições não GET
  if (request.method !== 'GET') {
    return;
  }
  
  // Ignorar requisições do Chrome extension
  if (url.protocol === 'chrome-extension:') {
    return;
  }
  
  // Estratégia diferente por tipo de recurso
  if (request.destination === 'document' || url.pathname === '/' || url.pathname.endsWith('.html')) {
    // Network First para HTML
    event.respondWith(networkFirst(request, DYNAMIC_CACHE_NAME));
  } else if (
    request.destination === 'script' ||
    request.destination === 'style' ||
    request.destination === 'image' ||
    request.destination === 'font'
  ) {
    // Cache First para assets estáticos
    event.respondWith(cacheFirst(request, STATIC_CACHE_NAME));
  } else {
    // Network First para outros recursos
    event.respondWith(networkFirst(request, DYNAMIC_CACHE_NAME));
  }
});

// Mensagens do cliente
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => caches.delete(cacheName))
      );
    }).then(() => {
      if (event.ports && event.ports[0]) {
        event.ports[0].postMessage({ success: true });
      }
    });
  }
});

