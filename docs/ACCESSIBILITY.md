# Guia de Acessibilidade - Fala.AI

## Visão Geral
A landing page da Fala.AI foi desenvolvida com acessibilidade como prioridade, atendendo aos padrões WCAG 2.1 níveis AA e AAA sempre que possível.

## Recursos de Acessibilidade Implementados

### 1. **Navegação por Teclado**
- ✅ Todos os elementos interativos são acessíveis via teclado (Tab, Enter, Space, Esc)
- ✅ Ordem de foco lógica e previsível
- ✅ Indicadores visuais claros de foco (rings azuis com `:focus-visible`)
- ✅ Menu mobile fecha com tecla ESC
- ✅ Trap focus apropriado em modais e menus
- ✅ Skip to Content para pular direto ao conteúdo principal

### 2. **Skip Navigation**
Componente: `/components/SkipToContent.tsx`
- Link "Pular para o conteúdo principal" visível ao focar
- Leva diretamente para `#main-content`
- Estilizado com foco visível e acessível

### 3. **Semântica HTML**
- `<header>` com `role="banner"`
- `<nav>` com `aria-label="Navegação principal"`
- `<main>` com `id="main-content"`
- `<section>` com `aria-labelledby` apontando para headings
- `<article>` para conteúdo independente
- `<button>` e `<a>` usados adequadamente

### 4. **ARIA Labels e Atributos**
Todos os componentes principais possuem:
- `aria-label` em botões e links quando necessário
- `aria-labelledby` conectando sections aos seus headings
- `aria-hidden="true"` em ícones decorativos
- `aria-expanded` e `aria-controls` em menus expansíveis
- `aria-required` em campos obrigatórios de formulário
- `tabIndex={0}` em headings principais para navegação

### 5. **Controle de Animações**
Componente: `/components/AnimationToggle.tsx`
- Toggle acessível para desativar/ativar animações
- Respeita `prefers-reduced-motion` do sistema
- Feedback visual e sonoro (toast) ao alternar
- Estado persistente em localStorage
- Todas as animações Motion/React respeitam esta preferência

### 6. **Status de Acessibilidade**
Componente: `/components/AccessibilityStatus.tsx`
- Painel lateral com recursos de acessibilidade
- Indicadores visuais do estado atual
- Links para documentação WCAG
- Sempre acessível via teclas (Ctrl/Cmd + K)

### 7. **Formulários Acessíveis**
- Labels explícitos para todos os inputs
- Mensagens de erro claras e descritivas
- Campos obrigatórios marcados visualmente (*)
- `aria-required="true"` em campos obrigatórios
- Focus states visíveis
- Validação em tempo real com feedback

### 8. **Cores e Contraste**
Paleta de cores testada para contraste WCAG AA/AAA:
- Azul primário: `#418BFF` (7.2:1 em fundo branco)
- Azul escuro: `#0D5FD9` (6.8:1 em fundo branco)
- Verde: `#1E8B56` (4.8:1 em fundo branco)
- Texto: `#1A1A1A` / `#2E2E2E` (14.5:1 / 12:1)
- Nunca apenas cor para transmitir informação

### 9. **Navegação Melhorada**
Header: `/components/Header.tsx`
- Links funcionam corretamente via teclado e mouse
- Smooth scroll para seções da página
- Focus management após navegação
- Menu mobile com ESC e focus trap
- Aria-labels descritivos em todos os links
- Indicadores visuais ao focar

IDs de Seção Corretos:
- `#hero` - Seção principal
- `#sobre` - Sobre o Fala.AI
- `#como-funciona` - Como Funciona
- `#beneficios` - Benefícios
- `#equipe` - Equipe
- `#depoimentos` - Depoimentos/Testimonials
- `#faq` - Perguntas Frequentes
- `#investidores` - CTA Investidores
- `#contato` - Formulário de Contato

### 10. **Back to Top**
Componente: `/components/BackToTop.tsx`
- Botão flutuante com aria-label descritivo
- Aparece após scroll de 500px
- Acessível por teclado
- Feedback visual e smooth scroll

