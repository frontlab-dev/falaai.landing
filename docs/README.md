# 📚 Documentação do Projeto Fala.AI

Bem-vindo à documentação completa do projeto **Fala.AI Landing Page**!

Esta documentação fornece uma visão abrangente da arquitetura, padrões de código, estilos e diretrizes do projeto.

## 🚀 Início Rápido

Para começar a trabalhar no projeto, consulte a [Documentação Principal do Projeto](PROJECT_README.md) que contém informações sobre instalação, tecnologias utilizadas e estrutura básica.

## 📄 Documentos Disponíveis

### 📖 Documentação Principal
- **[Visão Geral do Projeto](PROJECT_README.md)** - Documentação principal do projeto, tecnologias e features
- **[Arquitetura](ARCHITECTURE.md)** - Arquitetura e padrões de código (Container/Presentation Pattern)
- **[Guia de Estilos](STYLES.md)** - Guia completo de estilos SCSS com metodologia BEM
- **[Acessibilidade](ACCESSIBILITY.md)** - Guia completo de acessibilidade (WCAG 2.1 AA/AAA)
- **[Diretrizes](Guidelines.md)** - Diretrizes e padrões do projeto

### 🔧 Guias Técnicos
- **[Migração](MIGRATION.md)** - Guia de migração e atualizações
- **[Resumo](SUMMARY.md)** - Resumo da reorganização do projeto
- **[Limpeza](CLEANUP.md)** - Documentação de limpeza e otimização

### 📝 Outros
- **[Atribuições](Attributions.md)** - Atribuições de recursos utilizados no projeto

## 🏗️ Estrutura do Projeto

O projeto segue os seguintes padrões de arquitetura:

### Container/Presentation Pattern
- **Containers** (`src/containers/`): Componentes que contêm lógica de negócio, estado e efeitos
- **Presentation** (`src/components/presentation/`): Componentes puros de apresentação, recebem props e renderizam UI

### Hook Pattern
- **Hooks** (`src/hooks/`): Hooks customizados reutilizáveis extraídos dos componentes

### Estrutura de Pastas
```
src/
├── components/
│   ├── presentation/     # Componentes de apresentação (UI pura)
│   ├── ui/              # Componentes UI base (shadcn/ui)
│   └── ...              # Componentes contextuais e utilitários
├── containers/          # Componentes container (lógica)
├── hooks/               # Hooks customizados
├── styles/              # Estilos SCSS organizados com BEM
│   ├── base/            # Variáveis, tipografia, reset
│   ├── components/      # Estilos de componentes
│   └── utilities/       # Utilitários
└── ...
```

## 🎯 Padrões de Código

### Container Component
```typescript
// src/containers/HeroContainer.tsx
import { useHeroLogic } from '../hooks/useHeroLogic';
import { HeroPresentation } from '../components/presentation/HeroPresentation';

export function HeroContainer() {
  const logic = useHeroLogic();
  return <HeroPresentation {...logic} />;
}
```

### Presentation Component
```typescript
// src/components/presentation/HeroPresentation.tsx
interface HeroPresentationProps {
  onCTAClick: (sectionId: string) => void;
  animationsEnabled: boolean;
}

export function HeroPresentation({ onCTAClick, animationsEnabled }: HeroPresentationProps) {
  // Apenas renderização, sem lógica
}
```

### Custom Hook
```typescript
// src/hooks/useHeroLogic.ts
export function useHeroLogic() {
  // Lógica e estado
  return { onCTAClick, animationsEnabled };
}
```

### Estilos SCSS com BEM
```scss
// src/styles/components/_novo-componente.scss
.novo-componente {
  &__container {
    // estilos do container
  }
  
  &__titulo {
    // estilos do título
  }
  
  &--variante {
    // modificador
  }
}
```

## 🎨 Estilização

O projeto utiliza uma abordagem híbrida:

- **Tailwind CSS v4**: Classes utilitárias para desenvolvimento rápido
- **SCSS com BEM**: Organização modular para componentes complexos

Consulte [STYLES.md](./STYLES.md) para mais detalhes sobre a estrutura de estilos.

## 📖 Leia Mais

Consulte os documentos específicos para mais detalhes sobre cada tópico.
