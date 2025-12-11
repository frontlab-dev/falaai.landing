import { useEffect, useState } from 'react';
import { useAccessibility } from './AccessibilityContext';

// Componente VLibras do react-vlibras
function VLibras() {
  useEffect(() => {
    // Carregar o script do VLibras
    const script = document.createElement('script');
    script.src = 'https://vlibras.gov.br/app/vlibras-plugin.js';
    script.async = true;
    script.onload = () => {
      // @ts-ignore
      new window.VLibras.Widget('https://vlibras.gov.br/app');
    };
    document.head.appendChild(script);

    return () => {
      // Cleanup
      const vlibrasScript = document.querySelector('script[src*="vlibras-plugin.js"]');
      if (vlibrasScript) {
        vlibrasScript.remove();
      }
    };
  }, []);

  return (
    <div vw-access-button="true" className="enabled">
      <div vw-plugin-wrapper="true">
        <div className="vw-plugin-top-wrapper"></div>
      </div>
    </div>
  );
}

export function LibrasWidget() {
  const { librasEnabled } = useAccessibility();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !librasEnabled) {
    return null;
  }

  return (
    <div vw="true" className="enabled">
      <div vw-access-button="true" className="active"></div>
      <div vw-plugin-wrapper="true">
        <div className="vw-plugin-top-wrapper"></div>
      </div>
    </div>
  );
}
