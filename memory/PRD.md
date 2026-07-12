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

## Implemented (2026-06)
- Landing page completa: Hero, Value Proposition (bento + carbon texture), Product Showcase (size/qty/add-to-cart), Social Proof (testemunhos).
- Slide-out cart dinâmico com atualização de quantidades/subtotal/total + envio grátis >60€.
- Checkout de um passo (contacto, envio, faturação opcional, notas) → cria encomenda → página de sucesso.
- Admin /admin: stats (total, receita, pendentes), tabela de encomendas expansível, mudança de estado.
- AI-generated product images. Tested: backend 9/9, frontend E2E 100%.

## Backlog / Next
- P0: Integração Stripe real (checkout com cartão) — diferido por escolha do utilizador.
- P1: Autenticação admin (proteger /admin), validação de status enum no PATCH, contador atómico de order_number.
- P2: Emails de confirmação (Resend/SendGrid), múltiplos produtos, código de desconto, avaliações reais.
