import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2, XCircle } from "lucide-react";
import { api } from "@/lib/api";
import { useCart } from "@/context/CartContext";

const MAX_ATTEMPTS = 8;

export default function PaymentSuccess() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const [error, setError] = useState(false);
  const polled = useRef(false);

  useEffect(() => {
    if (polled.current) return;
    polled.current = true;
    const sessionId = params.get("session_id");
    if (!sessionId) {
      setError(true);
      return;
    }

    let attempts = 0;
    const poll = async () => {
      try {
        const res = await api.get(`/payments/status/${sessionId}`);
        if (res.data.payment_status === "paid") {
          clearCart();
          navigate(`/sucesso/${res.data.order_number}`, { replace: true });
          return;
        }
        if (["expired", "failed"].includes(res.data.payment_status)) {
          setError(true);
          return;
        }
      } catch {
        setError(true);
        return;
      }
      attempts += 1;
      if (attempts >= MAX_ATTEMPTS) {
        setError(true);
        return;
      }
      setTimeout(poll, 2000);
    };
    poll();
  }, [params, navigate, clearCart]);

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-5 text-center">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} data-testid="payment-processing">
        {error ? (
          <>
            <XCircle className="w-14 h-14 text-red-400 mx-auto mb-5" />
            <h1 className="font-display text-3xl uppercase text-white">Não confirmámos o pagamento</h1>
            <p className="text-zinc-400 mt-3 max-w-md">
              Se o valor foi cobrado, a tua encomenda será processada. Contacta-nos por WhatsApp em caso de dúvida.
            </p>
            <Link to="/" className="cta-glow inline-block mt-8 bg-[#7EDAF2] text-black font-bold px-8 py-3 rounded-full uppercase tracking-wide">
              Voltar à loja
            </Link>
          </>
        ) : (
          <>
            <Loader2 className="w-14 h-14 text-[#7EDAF2] mx-auto mb-5 animate-spin" />
            <h1 className="font-display text-3xl uppercase text-white">A confirmar o pagamento...</h1>
            <p className="text-zinc-400 mt-3">Aguarda um instante, não feches esta página.</p>
          </>
        )}
      </motion.div>
    </div>
  );
}
