# 🗣️ Fala.AI - Landing Page

Landing page completa e profissional para a startup **Fala.AI**, um aplicativo de comunicação assistiva para pessoas com dificuldades de fala.

## 📋 Sobre o Projeto

O Fala.AI é uma plataforma de comunicação assistiva que utiliza inteligência artificial para dar voz e autonomia a pessoas com dificuldades de fala. Esta landing page foi desenvolvida com foco em acessibilidade, performance e experiência do usuário.

## 🚀 Início Rápido

### Pré-requisitos

- Node.js 18+ e npm
- Git

### Instalação

```bash
# Clone o repositório
git clone <repository-url>

# Instale as dependências
npm install

# Execute em modo desenvolvimento
npm run dev

# Build para produção
npm run build
```

## 🛠️ Tecnologias

### Core
- **React 18** - Framework principal
- **TypeScript** - Tipagem estática
- **Vite 6** - Build tool e dev server

### Estilização
- **Tailwind CSS v4** - Framework CSS utilitário
- **SCSS/Sass** - Pré-processador CSS com metodologia BEM
- **Shadcn/ui** - Componentes UI base

### Animações e Interatividade
- **Motion/React** - Biblioteca de animações
- **Face-api.js** - Detecção facial para navegação

### Acessibilidade
- **VLibras** - Tradutor de português para Libras
- **WCAG 2.1 AA/AAA** - Conformidade com padrões de acessibilidade

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes React
│   ├── presentation/   # Componentes de apresentação (UI pura)
│   ├── ui/            # Componentes UI base (shadcn/ui)
│   └── ...            # Componentes contextuais
├── containers/        # Componentes container (lógica)
├── contexts/          # Contexts do React
├── hooks/             # Hooks customizados
├── styles/            # Estilos SCSS organizados
│   ├── base/          # Variáveis, tipografia, reset
│   ├── components/    # Estilos de componentes
│   └── utilities/     # Utilitários
└── assets/            # Recursos estáticos
```

## 🏗️ Arquitetura

O projeto segue padrões modernos de arquitetura React:

### Container/Presentation Pattern
- **Containers**: Gerenciam lógica, estado e efeitos
- **Presentation**: Renderizam UI baseada em props

### Hook Pattern
- Hooks customizados para lógica reutilizável
- Separação clara de responsabilidades

### Context API
- Gerenciamento de estado global
- Contextos para animações e acessibilidade

Consulte [ARCHITECTURE.md](./ARCHITECTURE.md) para mais detalhes.

## 🎨 Estilização

### Tailwind CSS
- Classes utilitárias para desenvolvimento rápido
- Sistema de design consistente

### SCSS com BEM
- Organização modular de estilos
- Metodologia BEM para nomenclatura
- Variáveis CSS customizadas

Consulte [STYLES.md](./STYLES.md) para mais detalhes.

## ♿ Acessibilidade

O projeto foi desenvolvido seguindo os padrões WCAG 2.1 AA/AAA:

- **Navegação por teclado**: Todos os elementos interativos são acessíveis
- **Leitores de tela**: Conteúdo semântico e ARIA labels
- **Alto contraste**: Modo de alto contraste disponível
- **Redução de movimento**: Respeita preferências do usuário
- **VLibras**: Integração com tradutor de Libras

Consulte [ACCESSIBILITY.md](./ACCESSIBILITY.md) para mais detalhes.

## 📚 Documentação

Toda a documentação está na pasta [`docs/`](./README.md):

- **[README.md](./README.md)** - Índice da documentação
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Arquitetura e padrões
- **[STYLES.md](./STYLES.md)** - Guia de estilos SCSS/BEM
- **[ACCESSIBILITY.md](./ACCESSIBILITY.md)** - Guia de acessibilidade
- **[Guidelines.md](./Guidelines.md)** - Diretrizes do projeto
- **[MIGRATION.md](./MIGRATION.md)** - Guia de migração

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento

# Build
npm run build        # Build para produção

# Análise
npm run preview      # Preview do build de produção
```

## 📦 Dependências Principais

### Produção
- `react` - Framework React
- `react-dom` - DOM renderer
- `motion` - Animações
- `face-api.js` - Detecção facial
- `@djpfs/react-vlibras` - VLibras React

### Desenvolvimento
- `typescript` - Tipagem estática
- `vite` - Build tool
- `sass` - Pré-processador SCSS
- `@vitejs/plugin-react-swc` - Plugin React para Vite

## 🎯 Features Principais

- ✅ Landing page responsiva
- ✅ Animações suaves e performáticas
- ✅ Navegação por detecção facial
- ✅ Modo de alto contraste
- ✅ Suporte a VLibras
- ✅ Formulário de contato funcional
- ✅ SEO otimizado
- ✅ Performance otimizada

## 📄 Licença

Projeto privado - Fala.AI

---

**Desenvolvido com ❤️ e acessibilidade em mente**

*Fala.AI - Tecnologia que dá voz a quem precisa*
