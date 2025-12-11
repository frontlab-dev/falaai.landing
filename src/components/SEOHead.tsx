import { useEffect } from "react";

export function SEOHead() {
  useEffect(() => {
    // Define o título da página
    document.title = "Fala.AI - Comunicação Assistiva Acessível e Inclusiva";

    // Define meta tags
    const setMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? "property" : "name";
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      
      meta.setAttribute("content", content);
    };

    // Meta tags essenciais
    setMetaTag("description", "Fala.AI é uma plataforma de comunicação assistiva que transforma vidas. Tecnologia acessível, inclusiva e colaborativa para pessoas com dificuldades de fala.");
    setMetaTag("keywords", "comunicação assistiva, acessibilidade, tecnologia assistiva, fonoaudiologia, inclusão, Fala.AI");
    setMetaTag("author", "Fala.AI");
    setMetaTag("viewport", "width=device-width, initial-scale=1.0");
    setMetaTag("theme-color", "#418BFF");

    // Open Graph / Facebook
    setMetaTag("og:title", "Fala.AI - Comunicação Assistiva Acessível", true);
    setMetaTag("og:description", "Tecnologia assistiva que transforma vidas através da comunicação acessível e inclusiva.", true);
    setMetaTag("og:type", "website", true);
    setMetaTag("og:locale", "pt_BR", true);
    setMetaTag("og:site_name", "Fala.AI", true);

    // Twitter
    setMetaTag("twitter:card", "summary_large_image");
    setMetaTag("twitter:title", "Fala.AI - Comunicação Assistiva Acessível");
    setMetaTag("twitter:description", "Tecnologia assistiva que transforma vidas através da comunicação acessível e inclusiva.");

    // Acessibilidade
    const htmlElement = document.documentElement;
    htmlElement.setAttribute("lang", "pt-BR");

    // Carregar VLibras CSS se necessário
    const vlibrasCSS = document.querySelector('link[href*="vlibras"]');
    if (!vlibrasCSS) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://vlibras.gov.br/app/vlibras-plugin.css';
      document.head.appendChild(link);
    }

    // JSON-LD Structured Data para SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Fala.AI",
      "description": "Plataforma de comunicação assistiva que transforma vidas através da tecnologia acessível e inclusiva",
      "url": "https://fala.ai",
      "logo": "https://fala.ai/logo.png",
      "foundingDate": "2024",
      "founders": [
        {
          "@type": "Person",
          "name": "Helen Barbosa",
          "jobTitle": "CEO"
        },
        {
          "@type": "Person",
          "name": "Ana Beatriz",
          "jobTitle": "CPO"
        },
        {
          "@type": "Person",
          "name": "João Victor",
          "jobTitle": "CFO"
        },
        {
          "@type": "Person",
          "name": "Israel Sampaio",
          "jobTitle": "CTO"
        }
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "email": "contato@fala.ai"
      },
      "sameAs": [
        "https://linkedin.com/company/fala-ai",
        "https://instagram.com/fala.ai"
      ]
    };

    // Adiciona JSON-LD ao head
    let scriptTag = document.querySelector('script[type="application/ld+json"]');
    if (!scriptTag) {
      scriptTag = document.createElement("script");
      scriptTag.setAttribute("type", "application/ld+json");
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(structuredData);

  }, []);

  return null;
}