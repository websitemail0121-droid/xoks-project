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
- **2026-08**: 6 páginas legais (Termos, Privacidade, Cookies, Envios, Devoluções, Aviso Legal) + LegalLayout.
- **2026-08**: Cookie Consent banner RGPD-compliant.
- **2026-08**: Botão flutuante WhatsApp (+351 919 090 533).
- **2026-08**: Stripe Checkout Session integrado (test mode) — substituiu checkout mockado. PaymentSuccess/PaymentCancel pages.
- **2026-08**: Admin reconhece estados `pending_payment` e `paid`.
- **2026-08 (24/08)**: Adicionado produto "XOK'S® Carbon Legacy" — 125,00 €, edição limitada, gallery: Red/Gold → Black/Gold → Green. Total: 5 produtos.

## Backlog / Next
- P0: Testar end-to-end Stripe checkout flow (adicionar ao carrinho → pagar em test mode → verificar em /admin).
- P1: Analytics (Google Analytics / Meta Pixel) integrados ao Cookie Consent (obrigatório pelas políticas legais publicadas).
- P1: Emails de confirmação de encomenda (Resend/SendGrid).
- P1: Autenticação admin (proteger /admin), validação de status enum no PATCH.
- P2: Adicionar clubes dos atletas (quando fornecidos pelo user).
- P2: Refactor `server.py` (mover seed data para ficheiro separado — atualmente ~615 linhas).
