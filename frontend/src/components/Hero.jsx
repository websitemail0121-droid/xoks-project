import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";

const HERO_BG =
  "https://images.unsplash.com/photo-1599158150601-1417ebbaafdd?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA3MDR8MHwxfHNlYXJjaHw0fHxmb290YmFsbGVyJTIwc3RhZGl1bSUyMG5pZ2h0fGVufDB8fHx8MTc4Mzg3NTcxMnww&ixlib=rb-4.1.0&q=85";

export const Hero = ({ onCta }) => {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={HERO_BG} alt="Estádio de futebol" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/75" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 pt-24 pb-16 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[#CCFF00]/40 bg-[#CCFF00]/5 px-4 py-1.5 mb-6">
            <ShieldCheck className="w-4 h-4 text-[#CCFF00]" />
            <span className="text-xs font-bold tracking-widest uppercase text-[#CCFF00]">
              Performance de Elite
            </span>
          </div>

          <h1 className="font-display text-[clamp(3rem,9vw,6rem)] leading-[0.9] text-white uppercase">
            Protege o teu jogo.
            <br />
            <span className="text-[#CCFF00] text-glow">Domina o campo.</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-zinc-300 max-w-xl leading-relaxed">
            Caneleiras <span className="font-bold text-white">XOK'S</span> concebidas para os que não aceitam
            limites. Proteção máxima, leveza extrema e exclusividade em cada corte.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <button
              data-testid="hero-cta-btn"
              onClick={onCta}
              className="cta-glow group inline-flex items-center justify-center gap-2 bg-[#CCFF00] hover:bg-[#E6FF4D] text-black font-bold text-base px-8 py-4 rounded-full uppercase tracking-wide"
            >
              Comprar Caneleiras XOK'S
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="#vantagens"
              className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/50 text-white font-semibold px-8 py-4 rounded-full transition-colors"
            >
              Ver Vantagens
            </a>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-4 text-sm text-zinc-400">
            <div>
              <span className="block font-display text-3xl text-white">55g</span>
              Peso por caneleira
            </div>
            <div className="h-8 w-px bg-white/10 hidden sm:block" />
            <div>
              <span className="block font-display text-3xl text-white">12K+</span>
              Atletas equipados
            </div>
            <div className="h-8 w-px bg-white/10 hidden sm:block" />
            <div>
              <span className="block font-display text-3xl text-white">4.9★</span>
              Avaliação média
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
