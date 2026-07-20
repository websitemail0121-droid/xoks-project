import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Feather, ShieldCheck, Wind, Zap, Settings, Lock } from "lucide-react";

const ATHLETE = "/athlete.png";
const SHINS = "/shins.png";

const EDGE_MASK = {
  WebkitMaskImage:
    "radial-gradient(ellipse 72% 88% at 50% 46%, #000 55%, transparent 100%)",
  maskImage:
    "radial-gradient(ellipse 72% 88% at 50% 46%, #000 55%, transparent 100%)",
};

const features = [
  { icon: Feather, label: "Leve e\nResistente" },
  { icon: ShieldCheck, label: "Máxima\nProteção" },
  { icon: Wind, label: "Conforto e\nRespirabilidade" },
  { icon: Zap, label: "Design\nModerno" },
];

const trust = [
  { icon: ShieldCheck, title: "Proteção Garantida", desc: "Tecnologia de fibra de carbono premium." },
  { icon: Settings, title: "Qualidade Premium", desc: "Materiais de alta performance e durabilidade." },
  { icon: Lock, title: "Compra Segura", desc: "Os teus dados protegidos do início ao fim." },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export const Hero = ({ onCta }) => {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-black">
      {/* background: glow + carbon shins */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 w-[70%] h-[85%]"
          style={{
            background:
              "radial-gradient(circle at 68% 50%, rgba(126,218,242,0.13), transparent 62%)",
          }}
        />
        <img
          src={SHINS}
          alt=""
          aria-hidden
          style={EDGE_MASK}
          className="absolute right-[0%] lg:right-[3%] top-1/2 -translate-y-1/2 h-[66%] sm:h-[74%] lg:h-[84%] w-auto object-contain select-none pointer-events-none"
        />
      </div>

      {/* athlete */}
      <motion.img
        src={ATHLETE}
        alt="Atleta XOK'S"
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        style={EDGE_MASK}
        className="hidden md:block absolute z-10 bottom-0 left-[46%] lg:left-[43%] -translate-x-1/2 h-[86%] lg:h-[92%] w-auto object-contain select-none pointer-events-none"
      />

      {/* content */}
      <div className="relative z-20 flex-1 flex items-center pt-24 pb-8">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-7xl mx-auto w-full px-5 sm:px-8"
        >
          <div className="max-w-xl">
            <motion.p
              variants={item}
              className="text-xs font-bold tracking-[0.3em] uppercase text-[#7EDAF2] mb-5"
            >
              / Carbon Fiber Premium
            </motion.p>

            <motion.h1
              variants={item}
              className="font-display text-[clamp(3.25rem,8vw,6.5rem)] leading-[0.85] uppercase text-white"
            >
              Proteção
              <br />
              que te leva
              <br />
              <span className="text-[#7EDAF2]">além</span>
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-6 text-lg text-zinc-400 max-w-md leading-relaxed"
            >
              Leveza, resistência e performance para quem{" "}
              <span className="text-white font-semibold">desafia os limites.</span>
            </motion.p>

            <motion.div variants={item} className="mt-8">
              <button
                data-testid="hero-cta-btn"
                onClick={onCta}
                className="cta-glow group inline-flex items-center gap-3 bg-[#7EDAF2] hover:bg-[#A5E8F7] text-black font-bold text-sm px-8 py-4 rounded-lg uppercase tracking-widest"
              >
                Conheça os Modelos
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>

            {/* feature icons row */}
            <motion.div variants={item} className="mt-14 flex flex-wrap gap-x-9 gap-y-6">
              {features.map((f) => {
                const Icon = f.icon;
                return (
                  <div key={f.label} className="flex flex-col items-start gap-2">
                    <Icon className="w-6 h-6 text-[#7EDAF2]" strokeWidth={1.5} />
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 whitespace-pre-line leading-tight">
                      {f.label}
                    </span>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* trust bar */}
      <div className="relative z-20 border-t border-white/10 bg-black/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-5 grid grid-cols-1 sm:grid-cols-3 gap-5">
          {trust.map((t) => {
            const Icon = t.icon;
            return (
              <div key={t.title} className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-lg border border-white/10 bg-white/[0.03] flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-[#7EDAF2]" strokeWidth={1.5} />
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
