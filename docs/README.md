# 📚 Documentação do Projeto Fala.AI

Esta pasta contém toda a documentação do projeto.

## 📄 Documentos Disponíveis

- **[PROJECT_README.md](./PROJECT_README.md)** - Documentação principal do projeto
- **[ACCESSIBILITY.md](./ACCESSIBILITY.md)** - Guia completo de acessibilidade (WCAG 2.1 AA/AAA)
- **[Attributions.md](./Attributions.md)** - Atribuições de recursos utilizados
- **[Guidelines.md](./Guidelines.md)** - Diretrizes e padrões do projeto

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

## 📖 Leia Mais

Consulte os documentos específicos para mais detalhes sobre cada tópico.
