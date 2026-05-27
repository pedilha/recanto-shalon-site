---
name: Recanto Shalon Eventos
description: Sistema visual de um venue de eventos em Aparecida de Goiânia — vinho profundo, ouro de vela, e a permanência de um álbum de casamento.
colors:
  vinho-sangue: "#4A0F1B"
  vinho-tinto: "#6B1B2A"
  vinho-vivo: "#8A2438"
  ouro-vela: "#C9A84C"
  ouro-claro: "#E8CC80"
  ouro-palido: "#F5E8C0"
  branco-quente: "#FDFAF5"
  creme-off: "#F2EBE0"
  creme: "#EDE0CC"
  cinza-100: "#F8F3EE"
  cinza-200: "#E8DDD2"
  cinza-300: "#C8B4A2"
  cinza-400: "#A89080"
  cinza-600: "#6B5A50"
  cinza-700: "#4C3C35"
  cinza-800: "#2E1F1A"
  preto-quente: "#1A0F0C"
typography:
  display:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "clamp(3.2rem, 10vw, 7rem)"
    fontWeight: 300
    lineHeight: 1.0
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "clamp(1.9rem, 4.5vw, 2.8rem)"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.01em"
  title:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "clamp(1.5rem, 3.5vw, 2rem)"
    fontWeight: 600
    lineHeight: 1.2
  body:
    fontFamily: "Jost, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Jost, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    letterSpacing: "0.25em"
rounded:
  sharp: "2px"
  subtle: "4px"
  gentle: "6px"
  pill: "50px"
spacing:
  xs: "0.5rem"
  sm: "1rem"
  md: "1.5rem"
  lg: "3rem"
  section: "4.5rem 1.25rem"
components:
  button-primary:
    backgroundColor: "{colors.ouro-vela}"
    textColor: "{colors.vinho-sangue}"
    rounded: "{rounded.sharp}"
    padding: "0.85rem 1.8rem"
  button-primary-hover:
    backgroundColor: "{colors.ouro-claro}"
    textColor: "{colors.vinho-sangue}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ouro-claro}"
    rounded: "{rounded.sharp}"
    padding: "0.85rem 1.8rem"
  button-ghost-hover:
    backgroundColor: "rgba(201,168,76,0.12)"
    textColor: "{colors.ouro-claro}"
  nav-cta:
    backgroundColor: "{colors.ouro-vela}"
    textColor: "{colors.vinho-sangue}"
    rounded: "{rounded.sharp}"
    padding: "0.55rem 1.2rem"
---

# Design System: Recanto Shalon Eventos

## 1. Overview

**Creative North Star: "O Álbum de Casamento"**

Este sistema visual foi construído como um álbum de casamento físico: cada seção é uma página, cada cor é uma escolha com peso emocional. O branco não existe neste sistema — apenas o creme envelhecido do papel texturado. O ouro não é decor — é a borda dourada que separa o ordinário do memorável. O vinho não é escuridão — é a capa de couro que protege o que há dentro.

A tipografia espelha esse objeto: Cormorant Garamond nos títulos, com o peso de um convite impresso em papel algodão; Jost no corpo, com a limpeza de uma legenda discreta. A hierarquia é dramaticamente escalar — não há dúvida entre o que comanda e o que serve. O display em weight 300 na escala máxima cria abertura; o weight 600 nos headings ancora o olhar.

O sistema tem um único objetivo por página: mover o visitante em direção ao botão de WhatsApp sem que ele perceba que foi guiado. Cada seção existe para aprofundar a confiança, não para preencher espaço.

**Key Characteristics:**
- Paleta comprometida: vinho profundo como cor dominante, ouro de vela como acento (estratégia Committed)
- Dois pesos extremos (300 e 600) dentro de Cormorant Garamond — sem intermediários
- Elevação tonal: sombras tingidas com vinho, não cinza neutro
- Transições ease-out-expo em hovers e reveals; ease-in-out apenas em abertura/fechamento de menu mobile
- Scroll-reveal com delays escalonados de 120ms — nenhum elemento explode na tela


## 2. Colors: A Paleta do Álbum

Uma paleta comprometida com dois papéis: o vinho sustenta as superfícies de identidade; o ouro de vela pontua com precisão. Os cremes substituem o branco em toda superfície neutra.

