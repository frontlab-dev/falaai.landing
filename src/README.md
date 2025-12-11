# 🗣️ Fala.AI - Landing Page

Landing page completa e profissional para a startup **Fala.AI**, um aplicativo de comunicação assistiva para pessoas com dificuldades de fala.

## 🎨 Design e Identidade Visual

### Paleta de Cores (WCAG AA/AAA)
- **Primary Blue**: `#418BFF` / `#0D5FD9` (texto)
- **Primary Teal**: `#007F86` / `#005F66` (texto)
- **Cyan Soft**: `#3DD6D0`
- **Black Coal**: `#1A1A1A` (AAA compliant)
- **Gray Dark**: `#2E2E2E` (AAA para texto)
- **Gray Medium**: `#5A5A5A` (AA para texto secundário)
- **White Snow**: `#FAFAFA`

### Tipografia
- **Fonte**: Inter (Google Fonts)
- **Pesos**: 300, 400, 500, 600, 700

## 📋 Estrutura de Seções

### 1. **Hero Section**
- Título impactante com gradiente
- Dois CTAs principais: "Quero testar" e "Sou investidor"
- Mascote lontra com animação flutuante
- Wave separator decorativo

### 2. **Sobre o Fala.AI**
- Apresentação da missão e visão
- Cards informativos sobre a solução
- Animações de entrada suaves

### 3. **Estatísticas Animadas**
- Contadores animados com efeito de contagem
- 4 métricas principais: usuários, mensagens, satisfação, crescimento
- Ícones ilustrativos de cada métrica

### 4. **Como Funciona**
- 3 passos ilustrados do funcionamento
- Cards com hover effects
- Timeline visual do processo

### 5. **Seção da Mascote**
- Apresentação da lontra mascote
- Storytelling visual
- Animações interativas

### 6. **Equipe**
- Cards dos 4 fundadores:
  - Helen Barbosa (CEO)
  - Ana Beatriz (CPO)
  - João Victor (CFO)
  - Israel Sampaio (CTO)
- Links para redes sociais
- Design profissional e acessível

### 7. **Monetização**
- 3 planos de pricing: Gratuito, Premium, Profissional
- Comparativo de funcionalidades
- CTAs para cada plano

### 8. **Benefícios**
- Grid de benefícios com ícones
- Cards interativos
- Foco em acessibilidade e inclusão

### 9. **Depoimentos**
- 6 testimonials reais
- Variados perfis: fonoaudiólogos, pais, terapeutas, usuários
- Design em card com avatares gradiente
- Aspas decorativas

### 10. **Parceiros e Mídia**
- Logos de parceiros (UFBA, SENAI, Google, AWS)
- Menções na mídia
- Layout profissional

### 11. **FAQ (Perguntas Frequentes)**
- 10 perguntas e respostas detalhadas
- Accordion interativo e acessível
- Design limpo e organizado

### 12. **CTA para Investidores**
- Seção dedicada a investidores
- Métricas de tração
- Call-to-action destacado

### 13. **Formulário de Contato**
- Campos validados
- Feedback em tempo real com Sonner
- Design responsivo

### 14. **Newsletter**
- Captura de leads
- Design com gradiente e elementos decorativos
- Validação de e-mail

### 15. **Footer**
- Links de navegação
- Redes sociais
- Copyright e informações legais

## ♿ Recursos de Acessibilidade (WCAG 2.1 AA/AAA)

### Navegação por Teclado
- ✅ Skip to Content link
- ✅ Indicadores de foco visíveis (outline de 3px)
- ✅ Ordem de tabulação lógica
- ✅ Todos os elementos interativos acessíveis via teclado

### Controle de Animações
- ✅ Toggle global para pausar/retomar animações
- ✅ Respeita `prefers-reduced-motion` do sistema
- ✅ Feedback visual de status
- ✅ Persistência de preferência

### Semântica e ARIA
- ✅ HTML5 semântico correto
- ✅ ARIA landmarks (`banner`, `main`, `contentinfo`, `navigation`)
- ✅ Hierarquia de títulos lógica (H1-H4)
- ✅ Labels descritivos em todos os elementos interativos

### Contraste e Cores
- ✅ Contraste AAA/AA em todos os textos
- ✅ Não dependência apenas de cor para informação
- ✅ Paleta testada e validada

### Navegação Adicional
- ✅ Back to Top button (aparece após scroll)
- ✅ Accessibility Status indicator
- ✅ Scroll suave com suporte a motion preferences

### SEO
- ✅ Meta tags completas (Open Graph, Twitter Cards)
- ✅ JSON-LD structured data
- ✅ Atributo lang="pt-BR"
- ✅ Títulos e descrições otimizados

## 🎭 Animações

Todas as animações são implementadas com **Motion/React** (Framer Motion) e podem ser:
- Pausadas globalmente via toggle
- Desabilitadas automaticamente para usuários com `prefers-reduced-motion`
- Suaves e performáticas

### Tipos de Animações
- **Fade in** com movimento Y
- **Scale** em cards e imagens
- **Contadores animados** em estatísticas
- **Hover effects** em botões e cards
- **Floating animation** na mascote
- **Progress bar** no loading screen

## 🚀 Tecnologias Utilizadas

- **React** - Framework principal
- **TypeScript** - Tipagem estática
- **Motion/React** - Animações fluidas e controladas
- **Tailwind CSS v4** - Estilização moderna
- **Lucide React** - Ícones SVG
- **Sonner** - Sistema de notificações toast
- **Shadcn/ui** - Componentes UI acessíveis

## 📱 Responsividade

Design 100% responsivo com breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

Layout adaptativo com grid e flexbox, mantendo usabilidade em todas as resoluções.

## 🎯 Principais Funcionalidades

1. **Loading Screen** - Tela de carregamento com barra de progresso
2. **Header Fixo** - Navegação sticky com menu mobile
3. **Navegação Suave** - Scroll suave entre seções
4. **Formulários Validados** - Validação em tempo real
5. **Sistema de Toast** - Feedback visual para ações
6. **Dark Mode Ready** - Preparado para modo escuro (vars CSS)
7. **Performance Otimizada** - Lazy loading e otimizações

## 📊 Métricas de Impacto

A landing page exibe:
- 500+ usuários ativos
- 10.000+ mensagens enviadas
- 98% satisfação dos usuários
- 150% crescimento mensal

## 👥 Equipe Fala.AI

- **Helen Barbosa** - CEO
- **Ana Beatriz** - CPO (Chief Product Officer)
- **João Victor** - CFO (Chief Financial Officer)
- **Israel Sampaio** - CTO (Chief Technology Officer)

## 📄 Documentação Adicional

- `/ACCESSIBILITY.md` - Declaração completa de acessibilidade
- `/Attributions.md` - Atribuições de recursos utilizados
- `/guidelines/Guidelines.md` - Diretrizes do projeto

## 🎨 Inspiração Design

Design inspirado no Duolingo, com:
- Cores vibrantes e acessíveis
- Mascote carismático (lontra)
- Interface limpa e amigável
- Microinterações deliciosas
- Feedback visual consistente

## 🔒 Privacidade e Segurança

- Conformidade com LGPD
- Dados criptografados
- Não compartilhamento com terceiros
- Política de privacidade clara

## 📞 Contato

- **Email**: contato@fala.ai
- **Investidores**: investidores@fala.ai
- **Website**: https://fala.ai

---

**Desenvolvido com ❤️ e acessibilidade em mente**

*Fala.AI - Tecnologia que dá voz a quem precisa*
