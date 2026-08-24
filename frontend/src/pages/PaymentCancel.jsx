import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

export default function PaymentCancel() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-5 text-center">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} data-testid="payment-cancel">
        <div className="w-20 h-20 rounded-full bg-amber-400/10 border border-amber-400/40 flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-11 h-11 text-amber-400" />
        </div>
        <h1 className="font-display text-4xl uppercase text-white">Pagamento cancelado</h1>
        <p className="text-zinc-400 mt-4 max-w-md">
          O teu carrinho continua guardado. Podes tentar novamente quando quiseres.
        </p>
        <div className="flex flex-wrap gap-3 justify-center mt-8">
          <Link to="/checkout" data-testid="retry-checkout-btn" className="cta-glow bg-[#7EDAF2] text-black font-bold px-8 py-3 rounded-full uppercase tracking-wide">
            Tentar novamente
          </Link>
          <Link to="/produtos" className="border border-white/15 hover:border-white/40 text-white font-bold px-8 py-3 rounded-full uppercase tracking-wide transition-colors">
            Ver produtos
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