### Primary
- **Vinho Sangue** (`#4A0F1B`): A cor mais funda do sistema. Usada como fundo de seções escuras (incluso, CTA banner), overlay do hero (com opacidade), e como base de gradientes de cards. Quando vista de longe parece quase preta — a profundidade é o ponto.
- **Vinho Tinto** (`#6B1B2A`): O vinho reconhecível. Header scrollado, bordas de cards de espaço, gradientes de hover de componentes ativos.
- **Vinho Vivo** (`#8A2438`): Variante ativa e de hover. Nunca usado em estado de repouso.

### Secondary
- **Ouro de Vela** (`#C9A84C`): O único acento. Estrelas, ícones decorativos, bullets, bordas de foco, dots do carrossel ativos, capacidade dos espaços, e fundo do botão primário (via gradiente). Sua escassez é o que o torna legível como sinal de qualidade.
- **Ouro Claro** (`#E8CC80`): Texto sobre fundos escuros (hero, footer), hover de links de navegação, variante clara do botão primário em hover.
- **Ouro Pálido** (`#F5E8C0`): Background tint sutil no card de depoimento em destaque. Não deve aparecer em outros contextos.

### Neutral
- **Branco Quente** (`#FDFAF5`): Background padrão do `<body>` e de cards sobre fundos claros. Nunca `#FFFFFF`.
- **Creme Off** (`#F2EBE0`): Background da seção de avaliações.
- **Creme** (`#EDE0CC`): Bordas suaves de separação onde o cinza-200 seria excessivo.
- **Cinza 100** (`#F8F3EE`): Background de seções alternadas (Espaços, Localização).
- **Cinza 200** (`#E8DDD2`): Bordas padrão de cards, inputs e divisores.
- **Cinza 300** (`#C8B4A2`): Bordas de botões de ação secundários em repouso.
- **Cinza 400** (`#A89080`): Tags descritivas de baixo contraste intencional (tipo de evento, eyebrows secundários).
- **Cinza 600** (`#6B5A50`): Corpo de texto secundário — descrições e subtítulos de cards.
- **Cinza 700** (`#4C3C35`): Texto de suporte em listas de features e diferenciais.
- **Cinza 800** (`#2E1F1A`): Texto principal sobre fundos claros.
- **Preto Quente** (`#1A0F0C`): Fundo do footer. Nunca `#000000`.

### Named Rules
**A Regra do Acento Único.** O ouro de vela aparece em no máximo 20% de qualquer tela clara. Em superfícies escuras (vinho) ele pode ser mais generoso — mas apenas em detalhes pontuais. Se parece que há ouro demais, há ouro demais.

**A Regra dos Cremes.** Nenhuma superfície neutra é branco puro. Todo `#FFF` vira `#FDFAF5`. Todo gray genérico vira o creme mais próximo do contexto.

**A Regra das Sombras Tonais.** Toda `box-shadow` usa `rgba(74, 15, 27, x)` como cor da sombra — nunca `rgba(0,0,0,x)`. Sombras cinzas quebram o tom quente do sistema.


## 3. Typography

**Display Font:** Cormorant Garamond (com fallback Georgia, serif)
**Body Font:** Jost (com fallback system-ui, sans-serif)

**Character:** Cormorant carrega a seriedade de um convite impresso em papel algodão — serifes finos, italic com personalidade, diferença dramática entre os pesos. Jost não compete: é a legenda no verso da foto, direta e útil. As duas fontes nunca disputam atenção.

### Hierarchy
- **Display** (weight 300, `clamp(3.2rem, 10vw, 7rem)`, line-height 1.0): O título principal do hero — aparece uma única vez por página. O weight 300 extremamente leve em tamanho extremamente grande cria o contraste central. O `<em>` interno em weight 600 italic com cor dourada é o único adorno permitido dentro do display.
- **Headline** (weight 600, `clamp(1.9rem, 4.5vw, 2.8rem)`, line-height 1.2): Títulos de seção (`h2`). Nunca em uppercase — a caixa alta pertence exclusivamente às labels.
- **Title** (weight 600, `clamp(1.5rem, 3.5vw, 2rem)`, line-height 1.2): Títulos de cards e artigos (`h3`). Em itálico dourado quando são nomes próprios de espaços.
- **Body** (weight 400, `1rem`, line-height 1.6): Texto corrido. Máximo 65–75 caracteres por linha. Cor `cinza-600` sobre fundos claros; `rgba(253,250,245,0.7)` sobre fundos escuros.
- **Label** (weight 500, `0.75rem`, letter-spacing `0.25em`, uppercase): Eyebrows de seção. Sempre em ouro de vela. Aparecem acima de cada `h2` com `margin-bottom: 0.75rem`.

