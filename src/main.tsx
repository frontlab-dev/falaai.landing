
  import { createRoot } from "react-dom/client";
  import App from "./App.tsx";
  import "./index.css";
  import "./styles/main.scss";
  import * as serviceWorkerRegistration from "./utils/serviceWorkerRegistration";

  createRoot(document.getElementById("root")!).render(<App />);

  // Registrar service worker para PWA
  serviceWorkerRegistration.register({
    onUpdate: (registration) => {
      // Quando há uma atualização disponível
      const shouldUpdate = window.confirm(
        'Nova versão disponível! Deseja atualizar agora?'
      );
      if (shouldUpdate && registration.waiting) {
        registration.waiting.postMessage({ type: 'SKIP_WAITING' });
        window.location.reload();
      }
    },
    onSuccess: () => {
      console.warn('✅ Service Worker registrado - App pode funcionar offline');
    },
  });
  