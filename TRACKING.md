---
tipo: projeto
dominio: clientes
status: parcial
criado: 2026-08-12
atualizado: 2026-08-12
cliente: Instituto Blu
nicho: eventos de formação (psicologia clínica)
tags: [tracking, meta-ads, gtm, ga4]
---

# Tracking: LP Clínica em Foco (Instituto Blu)

Instanciado a partir do molde `../TRACKING_SETUP.md`.

**Estado: código pronto, container GTM publicado, falta validar em browser real.**

## Particularidade desta LP

Não existe formulário: a inscrição acontece no **Sympla**. A conversão observável na
página é o clique que leva ao checkout externo (`checkout_click`). Lead real e receita
vivem no Sympla, fora do alcance do Pixel, salvo se algum dia colocarmos o container
GTM no checkout do Sympla (hoje não é possível). Consequência prática: otimizar mídia
por `checkout_click` (proxy) e reconciliar venda com o relatório do Sympla na mão.

Sem formulário próprio, **não há CAPI nem dedup por `event_id`** neste projeto. As seções
correspondentes do molde ficam fora até que exista captura na própria página.

## IDs

| Item | Valor |
|---|---|
| Domínio da LP | `https://clinicaemfoco.institutoblu.com.br` (subdomínio do cliente; DNS na Vercel) |
| GTM Container | `GTM-MZ685HWB` (`accounts/6355874478/containers/261042968`, conta Altermkt) |
| GA4 Property | `Instituto Blu - LP` (`properties/549725131`, conta Altermkt `accounts/394937069`) |
| GA4 Measurement ID | `G-W7XH7XMSQP` |
| Meta Pixel ID | `1384554830522069` (fica no GTM, não no código) |
| Checkout externo | `https://www.sympla.com.br/evento/clinica-em-foco/3525455` |
| Script de setup | `scripts/setup-tracking.py` (idempotente; sem `--apply` roda dry-run) |

> ⚠ Domínio de produção passou de `clinica-em-foco-ten.vercel.app` para
> `clinicaemfoco.institutoblu.com.br`. Atualizar a **URI do stream do GA4** e a
> verificação de domínio do Meta para o subdomínio.

## Arquitetura de eventos

Fonte: `src/scripts/tracking.ts` (carregado pelo `Layout.astro`). A página nunca chama
`fbq`/`gtag`: só empurra `dataLayer`.

| dataLayer | Quando dispara | Meta sugerido | GA4 |
|---|---|---|---|
| `checkout_click` | qualquer link para o Sympla (header, hero, programação, oferta, local, CTA final) | InitiateCheckout | sim, marcar como evento principal |
| `whatsapp_click` | links `wa.me` (CTA final e rodapé) | Contact | sim, marcar como evento principal |
| `cta_click` | âncora interna com classe `btn` (ex.: "Ver programação") | CTAClick (custom) | sim |
| `outbound_click` | links externos restantes (mapa, Instagram) | não | sim |
| `scroll_depth` | 25/50/75/90 por cento | não | sim |

Parâmetros em todo evento de clique:

- `cta_location`: `header`, `hero`, `programacao`, `inscricao`, `local`, `cta`, `footer`
  (vem do `id` da seção ou de `data-track-location`).
- `cta_label`: texto do link (até 80 caracteres).
- `link_url`: URL absoluta do destino.

`page_view` não é empurrado pela página: o GTM dispara no `All Pages`.

## O que já está no repo

- `src/config.ts` → `export const tracking = { gtmId, scrollDepth }`.
- `src/layouts/Layout.astro` → snippet GTM no `<head>` e `<noscript>` no `<body>`,
  renderizados só quando `gtmId` está preenchido.
- `src/scripts/tracking.ts` → listener delegado de cliques (capture) + scroll depth.
- `data-track-location` em `Header.astro`, `Footer.astro` e `Hero.astro`; demais seções
  usam o próprio `id`.

Para marcar um link específico com evento customizado, basta `data-track="nome_do_evento"`
no `<a>`: tem precedência sobre a classificação automática.

## O que já está no GTM (versão publicada `Setup Clinica em Foco - Instituto Blu`)

Criado por `scripts/setup-tracking.py`.

- **Variáveis**: `DLV - cta_location`, `DLV - cta_label`, `DLV - link_url`,
  `DLV - percent_scrolled`
- **Triggers**: `All Pages` + `CE - <evento>` para os cinco eventos
- **Meta**: `Meta Pixel - PageView` (init + PageView em All Pages),
  `Meta Pixel - InitiateCheckout`, `Meta Pixel - Contact`, `Meta Pixel - CTAClick`.
  As tags de evento usam *setup tag* apontando para a base, então o `fbq` sempre existe.
- **GA4**: `Tag GA4` (base, All Pages) + uma tag de evento por evento do dataLayer

Armadilha já corrigida: em tag Custom HTML a variável entra crua no JS. Toda variável de
texto precisa vir entre aspas (`'{{DLV - cta_label}}'`), senão a tag quebra com SyntaxError.

## O que falta

1. Validar em Chrome real (GTM Preview + Meta Test Events). Headless não serve: o Meta
   responde `Bot traffic detected and blocked` e não registra o evento.
2. GA4 → Admin → Eventos principais: marcar `checkout_click` e `whatsapp_click`
   (só aparecem na lista depois do primeiro disparo real).
3. Meta: verificar domínio e compartilhar o dataset com a BM que roda a mídia.
4. Meta Ads: usar `InitiateCheckout` como evento de otimização do conjunto.
5. Ajustar a URI do stream GA4 para o subdomínio `clinicaemfoco.institutoblu.com.br`.

## Validação

1. **GTM Preview**: clicar em cada CTA e conferir evento, `cta_location` e `cta_label`.
2. **Meta Events Manager**: eventos chegando com origem Navegador.
3. **GA4 Realtime**: os cinco eventos aparecendo.
4. Rolar a página inteira e conferir `scroll_depth` em 25/50/75/90, uma vez cada.

## Pendências

- [x] Pixel Meta: `1384554830522069`
- [x] GA4 property + container GTM criados e publicados
- [ ] Validar no Chrome real (Preview + Test Events)
- [ ] Marcar eventos principais no GA4
- [ ] Confirmar de qual BM é o pixel e compartilhar dataset com a BM que roda a mídia
- [x] Domínio próprio definido: `clinicaemfoco.institutoblu.com.br` (subdomínio Vercel)
- [ ] Atualizar URI do stream GA4 + verificação de domínio Meta para o subdomínio
- [ ] Reconciliação de vendas com o relatório do Sympla (processo manual, definir dono)
