import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Feather, ShieldCheck, Hexagon, Activity, Award, Lock } from "lucide-react";

const SHINS = "/product-hero.png";

const specs = [
  { icon: Feather, label: "Ultra leve · 55g" },
  { icon: Hexagon, label: "Fibra de carbono" },
  { icon: Activity, label: "Design anatómico" },
  { icon: ShieldCheck, label: "Proteção máxima" },
];

const trust = [
  { icon: ShieldCheck, title: "Proteção Garantida", desc: "Tecnologia de fibra de carbono premium." },
  { icon: Award, title: "Qualidade Premium", desc: "Materiais de alta performance e durabilidade." },
  { icon: Lock, title: "Compra Segura", desc: "Os teus dados protegidos do início ao fim." },
];

export const Hero = ({ onCta }) => {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-black">
      {/* ghost wordmark */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-[24%] z-0 text-center font-display uppercase leading-none select-none pointer-events-none"
        style={{
          fontSize: "clamp(9rem, 26vw, 24rem)",
          color: "rgba(255,255,255,0.028)",
          letterSpacing: "0.02em",
        }}
      >
        XOK'S
      </div>

      {/* cyan glow */}
      <div
        aria-hidden
        className="absolute z-0 right-[8%] top-1/2 -translate-y-1/2 w-[46vw] h-[46vw] max-w-[720px] max-h-[720px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(126,218,242,0.18), transparent 62%)", filter: "blur(20px)" }}
      />

      {/* product */}
      <motion.img
        src={SHINS}
        alt="Caneleiras XOK'S em fibra de carbono"
        initial={{ opacity: 0, x: 60, rotate: 2 }}
        animate={{ opacity: 1, x: 0, rotate: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        style={{
          WebkitMaskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, #000 55%, transparent 82%)",
          maskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, #000 55%, transparent 82%)",
        }}
        className="hidden md:block absolute z-10 right-[2%] lg:right-[7%] top-1/2 -translate-y-1/2 h-[54%] lg:h-[66%] w-auto object-contain select-none pointer-events-none animate-[float_6s_ease-in-out_infinite]"
      />

      {/* content */}
      <div className="relative z-20 flex-1 flex items-center pt-28 pb-10">
        <div className="max-w-7xl mx-auto w-full px-5 sm:px-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 mb-7"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#7EDAF2] animate-pulse" />
              <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-zinc-300">
                Carbon Fiber Premium
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="font-display text-[clamp(3.5rem,9vw,7.5rem)] leading-[0.82] uppercase text-white"
            >
              Blinda
              <br />
              o teu <span className="text-[#7EDAF2]">jogo</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="mt-7 text-lg sm:text-xl text-zinc-400 max-w-lg leading-relaxed"
            >
              Caneleiras em fibra de carbono para quem leva a proteção
              <span className="text-white font-semibold"> ao próximo nível.</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="mt-9 flex flex-col sm:flex-row items-start sm:items-center gap-4"
            >
              <button
                data-testid="hero-cta-btn"
                onClick={onCta}
                className="cta-glow group inline-flex items-center gap-3 bg-[#7EDAF2] hover:bg-[#A5E8F7] text-black font-bold text-sm px-8 py-4 rounded-full uppercase tracking-widest"
              >
                Ver Caneleiras
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <a
                href="#vantagens"
                className="text-sm font-semibold text-zinc-400 hover:text-white transition-colors uppercase tracking-widest px-2"
              >
                Descobre a tecnologia
              </a>
            </motion.div>

            {/* refined spec strip */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="mt-14 flex flex-wrap items-center gap-y-3"
            >
              {specs.map((s, i) => {
                const Icon = s.icon;
                return (
                  <div key={s.label} className="flex items-center">
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 text-[#7EDAF2]" strokeWidth={2} />
                      <span className="text-sm font-medium text-zinc-300 whitespace-nowrap">{s.label}</span>
                    </div>
                    {i < specs.length - 1 && <span className="mx-5 h-4 w-px bg-white/15" />}
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>

      {/* trust bar */}
      <div className="relative z-20 border-t border-white/10 bg-black/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-5 grid grid-cols-1 sm:grid-cols-3 gap-5">
          {trust.map((t) => {
            const Icon = t.icon;
            return (
              <div key={t.title} className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-lg border border-white/10 bg-white/[0.03] flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-[#7EDAF2]" strokeWidth={1.75} />
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-wide text-white">{t.title}</p>
                  <p className="text-xs text-zinc-500 leading-tight mt-0.5">{t.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
