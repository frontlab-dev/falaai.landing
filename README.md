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

Toda a documentação do projeto está na pasta [`docs/`](./docs/):

- **[README.md](./docs/README.md)** - Índice da documentação
- **[PROJECT_README.md](./docs/PROJECT_README.md)** - Documentação completa do projeto
- **[ARCHITECTURE.md](./docs/ARCHITECTURE.md)** - Arquitetura e padrões de código
- **[ACCESSIBILITY.md](./docs/ACCESSIBILITY.md)** - Guia de acessibilidade (WCAG 2.1 AA/AAA)
- **[Attributions.md](./docs/Attributions.md)** - Atribuições de recursos
- **[Guidelines.md](./docs/Guidelines.md)** - Diretrizes do projeto

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
- **Tailwind CSS v4** - Estilização
- **Shadcn/ui** - Componentes UI
- **Vite** - Build tool

## 📄 Licença

Projeto privado - Fala.AI

---

**Desenvolvido com ❤️ e acessibilidade em mente**

*Fala.AI - Tecnologia que dá voz a quem precisa*