### Named Rules
**A Regra do Peso Duplo.** Dentro de Cormorant Garamond, existem apenas dois pesos em uso: 300 (abertura, leveza, drama de escala) e 600 (âncora, nome, ação). O weight 400 de Cormorant não é utilizado — ele pertence à Jost. Usar pesos intermediários no display nivela a hierarquia.


## 4. Elevation

Este sistema usa sombras tonais aquecidas — não flat, não glassmorphism. Cada sombra é tingida com o vinho da paleta para que os objetos pareçam flutuar sobre a mesma superfície aquecida, não sobre um plano genérico cinza.

### Shadow Vocabulary
- **Ambient** (`0 2px 12px rgba(74,15,27,0.12)`): Repouso de cards pequenos (avaliações, itens de serviço). Quase imperceptível — sinaliza que "há um objeto aqui" sem anunciar.
- **Structural** (`0 6px 30px rgba(74,15,27,0.18)`): Cards de espaço em repouso e cards em hover. O objeto se levantou.
- **Lifted** (`0 16px 60px rgba(74,15,27,0.22)`): Hover dos cards de espaço. O pico do sistema.

### Named Rules
**A Regra do Flat-at-Rest.** Superfícies começam planas ou com sombra ambient. As sombras structural e lifted aparecem apenas em resposta a interação (hover). A sombra lifted em repouso é o teto do sistema — usá-la em estado estático deixa sem para onde ir.


## 5. Components

### Buttons
- **Shape:** Quase quadrado (2px radius) — o mínimo necessário para não parecer um retângulo bruto, com a precisão de uma etiqueta gravada.
- **Primary (btn-gold):** Gradiente 135deg de ouro-vela (`#C9A84C`) para ouro-claro (`#E8CC80`), texto vinho-sangue, `padding: 0.85rem 1.8rem`. Em hover: gradiente invertido + lift de 2px + `box-shadow: 0 8px 30px rgba(201,168,76,0.5)`.
- **Ghost (btn-outline):** Fundo transparente, borda 1px ouro-vela, texto ouro-claro. Em hover: `background: rgba(201,168,76,0.12)` + lift de 2px.
- **Large (.btn-lg):** `padding: 1rem 2.2rem`, `font-size: 0.95rem`. Usado apenas no CTA banner.
- **Typography:** Jost weight 500, `font-size: 0.875rem`, letter-spacing `0.08em`, uppercase. O botão não grita — anuncia.

### Chips / Tags
- **Servico Tag:** `background: rgba(201,168,76,0.1)`, borda 1px `rgba(201,168,76,0.25)`, texto ouro-vela, radius 2px, uppercase com tracking largo. Indica categoria sem competir com o título do serviço.
- **Espaco Badge:** Faixa superior do card de espaço. Cor específica por identidade: rústico em tons terrosos (`#4A2212`), sofisticado em vinho.

### Cards / Containers
- **Corner Style:** Subtle (4px) para a maioria dos cards; gentle (6px) para containers maiores.
- **Espaco Card:** `background: branco-quente`, borda 1px cinza-200, sombra structural em repouso, lifted em hover. O carrossel não tem radius próprio — herda o overflow do card pai.
- **Incluso / Servico Cards:** Background `cinza-100` ou `branco-quente`, borda 1px cinza-200, sombra ambient. Sem transform em repouso.
- **Featured Review:** Background gradiente com tint ouro-pálido, borda dourada, tipografia 1.3× maior que os cards regulares, avatar 56px. É o único card que usa o tint ouro-pálido.
- **Internal Padding:** `1.75rem 1.5rem` padrão; `2rem 1.5rem` para servico-card; `2.25rem 2rem` para featured review.

