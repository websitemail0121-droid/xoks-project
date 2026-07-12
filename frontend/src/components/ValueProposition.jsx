import React from "react";
import { motion } from "framer-motion";
import { Shield, Feather, Sparkles } from "lucide-react";

const CARBON =
  "https://images.pexels.com/photos/596815/pexels-photo-596815.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";

const pillars = [
  {
    icon: Shield,
    title: "Material Ultra Resistente",
    desc: "Casca em fibra de carbono capaz de dissipar impactos violentos sem fissurar. A tua perna, blindada.",
    testid: "pillar-material",
  },
  {
    icon: Feather,
    title: "Design Anatómico",
    desc: "Curvatura esquerda/direita que abraça a tíbia. Conforto total durante os 90 minutos, sem incómodos.",
    testid: "pillar-anatomico",
  },
  {
    icon: Sparkles,
    title: "Exclusividade XOK'S",
    desc: "Acabamentos premium e detalhes em verde-lima. Equipamento de elite que se vê e se sente.",
    testid: "pillar-exclusividade",
  },
];

export const ValueProposition = () => {
  return (
    <section id="vantagens" className="relative py-24 sm:py-32 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="max-w-2xl mb-16">
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#CCFF00]">
            Porquê XOK'S
          </span>
          <h2 className="font-display text-[clamp(2.5rem,6vw,4rem)] leading-none uppercase text-white mt-3">
            Engenharia para vencedores
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            const isFirst = i === 0;
            return (
              <motion.div
                key={p.testid}
                data-testid={p.testid}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, delay: i * 0.12 }}
                className={`relative overflow-hidden rounded-2xl border border-white/10 p-8 min-h-[300px] flex flex-col justify-between group ${
                  isFirst ? "carbon-texture md:row-span-1" : "bg-[#121212]"
                }`}
              >
                {isFirst && <div className="absolute inset-0 bg-black/40" />}
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-xl bg-[#CCFF00] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7 text-black" />
                  </div>
                </div>
                <div className="relative z-10">
                  <h3 className="font-display text-3xl uppercase text-white mb-3">{p.title}</h3>
                  <p className="text-zinc-400 leading-relaxed">{p.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-8 relative overflow-hidden rounded-2xl border border-white/10 min-h-[220px] flex items-center">
          <img src={CARBON} alt="Fibra de carbono" className="absolute inset-0 w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
          <div className="relative z-10 p-8 sm:p-12 max-w-xl">
            <h3 className="font-display text-3xl sm:text-4xl uppercase text-white">
              Testadas em campo. <span className="text-[#CCFF00]">Aprovadas por profissionais.</span>
            </h3>
            <p className="text-zinc-300 mt-3">
              Cada par XOK'S passa por testes de impacto reais antes de chegar aos teus pés.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
