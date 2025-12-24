# Estrutura SCSS com BEM

Este projeto utiliza SCSS (Sass) com a metodologia BEM (Block Element Modifier) para organização dos estilos.

## Estrutura de Diretórios

```
src/styles/
├── main.scss                 # Arquivo principal que importa todos os módulos
├── base/                     # Estilos base e fundamentais
│   ├── _variables.scss       # Variáveis CSS customizadas
│   ├── _typography.scss      # Estilos de tipografia
│   └── _reset.scss          # Reset e preferências de movimento
├── components/               # Estilos de componentes usando BEM
│   ├── _focus.scss          # Estilos de foco para acessibilidade
│   ├── _high-contrast.scss  # Modo de alto contraste
│   └── _vlibras.scss        # Customizações do VLibras
└── utilities/               # Utilitários
    └── _sr-only.scss        # Screen reader only
```

## Metodologia BEM

BEM (Block Element Modifier) é uma metodologia de nomenclatura que ajuda a criar componentes reutilizáveis e manter o código organizado.

### Estrutura BEM

- **Block**: Componente independente (ex: `.team`, `.about`)
- **Element**: Parte de um bloco (ex: `.team__title`, `.team__member`)
- **Modifier**: Variação de um bloco ou elemento (ex: `.team__member--featured`)

### Exemplo de Uso

```scss
// Block
.team {
  padding: 5rem 0;
  
  // Element
  &__container {
    max-width: 80rem;
  }
  
  &__title {
    font-size: 2.25rem;
  }
  
  &__member {
    padding: 1.5rem;
    
    // Modifier
    &--featured {
      border: 3px solid var(--fala-primary);
    }
  }
}
```

### No HTML/JSX

```jsx
<section className="team">
  <div className="team__container">
    <h2 className="team__title">Quem Somos</h2>
    <div className="team__grid">
      <div className="team__member team__member--featured">
        {/* conteúdo */}
      </div>
    </div>
  </div>
</section>
```

## Convenções

1. **Nomes em português**: Os blocos podem usar nomes descritivos em português quando apropriado
2. **Aninhamento**: Use `&` para elementos e modificadores dentro do bloco
3. **Variáveis CSS**: Sempre use variáveis CSS definidas em `_variables.scss`
4. **Media queries**: Use `@media` dentro dos elementos quando necessário
5. **Comentários**: Documente blocos e elementos importantes

## Adicionando Novos Componentes

1. Crie um arquivo `_nome-do-componente.scss` em `components/`
2. Use a estrutura BEM para organizar os estilos
3. Importe o arquivo em `main.scss` usando `@use 'components/nome-do-componente';`

### Exemplo

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

## Variáveis CSS

Todas as variáveis estão definidas em `base/_variables.scss`. Use-as sempre que possível:

```scss
.meu-componente {
  color: var(--fala-text-primary);
  background-color: var(--fala-white-snow);
  border-color: var(--fala-border);
}
```

## Integração com Tailwind

Este projeto também utiliza Tailwind CSS. Os estilos SCSS com BEM são complementares e podem ser usados para:
- Componentes complexos que precisam de organização específica
- Estilos que não se encaixam bem no sistema de utilitários do Tailwind
- Manutenção de código legado ou estilos muito específicos

## Build

O Vite compila automaticamente os arquivos SCSS durante o build. Certifique-se de que todos os `@use` estão antes de qualquer `@import` no arquivo `main.scss`.

