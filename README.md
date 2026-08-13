# Recanto Shalon Eventos

Site institucional do Recanto Shalon, venue de eventos em Aparecida de Goiânia (GO). Dois espaços — rústico ao ar livre e salão climatizado — apresentados em uma única página projetada para converter visitantes em contatos via WhatsApp.

**[recantoshaloneventos.com.br](https://recantoshaloneventos.com.br)**

---

## Stack

- HTML5 semântico · CSS custom properties · JavaScript vanilla
- Sem build step, sem framework, sem dependências de pacote
- Hospedagem: GitHub Pages (branch `master`, domínio customizado via `CNAME`)
- Fontes: [Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond) + [Jost](https://fonts.google.com/specimen/Jost) via Google Fonts

---

## Estrutura

```
recanto-shalon/
├── index.html          # Página única (SPA sem roteamento)
├── style.css           # Todos os estilos; tokens em :root
├── script.js           # Comportamentos (menu, galeria, scroll, reveals)
├── content.json        # Conteúdo editável (avaliações, galeria)
├── logo.png            # Logotipo principal
├── admin.html          # Painel CMS (GitHub API, login + estilos inline)
├── assets/
│   ├── img/            # Imagens estáticas referenciadas no HTML
│   ├── logo_wpp.png
│   └── logo_insta.png
├── fotos-recanto1/     # Galeria do Espaço Externo
├── fotos-recanto2/     # Galeria do Espaço Interno
├── CNAME               # recantoshalon.com.br
├── PRODUCT.md          # Contexto estratégico (usuários, propósito, personalidade)
├── DESIGN.md           # Sistema de design (tokens, tipografia, componentes)
└── .impeccable/
    └── design.json     # Sidecar para o painel /impeccable live
```

---

## Rodar localmente

Qualquer servidor HTTP estático serve. Exemplos:

```bash
# Python
python -m http.server 8080

# Node (npx)
npx serve .

# VS Code: extensão Live Server
```

Abra `http://localhost:8080`. Sem variáveis de ambiente, sem banco, sem build.

---

## Painel de administração

`admin.html` é um CMS leve que edita `content.json` diretamente no repositório via GitHub API.

**Requisitos:**
- Token de acesso pessoal do GitHub com escopo `contents: write` no repositório
- Acesso via HTTPS (o GitHub API exige origem não-`file://`)

**Campos editáveis:** avaliações de clientes (nome, nota, texto), lista de fotos da galeria, qualquer chave presente no `content.json`.

As alterações fazem commit automático em `master`. O GitHub Pages reflete em ~30 segundos.

---

## Workflow de release

```
master (produção)
  └── release/vX.Y-descricao  →  PR  →  merge  →  git tag vX.Y
```

1. Criar branch: `git checkout -b release/vX.Y-descricao`
2. Desenvolver e commitar na branch
3. Push: `git push origin release/vX.Y-descricao`
4. Abrir PR no GitHub → revisar → merge em `master`
5. Voltar para master e criar a tag:
   ```bash
   git checkout master && git pull
   git tag vX.Y && git push --tags
   ```

Correções pontuais (patches) podem ir direto em `master` com tag `vX.Y.Z`.

---

## Histórico de versões

| Versão | Descrição |
|--------|-----------|
| v1.4.1 | Polish: fix de variáveis CSS indefinidas, remoção de código morto, PRODUCT.md |
| v1.4   | Polimento: merge de seções (Localização + Contato), ajustes de easing, logo mobile |
| v1.3   | Hero com foto real, avaliação destacada, CTAs reorganizados |
| v1.2   | Capacidade dos espaços, qualificação de cliente |
| v1.1   | Correções críticas pós-lançamento |

---

## Sistema de design

O projeto segue um sistema de design documentado em dois níveis:

- **[PRODUCT.md](PRODUCT.md)** — contexto estratégico: quem são os usuários, qual é o propósito do site, personalidade de marca, anti-referências e princípios de design.
- **[DESIGN.md](DESIGN.md)** — sistema visual: paleta completa (vinho profundo + ouro de vela), escala tipográfica (Cormorant + Jost), sombras, componentes e regras nomeadas.

O North Star do design é **"O Álbum de Casamento"**: cada página deve parecer algo que vale a pena guardar, não apenas consumir.