### Navigation
- **Desktop:** Jost weight 400, `0.82rem`, uppercase, letter-spacing `0.1em`, cor `rgba(253,250,245,0.85)`. Em hover: `ouro-claro`. Link ativo detectado por scroll: `ouro-claro` via JavaScript.
- **CTA Nav (Orçamento):** Gradiente ouro-vela, texto vinho-sangue, weight 600, radius 2px. Em hover: sombra dourada + lift de 1px.
- **Mobile:** Fundo vinho-sangue, links com borda inferior sutil em dourado translúcido. Em hover: cor ouro-claro + indent de `padding-left` (1.5rem → 2rem). CTA mobile centralizado em gradiente dourado.

### Carrossel
- **Track:** `transition: transform 0.6s ease-out-expo`. Nunca animar `left`, `margin` ou `width`.
- **Botões prev/next:** Círculos 40px, fundo vinho translúcido com `backdrop-filter: blur(4px)`, borda 1px dourada. Em hover: `scale(1.08)` preservando o `translateY(-50%)`.
- **Dots:** 7px, brancos translúcidos em repouso; ouro-vela + `scale(1.3)` no ativo.
- **Slide overlay:** Gradiente de baixo para cima (vinho escuro → transparent) para legibilidade da caption.

### Scroll Reveal (componente de comportamento)
- **Estado inicial:** `opacity: 0; transform: translateY(28px)`.
- **Trigger:** `IntersectionObserver` com `threshold: 0.12`, `rootMargin: 0px 0px -40px 0px`. Anima uma única vez; `unobserve` após disparar.
- **Delays escalonados:** 0s / 120ms / 240ms / 360ms / 480ms.
- **Redução de movimento:** `prefers-reduced-motion: reduce` zera todas as transições e anima imediatamente.


## 6. Do's and Don'ts

### Do:
- **Do** usar `#FDFAF5` como background base em toda superfície branca — nunca `#FFFFFF` ou `#FFF`.
- **Do** tingir toda `box-shadow` com `rgba(74,15,27,x)` para manter a coerência tonal quente.
- **Do** usar `cubic-bezier(0,0,0.2,1)` (ease-out-expo) em hovers e reveals. Reservar `cubic-bezier(0.4,0,0.2,1)` (ease-in-out) para a transição de abertura/fechamento do menu mobile e do header.
- **Do** sempre preceder um `h2` com uma label em Jost uppercase ouro — "NOSSA HISTÓRIA" → "Cada evento merece um cenário perfeito".
- **Do** usar o gradiente dourado (ouro-vela → ouro-claro, 135deg) exclusivamente em botões primários e no nav-cta. Em nenhum outro elemento.
- **Do** diferenciar visualmente os dois espaços: tons terrosos (`#2D1B10`, `#4A2212`) para o rústico; vinho-deep para o sofisticado.
- **Do** respeitar o `prefers-reduced-motion` — o CSS já cobre isso; não introduzir animações inline em JS sem checar a media query.

### Don't:
- **Don't** usar `background-clip: text` com gradiente — proibido. Títulos recebem cor sólida; ênfase por peso e tamanho, nunca por efeito gráfico.
- **Don't** usar `border-left` maior que 1px como faixa decorativa colorida em cards, listas ou callouts. Jamais.
- **Don't** usar glassmorphism decorativo — blurs e transparências em cards em repouso. O `backdrop-filter` existe apenas nos botões do carrossel e no badge do hero, porque estão sobrepostos a fotografias.
- **Don't** usar Cormorant Garamond em weight 400 — só 300 e 600 estão no sistema. O intermediário nivela o contraste que é a razão de existir da fonte aqui.
- **Don't** repetir o template de ícone grande + título + texto em grid idêntico para mais de 4 cards. Diferenciar visualmente antes de expandir.
- **Don't** criar a sensação de site de buffet genérico (tabelas de preço expostas, clipart, layout estático), venue americano (branco asséptico, fontes script excessivas, vetores de renda), template corporativo (azul royal + cinza, muito texto técnico), nem estética influencer (pastel, múltiplas fontes, layout de story).
- **Don't** usar bounce ou elastic em animações. O sistema não pula — desliza para fora.
- **Don't** usar `transform: translateY` como único feedback de hover em cards de conteúdo com texto. O movimento sutil no título (padding-left) comunica foco com mais precisão do que elevar o card inteiro.
