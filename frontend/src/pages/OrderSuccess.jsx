import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, Package } from "lucide-react";
import { api, formatPrice } from "@/lib/api";

export default function OrderSuccess() {
  const { orderNumber } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    api.get(`/orders/${orderNumber}`).then((res) => setOrder(res.data)).catch(() => {});
  }, [orderNumber]);

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-5 py-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg w-full text-center"
        data-testid="order-success"
      >
        <div className="w-20 h-20 rounded-full bg-[#CCFF00]/10 border border-[#CCFF00]/40 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-11 h-11 text-[#CCFF00]" />
        </div>
        <h1 className="font-display text-5xl uppercase text-white">Encomenda confirmada!</h1>
        <p className="text-zinc-400 mt-4">
          Obrigado pela tua compra. As tuas caneleiras XOK'S estão a caminho.
        </p>

        <div className="mt-8 rounded-2xl border border-white/10 bg-[#121212] p-6 text-left">
          <div className="flex items-center gap-2 text-zinc-400 text-sm">
            <Package className="w-4 h-4" /> Número da encomenda
          </div>
          <p data-testid="order-number" className="font-display text-3xl text-[#CCFF00] mt-1">
            {orderNumber}
          </p>

          {order && (
            <div className="mt-5 pt-5 border-t border-white/10 space-y-3">
              {order.items.map((it, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-zinc-300">
                    {it.quantity}× {it.name}{it.size ? ` (${it.size})` : ""}
                  </span>
                  <span className="text-white font-semibold">{formatPrice(it.price * it.quantity)}</span>
                </div>
              ))}
              <div className="flex justify-between pt-3 border-t border-white/10 font-bold">
                <span className="text-white">Total</span>
                <span className="text-[#CCFF00]">{formatPrice(order.total)}</span>
              </div>
              <p className="text-xs text-zinc-500 pt-2">
                Enviaremos atualizações para {order.shipping?.email}.
              </p>
            </div>
          )}
        </div>

        <Link
          to="/"
          data-testid="continue-shopping-btn"
          className="cta-glow inline-block mt-8 bg-[#CCFF00] text-black font-bold px-8 py-3 rounded-full uppercase tracking-wide"
        >
          Voltar à loja
        </Link>
      </motion.div>
    </div>
  );
}
