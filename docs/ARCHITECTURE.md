# 🏗️ Arquitetura do Projeto Fala.AI

Este documento descreve a arquitetura e padrões de código utilizados no projeto.

## 📁 Estrutura de Pastas

```
src/
├── components/
│   ├── presentation/     # Componentes de apresentação (UI pura)
│   ├── ui/              # Componentes UI base (shadcn/ui)
│   └── ...              # Componentes contextuais e utilitários
├── containers/          # Componentes container (lógica de negócio)
├── contexts/            # Contexts do React
├── hooks/               # Hooks customizados reutilizáveis
└── ...
```

## 🎯 Padrões de Arquitetura

### Container/Presentation Pattern

O projeto utiliza o padrão **Container/Presentation** (também conhecido como Smart/Dumb Components) para separar a lógica de negócio da apresentação.

#### Container Components (`src/containers/`)
- **Responsabilidade**: Gerenciar estado, lógica de negócio e efeitos colaterais
- **Características**:
  - Conectam-se a hooks e contexts
  - Processam dados e eventos
  - Passam props para componentes de apresentação
  - Não contêm JSX complexo ou estilização

**Exemplo:**
```typescript
// src/containers/HeroContainer.tsx
import { useHeroLogic } from "../hooks/useHeroLogic";
import { HeroPresentation } from "../components/presentation/HeroPresentation";

export function HeroContainer() {
  const { animationsEnabled, handleCTAClick } = useHeroLogic();
  
  return (
    <HeroPresentation 
      animationsEnabled={animationsEnabled}
      onCTAClick={handleCTAClick}
    />
  );
}
```

#### Presentation Components (`src/components/presentation/`)
- **Responsabilidade**: Renderizar UI baseada em props
- **Características**:
  - Recebem todas as props necessárias
  - Não gerenciam estado próprio (exceto UI local)
  - Não fazem chamadas de API ou efeitos colaterais
  - Fáceis de testar e reutilizar

**Exemplo:**
```typescript
// src/components/presentation/HeroPresentation.tsx
interface HeroPresentationProps {
  animationsEnabled: boolean;
  onCTAClick: (sectionId: string) => void;
}

export function HeroPresentation({ 
  animationsEnabled, 
  onCTAClick 
}: HeroPresentationProps) {
  // Apenas renderização
  return (
    <section>
      {/* JSX */}
    </section>
  );
}
```

### Hook Pattern

Hooks customizados são extraídos dos componentes para:
- **Reutilização**: Lógica compartilhada entre componentes
- **Testabilidade**: Fácil de testar isoladamente
- **Organização**: Separação clara de responsabilidades

#### Estrutura de Hooks (`src/hooks/`)

**Exemplo:**
```typescript
// src/hooks/useHeroLogic.ts
import { useAnimation } from './useAnimation';

export function useHeroLogic() {
  const { animationsEnabled } = useAnimation();

  const handleCTAClick = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return {
    animationsEnabled,
    handleCTAClick,
  };
}
```

## 🔄 Fluxo de Dados

```
Context/API → Hook → Container → Presentation → UI
```

1. **Context/API**: Fonte de dados global ou externa
2. **Hook**: Extrai e processa dados do context
3. **Container**: Usa o hook e passa dados para apresentação
4. **Presentation**: Renderiza UI baseada nas props
5. **UI**: Interface visual final

## 📝 Convenções de Nomenclatura

### Containers
- Nome: `[ComponentName]Container.tsx`
- Exemplo: `HeroContainer.tsx`, `ContactFormContainer.tsx`

### Presentation Components
- Nome: `[ComponentName]Presentation.tsx`
- Exemplo: `HeroPresentation.tsx`, `ContactFormPresentation.tsx`

### Hooks
- Nome: `use[Feature]Logic.ts` ou `use[Feature].ts`
- Exemplo: `useHeroLogic.ts`, `useContactForm.ts`

### Contexts
- Nome: `[Feature]Context.tsx`
- Exemplo: `AnimationContext.tsx`, `AccessibilityContext.tsx`

## 🎨 Benefícios desta Arquitetura

1. **Separação de Responsabilidades**: Lógica separada da apresentação
2. **Reutilização**: Componentes de apresentação podem ser reutilizados
3. **Testabilidade**: Fácil testar lógica e UI separadamente
4. **Manutenibilidade**: Código mais organizado e fácil de entender
5. **Escalabilidade**: Fácil adicionar novos recursos seguindo o padrão

## 📚 Exemplos Práticos

### Criando um Novo Componente

1. **Criar o Hook** (`src/hooks/useNewFeature.ts`):
```typescript
export function useNewFeature() {
  // Lógica aqui
  return { data, handlers };
}
```

2. **Criar o Presentation Component** (`src/components/presentation/NewFeaturePresentation.tsx`):
```typescript
interface NewFeaturePresentationProps {
  // Props aqui
}

export function NewFeaturePresentation(props: NewFeaturePresentationProps) {
  // Renderização aqui
}
```

3. **Criar o Container** (`src/containers/NewFeatureContainer.tsx`):
```typescript
import { useNewFeature } from "../hooks/useNewFeature";
import { NewFeaturePresentation } from "../components/presentation/NewFeaturePresentation";

export function NewFeatureContainer() {
  const logic = useNewFeature();
  return <NewFeaturePresentation {...logic} />;
}
```

4. **Usar no App** (`src/App.tsx`):
```typescript
import { NewFeatureContainer } from "./containers";

// ...
<NewFeatureContainer />
```

## 🔍 Migração de Componentes Existentes

Para migrar um componente existente para o padrão Container/Presentation:

1. Identificar a lógica do componente
2. Extrair para um hook customizado
3. Criar componente de apresentação com props
4. Criar container que conecta hook e apresentação
5. Atualizar imports no App.tsx

## 📖 Referências

- [Container/Presentation Pattern](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)
- [React Hooks](https://react.dev/reference/react)
- [React Context](https://react.dev/reference/react/createContext)


