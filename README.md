# 🗣️ Fala.AI - Landing Page

Landing page completa e profissional para a startup **Fala.AI**, um aplicativo de comunicação assistiva para pessoas com dificuldades de fala.

## 🚀 Início Rápido

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build
```

## 📚 Documentação

A documentação do projeto está disponível em formato interativo usando **Docsify**.

### 🚀 Visualizar Documentação

```bash
# Instalar dependências (se ainda não instalou)
npm install

# Iniciar servidor de documentação (abre automaticamente no navegador)
npm run docs

# Ou iniciar sem abrir automaticamente
npm run docs:dev
```

A documentação estará disponível em `http://localhost:3001`

### 📄 Documentos Disponíveis

- **[Visão Geral do Projeto](./docs/PROJECT_README.md)** - Documentação completa do projeto
- **[Arquitetura](./docs/ARCHITECTURE.md)** - Arquitetura e padrões de código
- **[Acessibilidade](./docs/ACCESSIBILITY.md)** - Guia de acessibilidade (WCAG 2.1 AA/AAA)
- **[Estilos](./docs/STYLES.md)** - Guia de estilos SCSS com BEM
- **[Diretrizes](./docs/Guidelines.md)** - Diretrizes do projeto
- **[Migração](./docs/MIGRATION.md)** - Guia de migração
- **[Atribuições](./docs/Attributions.md)** - Atribuições de recursos

## 🏗️ Arquitetura

O projeto utiliza os seguintes padrões:

- **Container/Presentation Pattern**: Separação entre lógica e apresentação
- **Hook Pattern**: Hooks customizados reutilizáveis
- **Context API**: Gerenciamento de estado global

Consulte [ARCHITECTURE.md](./docs/ARCHITECTURE.md) para mais detalhes.

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── presentation/     # Componentes de apresentação (UI pura)
│   ├── ui/              # Componentes UI base (shadcn/ui)
│   └── ...              # Componentes contextuais
├── containers/          # Componentes container (lógica)
├── contexts/            # Contexts do React
├── hooks/               # Hooks customizados
└── ...
```

## 🛠️ Tecnologias

- **React** - Framework principal
- **TypeScript** - Tipagem estática
- **Motion/React** - Animações
- **Tailwind CSS v4** - Estilização utilitária
- **SCSS/Sass** - Estilização com metodologia BEM
- **Shadcn/ui** - Componentes UI
- **Vite** - Build tool

## 📄 Licença

Projeto privado - Fala.AI

---

**Desenvolvido com ❤️ e acessibilidade em mente**

*Fala.AI - Tecnologia que dá voz a quem precisa*


