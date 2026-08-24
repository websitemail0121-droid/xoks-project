# PRD — PatrickGomesFR XOK'S (Loja E-commerce Single-Product)

## Problem Statement (original)
Loja online e-commerce single-product de alta conversão para "PatrickGomesFR XOK'S", que vende caneleiras (shin guards) personalizadas de alta performance para futebolistas. Design moderno, premium, escuro/desportivo com acento verde-lima. Landing page (Hero+CTA, Proposta de Valor 3 pilares, Vitrina de produto, Prova Social), carrinho slide-out, checkout de um passo, admin de encomendas.

## User Choices
- Stripe: adiado (encomenda registada, pagamento na entrega). Sem processamento real por agora.
- Sem autenticação — checkout como convidado.
- Dados de produto fictícios/placeholder.
- Sem personalização de produto.
- Painel admin simples para listar encomendas (aberto, sem login).

## Architecture
- Backend: FastAPI + MongoDB (motor). Product seeded on startup. Orders CRUD.
- Frontend: React 19 + React Router + Tailwind + Shadcn UI + framer-motion. CartContext (localStorage).
- Design: dark theme "Performance Pro", Bebas Neue headings + Manrope body, accent #CCFF00.

## Endpoints
- GET /api/products, GET /api/products/{id}
- POST /api/orders, GET /api/orders, GET /api/orders/{order_number}, PATCH /api/orders/{order_number}

## Implemented
- **2026-06**: Landing page, slide-out cart, checkout de um passo, Admin dashboard, produtos com imagens.
- **2026-08**: 6 páginas legais + LegalLayout, Cookie Consent banner RGPD, WhatsApp flutuante, Stripe Checkout Session (test mode), PaymentSuccess/Cancel, Admin com pending_payment/paid.
- **2026-08 (24/08)**: Produto "XOK'S® Carbon Legacy" adicionado — 125€, edição limitada.
- **2026-08 (24/08)**: **XOK'S® Custom Studio completo** — landing `/custom-studio` (Design Your Identity, 2 passos: carbono + tier), configurador `/custom-studio/build` (nome, número, upload de fotos JPG/PNG via Emergent Object Storage, observações), 2 produtos custom (Studio Base 92,90€ e Studio Pro 99,90€) com delta por carbono (+0/+5/+10€). Página `/produtos` reorganizada em 3 secções: Original, Fibra de Carbono, Custom Studio. Teaser Custom Studio na homepage. Admin mostra custom_data + links para fotos. Stripe recompute server-side. Tests 45/45 pass.

## Backend endpoints
- `POST /api/uploads/custom-photo` — upload JPG/PNG (máx 8MB) → `{id, url, content_type, size}`
- `GET /api/uploads/file/{id}` — servir foto pela storage
- `POST /api/checkout` — recomputa preço custom (base tier + carbon delta) e Stripe session
- `POST /api/orders/*`, `/api/products?section=X`, etc.

## Backlog / Next
- P0: Testar Stripe flow completo pagando um custom order em test mode e ver aparecer em /admin.
- P1: Emails (Resend/SendGrid) — confirmação de encomenda + preview em 48h para custom orders.
- P1: Analytics (GA/Meta Pixel) ligado ao Cookie Consent.
- P1: Autenticação admin.
- P2: Adicionar clubes dos atletas.
- P2: Refactor `server.py` (700+ linhas — mover seed para ficheiro separado).
