import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Cookie } from "lucide-react";

const STORAGE_KEY = "xoks-cookie-consent";

export const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(STORAGE_KEY);
    if (!consent) setVisible(true);
  }, []);

  const setConsent = (value) => {
    localStorage.setItem(STORAGE_KEY, value);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      data-testid="cookie-consent-banner"
      className="fixed bottom-0 left-0 right-0 z-[60] p-4 sm:p-5"
    >
      <div className="max-w-4xl mx-auto rounded-2xl border border-white/10 bg-black/90 backdrop-blur-xl shadow-2xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex items-start gap-3 flex-1">
          <div className="w-10 h-10 rounded-lg bg-[#7EDAF2] flex items-center justify-center shrink-0">
            <Cookie className="w-5 h-5 text-black" />
          </div>
          <p className="text-sm text-zinc-300 leading-relaxed">
            Utilizamos cookies para melhorar a sua experiência, analisar o tráfego e apoiar o marketing.
            Ao aceitar, concorda com a nossa{" "}
            <Link to="/politica-de-cookies" className="text-[#7EDAF2] underline hover:text-[#A5E8F7]">
              Política de Cookies
            </Link>
            .
          </p>
        </div>
        <div className="flex gap-3 shrink-0">
          <button
            data-testid="cookie-reject-btn"
            onClick={() => setConsent("rejected")}
            className="flex-1 sm:flex-none px-5 py-2.5 rounded-full border border-white/15 text-sm font-semibold text-zinc-300 hover:border-white/40 transition-colors"
          >
            Rejeitar
          </button>
          <button
            data-testid="cookie-accept-btn"
            onClick={() => setConsent("accepted")}
            className="flex-1 sm:flex-none px-5 py-2.5 rounded-full bg-[#7EDAF2] hover:bg-[#A5E8F7] text-black text-sm font-bold transition-colors"
          >
            Aceitar tudo
          </button>
        </div>
      </div>
    </div>
  );
};