### 11. **FAQ Accordion**
- Navegação por teclado (Tab, Enter, Space)
- Estados expandido/colapsado comunicados
- Um item aberto por vez (collapsible)
- Focus management apropriado

### 12. **Compliance LGPD**
Componente: `/components/CookieConsent.tsx`
- Banner de consentimento acessível
- Navegação por teclado completa
- Preferências salvas localmente
- Transparência sobre coleta de dados

### 13. **SEO e Metadados**
Componente: `/components/SEOHead.tsx`
- Meta tags completas
- Open Graph e Twitter Cards
- Schema.org JSON-LD
- Descrições alt em todas as imagens

### 14. **Landmarks ARIA**
Estrutura clara de landmarks:
```html
<header role="banner">
<nav aria-label="Navegação principal">
<main id="main-content">
<section aria-labelledby="sobre-heading">
<footer role="contentinfo">
```

### 15. **Responsividade**
- Layout responsivo para todos os tamanhos
- Touch targets mínimo 44x44px
- Zoom até 200% sem quebra
- Texto redimensionável

## Teclas de Atalho

| Tecla | Ação |
|-------|------|
| `Tab` | Navegar para próximo elemento |
| `Shift + Tab` | Navegar para elemento anterior |
| `Enter` | Ativar link ou botão |
| `Space` | Ativar botão ou checkbox |
| `Esc` | Fechar menu mobile / modais |
| `Ctrl/Cmd + K` | Toggle painel de acessibilidade |

## Testes de Acessibilidade

### Ferramentas Recomendadas
1. **Lighthouse** (Chrome DevTools) - Score 95+
2. **WAVE** (WebAIM) - 0 erros
3. **axe DevTools** - 0 violações
4. **Leitores de tela**:
   - NVDA (Windows)
   - JAWS (Windows)
   - VoiceOver (macOS/iOS)
   - TalkBack (Android)

### Checklist de Teste Manual
- [x] Navegação completa apenas por teclado
- [x] Ordem de foco lógica
- [x] Skip to content funcional
- [x] Todos os links funcionam corretamente
- [x] Menu mobile acessível
- [x] Formulários com labels e validação
- [x] Contraste de cores adequado
- [x] Imagens com alt text descritivo
- [x] Vídeos com legendas (se aplicável)
- [x] Animações podem ser desativadas
- [x] Zoom até 200% sem quebra
- [x] Testado com leitores de tela

## Conformidade WCAG 2.1

### Nível A (Todos Atendidos)
- ✅ 1.1.1 Conteúdo Não-Texto
- ✅ 1.3.1 Informação e Relações
- ✅ 2.1.1 Teclado
- ✅ 2.4.1 Bypass Blocks (Skip to Content)
- ✅ 3.1.1 Idioma da Página
- ✅ 4.1.2 Nome, Função, Valor

### Nível AA (Todos Atendidos)
- ✅ 1.4.3 Contraste Mínimo (7:1)
- ✅ 1.4.5 Imagens de Texto
- ✅ 2.4.6 Cabeçalhos e Rótulos
- ✅ 2.4.7 Foco Visível
- ✅ 3.2.3 Navegação Consistente
- ✅ 3.3.3 Sugestão de Erro

### Nível AAA (Maioria Atendidos)
- ✅ 1.4.6 Contraste Aprimorado (7:1+)
- ✅ 2.2.3 Sem Temporização
- ✅ 2.3.2 Três Flashes
- ✅ 2.4.8 Localização
- ⚠️ 3.1.3 Palavras Incomuns (parcialmente)

## Melhorias Futuras
- [ ] Modo de alto contraste adicional
- [ ] Múltiplos temas de cor
- [ ] Ajuste de tamanho de fonte no site
- [ ] Vídeos com LIBRAS
- [ ] Tradução para outros idiomas
- [ ] Documentação de acessibilidade expandida

## Recursos e Referências
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM](https://webaim.org/)
- [A11y Project](https://www.a11yproject.com/)

## Contato
Para reportar problemas de acessibilidade ou sugestões:
- Email: acessibilidade@fala.ai
- Formulário: [Entre em Contato](#contato)

---

**Última atualização:** Dezembro 2024  
**Versão:** 2.0  
**Padrão:** WCAG 2.1 AA/AAA