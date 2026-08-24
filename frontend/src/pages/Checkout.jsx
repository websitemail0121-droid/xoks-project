import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Lock, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { api, formatPrice } from "@/lib/api";
import { toast } from "sonner";

const Field = ({ label, name, value, onChange, type = "text", required = true, placeholder, testid }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-semibold uppercase tracking-wide text-zinc-400">{label}</label>
    <input
      data-testid={testid}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
      className="bg-transparent border border-white/15 rounded-lg px-4 py-3 text-white placeholder:text-zinc-600 outline-none focus:border-[#7EDAF2] focus:ring-2 focus:ring-[#7EDAF2]/30 transition-colors"
    />
  </div>
);

export default function Checkout() {
  const { items, subtotal, shippingCost, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [sameAsShipping, setSameAsShipping] = useState(true);

  const [shipping, setShipping] = useState({
    full_name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postal_code: "",
    country: "Portugal",
  });
  const [billing, setBilling] = useState({
    full_name: "",
    address: "",
    city: "",
    postal_code: "",
    country: "Portugal",
  });
  const [notes, setNotes] = useState("");

  const onShip = (e) => setShipping((s) => ({ ...s, [e.target.name]: e.target.value }));
  const onBill = (e) => setBilling((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (items.length === 0) {
      toast.error("O teu carrinho está vazio");
      return;
    }
    setSubmitting(true);
    try {
      const payload = {
        items: items.map(({ product_id, name, size, price, quantity, image }) => ({
          product_id,
          name,
          size,
          price,
          quantity,
          image,
        })),
        shipping,
        billing: sameAsShipping
          ? { same_as_shipping: true }
          : { same_as_shipping: false, ...billing },
        notes: notes || null,
        origin_url: window.location.origin,
      };
      const res = await api.post("/checkout", payload);
      // Redirect to Stripe hosted checkout
      window.location.href = res.data.checkout_url;
    } catch (err) {
      console.error(err);
      toast.error("Erro ao iniciar pagamento", {
        description: err?.response?.data?.detail || "Tenta novamente.",
      });
      setSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center gap-5 px-6 text-center">
        <ShoppingBag className="w-16 h-16 text-zinc-700" />
        <h1 className="font-display text-4xl uppercase text-white">Carrinho vazio</h1>
        <p className="text-zinc-400">Adiciona as tuas caneleiras XOK'S antes de finalizar.</p>
        <Link
          to="/"
          data-testid="back-to-shop-btn"
          className="cta-glow bg-[#7EDAF2] text-black font-bold px-8 py-3 rounded-full uppercase tracking-wide"
        >
          Voltar à loja
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <div className="border-b border-white/10 backdrop-blur-xl bg-black/60 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-zinc-300 hover:text-white transition-colors" data-testid="checkout-back-link">
            <ArrowLeft className="w-4 h-4" /> Voltar
          </Link>
          <span className="font-display text-2xl text-white">
            XOK'S <span className="text-[#7EDAF2]">CHECKOUT</span>
          </span>
          <span className="flex items-center gap-1 text-xs text-zinc-500">
            <Lock className="w-3 h-3" /> Seguro
          </span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10 grid grid-cols-1 lg:grid-cols-5 gap-10">
        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onSubmit={handleSubmit}
          className="lg:col-span-3 space-y-10"
          data-testid="checkout-form"
        >
          {/* Contact */}
          <section>
            <h2 className="font-display text-3xl uppercase text-white mb-5">Contacto</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Nome completo" name="full_name" value={shipping.full_name} onChange={onShip} placeholder="João Silva" testid="input-fullname" />
              <Field label="Email" name="email" type="email" value={shipping.email} onChange={onShip} placeholder="joao@email.pt" testid="input-email" />
              <Field label="Telemóvel" name="phone" type="tel" value={shipping.phone} onChange={onShip} placeholder="+351 912 345 678" testid="input-phone" />
            </div>
          </section>

          {/* Shipping */}
          <section>
            <h2 className="font-display text-3xl uppercase text-white mb-5">Dados de Envio</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <Field label="Morada" name="address" value={shipping.address} onChange={onShip} placeholder="Rua, número, andar" testid="input-address" />
              </div>
              <Field label="Cidade" name="city" value={shipping.city} onChange={onShip} placeholder="Lisboa" testid="input-city" />
              <Field label="Código Postal" name="postal_code" value={shipping.postal_code} onChange={onShip} placeholder="1000-100" testid="input-postal" />
              <Field label="País" name="country" value={shipping.country} onChange={onShip} testid="input-country" />
            </div>
          </section>

          {/* Billing */}
          <section>
            <h2 className="font-display text-3xl uppercase text-white mb-5">Faturação</h2>
            <label className="flex items-center gap-3 cursor-pointer mb-5" data-testid="same-billing-toggle">
              <input
                type="checkbox"
                checked={sameAsShipping}
                onChange={(e) => setSameAsShipping(e.target.checked)}
                className="w-5 h-5 accent-[#7EDAF2]"
              />
              <span className="text-sm text-zinc-300">Usar os mesmos dados do envio</span>
            </label>
            {!sameAsShipping && (
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <Field label="Nome / Empresa" name="full_name" value={billing.full_name} onChange={onBill} testid="bill-fullname" />
                </div>
                <div className="sm:col-span-2">
                  <Field label="Morada de faturação" name="address" value={billing.address} onChange={onBill} testid="bill-address" />
                </div>
                <Field label="Cidade" name="city" value={billing.city} onChange={onBill} testid="bill-city" />
                <Field label="Código Postal" name="postal_code" value={billing.postal_code} onChange={onBill} testid="bill-postal" />
                <Field label="País" name="country" value={billing.country} onChange={onBill} testid="bill-country" />
              </div>
            )}
          </section>

          {/* Notes */}
          <section>
            <h2 className="font-display text-3xl uppercase text-white mb-5">Notas <span className="text-zinc-600 text-lg">(opcional)</span></h2>
            <textarea
              data-testid="input-notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Instruções de entrega, etc."
              className="w-full bg-transparent border border-white/15 rounded-lg px-4 py-3 text-white placeholder:text-zinc-600 outline-none focus:border-[#7EDAF2] focus:ring-2 focus:ring-[#7EDAF2]/30 transition-colors"
            />
          </section>

          <div className="rounded-lg border border-white/15 bg-[#121212] p-4 flex items-center gap-3 text-sm text-zinc-400">
            <Lock className="w-4 h-4 text-[#7EDAF2] shrink-0" />
            Pagamento seguro processado pela Stripe. Serás redirecionado para concluir a compra.
          </div>

          <button
            data-testid="place-order-btn"
            type="submit"
            disabled={submitting}
            className="cta-glow w-full inline-flex items-center justify-center gap-2 bg-[#7EDAF2] hover:bg-[#A5E8F7] disabled:opacity-60 text-black font-bold px-8 py-4 rounded-full uppercase tracking-wide"
          >
            {submitting ? "A redirecionar..." : `Pagar · ${formatPrice(total)}`}
          </button>
        </motion.form>

        {/* Summary */}
        <div className="lg:col-span-2">
          <div className="lg:sticky lg:top-24 rounded-2xl border border-white/10 bg-[#121212] p-6">
            <h3 className="font-display text-2xl uppercase text-white mb-5">Resumo</h3>
            <div className="space-y-4 max-h-72 overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={item.key} className="flex gap-3" data-testid={`summary-item-${item.product_id}`}>
                  <div className="w-16 h-16 rounded-lg bg-[#1a1a1a] border border-white/10 overflow-hidden flex items-center justify-center shrink-0 relative">
                    <img src={item.image} alt={item.name} className="w-full h-full object-contain p-1" />
                    <span className="absolute -top-1 -right-1 bg-[#7EDAF2] text-black text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold leading-tight text-white">{item.name}</p>
                    {item.size && <p className="text-xs text-zinc-500">Tam. {item.size}</p>}
                  </div>
                  <span className="text-sm font-bold text-white">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-white/10 mt-5 pt-5 space-y-2 text-sm">
              <div className="flex justify-between text-zinc-400">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Envio</span>
                <span>{shippingCost === 0 ? "Grátis" : formatPrice(shippingCost)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-2 border-t border-white/10">
                <span className="text-white">Total</span>
                <span className="text-[#7EDAF2]" data-testid="summary-total">{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
