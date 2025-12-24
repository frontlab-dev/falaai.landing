# 🚀 Guia de Deployment - Fala.AI Landing Page

Este documento fornece instruções detalhadas para fazer o deployment da aplicação Fala.AI usando Docker.

## 📋 Índice

- [Pré-requisitos](#pré-requisitos)
- [Estrutura Docker](#estrutura-docker)
- [Deployment Local](#deployment-local)
- [Deployment em Produção](#deployment-em-produção)
- [Configuração do Nginx](#configuração-do-nginx)
- [Troubleshooting](#troubleshooting)

## Pré-requisitos

### Ferramentas Necessárias

- **Docker** 20.10+ ([Instalação](https://docs.docker.com/get-docker/))
- **Docker Compose** 2.0+ ([Instalação](https://docs.docker.com/compose/install/))

### Verificar Instalação

```bash
# Verificar versão do Docker
docker --version

# Verificar versão do Docker Compose
docker-compose --version
```

## Estrutura Docker

O projeto inclui uma estrutura Docker completa na pasta `docker/`:

```
docker/
├── Dockerfile           # Multi-stage build (Node.js + Nginx)
├── docker-compose.yml   # Orquestração de containers
├── nginx.conf          # Configuração do Nginx para SPA
└── .dockerignore       # Arquivos ignorados no build
```

### Dockerfile

O Dockerfile utiliza uma abordagem **multi-stage build**:

1. **Stage 1 (builder)**: 
   - Base: `node:20-alpine`
   - Instala dependências
   - Executa build da aplicação

2. **Stage 2 (production)**:
   - Base: `nginx:alpine`
   - Copia arquivos buildados
   - Configura Nginx para servir a aplicação

**Vantagens**:
- Imagem final otimizada (~25MB vs ~500MB)
- Apenas arquivos necessários no container final
- Build mais rápido em deployments subsequentes

### docker-compose.yml

Configuração simplificada para orquestração:

- **Service**: `falaai-landing`
- **Port**: `80:80` (host:container)
- **Restart**: `unless-stopped` (reinicia automaticamente)
- **Network**: Rede isolada para o container

### nginx.conf

Configuração otimizada para Single Page Application (SPA):

- **SPA Routing**: Todas as rotas retornam `index.html`
- **Gzip Compression**: Compressão automática de assets
- **Cache Headers**: Cache otimizado para assets estáticos
- **Security Headers**: Headers de segurança configurados

## Deployment Local

### 1. Build e Execução

```bash
# Na raiz do projeto, construir e executar
docker-compose -f docker/docker-compose.yml up --build
```

### 2. Executar em Background

```bash
# Executar em modo detached (background)
docker-compose -f docker/docker-compose.yml up -d --build
```

### 3. Verificar Status

```bash
# Ver status dos containers
docker-compose -f docker/docker-compose.yml ps

# Ver logs
docker-compose -f docker/docker-compose.yml logs -f
```

### 4. Parar Containers

```bash
# Parar containers
docker-compose -f docker/docker-compose.yml down

# Parar e remover volumes (se houver)
docker-compose -f docker/docker-compose.yml down -v
```

### 5. Acessar Aplicação

Após iniciar os containers, a aplicação estará disponível em:

```
http://localhost:80
```

## Deployment em Produção

### Opção 1: Docker Compose (Recomendado para VPS)

#### 1. Preparar Servidor

```bash
# Atualizar sistema
sudo apt update && sudo apt upgrade -y

# Instalar Docker e Docker Compose
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER

# Instalar Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

#### 2. Deploy da Aplicação

```bash
# Clonar repositório
git clone <repository-url>
cd falaai-landing.AI

# Construir e executar
docker-compose -f docker/docker-compose.yml up -d --build
```

#### 3. Configurar Nginx Reverso (Opcional)

Se precisar de um proxy reverso ou SSL, configure um Nginx externo:

```nginx
server {
    listen 80;
    server_name falaai.me;

    location / {
        proxy_pass http://localhost:80;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### Opção 2: Build Manual

```bash
# Construir imagem
docker build -f docker/Dockerfile -t falaai-landing:latest .

# Executar container
docker run -d \
  --name falaai-landing \
  -p 80:80 \
  --restart unless-stopped \
  falaai-landing:latest
```

### Opção 3: Registries de Container (Docker Hub, ECR, etc.)

#### Build e Push

```bash
# Tag da imagem
docker build -f docker/Dockerfile -t falaai-landing:latest .
docker tag falaai-landing:latest seu-registry/falaai-landing:latest

# Push para registry
docker push seu-registry/falaai-landing:latest
```

#### Pull e Deploy

```bash
# Pull da imagem
docker pull seu-registry/falaai-landing:latest

# Executar container
docker run -d \
  --name falaai-landing \
  -p 80:80 \
  --restart unless-stopped \
  seu-registry/falaai-landing:latest
```

## Configuração do Nginx

O arquivo `docker/nginx.conf` está otimizado para a aplicação. Principais configurações:

### SPA Routing

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

Garante que todas as rotas retornem `index.html` (necessário para React Router).

### Gzip Compression

```nginx
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_types text/plain text/css text/xml text/javascript application/javascript application/json;
```

Reduz o tamanho dos arquivos transferidos.

### Cache de Assets

```nginx
location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

Assets estáticos são cacheados por 1 ano.

### Security Headers

```nginx
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
```

Headers de segurança configurados.

## Troubleshooting

### Container não inicia

```bash
# Ver logs detalhados
docker-compose -f docker/docker-compose.yml logs

# Verificar se a porta está em uso
sudo lsof -i :80
```

### Build falha

```bash
# Limpar cache do Docker
docker system prune -a

# Reconstruir sem cache
docker-compose -f docker/docker-compose.yml build --no-cache
```

### Aplicação não carrega

1. Verificar se o container está rodando:
```bash
docker-compose -f docker/docker-compose.yml ps
```

2. Verificar logs:
```bash
docker-compose -f docker/docker-compose.yml logs -f
```

3. Verificar se a porta está correta:
```bash
curl http://localhost:80
```

### Problemas de permissão

```bash
# Adicionar usuário ao grupo docker
sudo usermod -aG docker $USER

# Fazer logout e login novamente
```

### Limpar tudo e recomeçar

```bash
# Parar e remover containers
docker-compose -f docker/docker-compose.yml down -v

# Remover imagens
docker rmi $(docker images -q falaai-landing)

# Limpar sistema Docker
docker system prune -a
```

## Otimizações

### Variáveis de Ambiente

Para adicionar variáveis de ambiente, edite `docker/docker-compose.yml`:

```yaml
services:
  falaai-landing:
    environment:
      - NODE_ENV=production
      - API_URL=https://api.falaai.me
```

### Portas Customizadas

Para alterar a porta, edite `docker/docker-compose.yml`:

```yaml
services:
  falaai-landing:
    ports:
      - "8080:80"  # host:container
```

### Volumes para Persistência

Se precisar de volumes, adicione em `docker/docker-compose.yml`:

```yaml
services:
  falaai-landing:
    volumes:
      - ./logs:/var/log/nginx
```

## Monitoramento

### Verificar Uso de Recursos

```bash
# Estatísticas do container
docker stats falaai-landing

# Informações detalhadas
docker inspect falaai-landing
```

### Health Checks

Adicione health check em `docker/docker-compose.yml`:

```yaml
services:
  falaai-landing:
    healthcheck:
      test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost:80"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
```

## Próximos Passos

- [ ] Configurar SSL/HTTPS com Let's Encrypt
- [ ] Configurar CI/CD para deploy automático
- [ ] Adicionar monitoramento (Prometheus, Grafana)
- [ ] Configurar backup automático
- [ ] Implementar blue-green deployment

## Referências

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Nginx Documentation](https://nginx.org/en/docs/)
- [React Router - Deployment](https://reactrouter.com/en/main/start/overview#deployment)

---

**Última atualização**: 2024

