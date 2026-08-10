import React from "react";
import { motion } from "framer-motion";
import { Star, BadgeCheck } from "lucide-react";

const REVIEWS = [
  { name: "Miguel S.", rating: 5, date: "Há 2 semanas", text: "Qualidade incrível. Leves e a proteção sente-se logo à primeira. Recomendo a 100%.", verified: true },
  { name: "João P.", rating: 5, date: "Há 1 mês", text: "As melhores caneleiras que já tive. O encaixe é perfeito e o design é brutal.", verified: true },
  { name: "André C.", rating: 4, date: "Há 1 mês", text: "Muito boas e confortáveis. Chegaram rápido e bem embaladas. Só queria mais uma cor.", verified: true },
  { name: "Rui M.", rating: 5, date: "Há 2 meses", text: "Uso-as em todos os jogos. Resistentes e nem se sentem. Vale cada cêntimo.", verified: true },
  { name: "Tiago F.", rating: 5, date: "Há 3 meses", text: "Levei uma entrada dura e a perna nem sentiu. Proteção de topo!", verified: true },
];

const Stars = ({ value, className = "w-4 h-4" }) => (
  <div className="flex items-center gap-0.5">
    {[...Array(5)].map((_, i) => (
      <Star key={i} className={`${className} ${i < value ? "fill-[#7EDAF2] text-[#7EDAF2]" : "text-zinc-700"}`} />
    ))}
  </div>
);

export const Reviews = () => {
  const avg = 4.8;
  const total = 1284;
  const dist = [
    { s: 5, pct: 86 },
    { s: 4, pct: 10 },
    { s: 3, pct: 3 },
    { s: 2, pct: 1 },
    { s: 1, pct: 0 },
  ];

  return (
    <section id="reviews" data-testid="reviews-section" className="py-20 sm:py-28 bg-[#0A0A0A] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#7EDAF2]">Avaliações</span>
        <h2 className="font-display text-[clamp(2.25rem,5vw,3.5rem)] leading-none uppercase text-white mt-3 mb-12">
          O que dizem os atletas
        </h2>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* summary */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl border border-white/10 bg-[#121212] p-8 lg:sticky lg:top-24">
              <div className="flex items-end gap-3">
                <span className="font-display text-6xl text-white leading-none">{avg}</span>
                <div className="pb-1">
                  <Stars value={5} />
                  <p className="text-sm text-zinc-500 mt-1">{total.toLocaleString("pt-PT")} avaliações</p>
                </div>
              </div>
              <div className="mt-6 space-y-2">
                {dist.map((d) => (
                  <div key={d.s} className="flex items-center gap-3">
                    <span className="text-xs text-zinc-400 w-8">{d.s}★</span>
                    <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full bg-[#7EDAF2]" style={{ width: `${d.pct}%` }} />
                    </div>
                    <span className="text-xs text-zinc-500 w-8 text-right">{d.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* list */}
          <div className="lg:col-span-2 space-y-4">
            {REVIEWS.map((r, i) => (
              <motion.div
                key={i}
                data-testid={`review-item-${i}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: (i % 3) * 0.08 }}
                className="rounded-2xl border border-white/10 bg-[#121212] p-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#7EDAF2]/15 border border-[#7EDAF2]/30 flex items-center justify-center font-bold text-[#7EDAF2]">
                      {r.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-white flex items-center gap-1.5">
                        {r.name}
                        {r.verified && <BadgeCheck className="w-4 h-4 text-[#7EDAF2]" />}
                      </p>
                      <p className="text-xs text-zinc-500">{r.date}</p>
                    </div>
                  </div>
                  <Stars value={r.rating} />
                </div>
                <p className="text-zinc-300 mt-4 leading-relaxed">"{r.text}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
