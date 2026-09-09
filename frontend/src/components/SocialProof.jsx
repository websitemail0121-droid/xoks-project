import React from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const ATHLETE =
  "https://images.unsplash.com/photo-1504364269860-8be73aabdff2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzNDR8MHwxfHNlYXJjaHwxfHxhdGhsZXRlJTIwcG9ydHJhaXQlMjBpbnRlbnNlfGVufDB8fHx8MTc4Mzg3NTcxMnww&ixlib=rb-4.1.0&q=85";

const reviews = [
  {
    name: "Ricardo Moreira",
    role: "Médio · Liga Profissional",
    text: "São muito leves e nem se notam durante o jogo. Boa proteção e acabamento cuidado.",
    rating: 5,
  },
  {
    name: "André Costa",
    role: "Lateral · Sub-23",
    text: "Já apanhei entradas duras e não tive marcas na perna. Vale bem o investimento.",
    rating: 5,
  },
  {
    name: "Tiago Ferreira",
    role: "Avançado · Distrital",
    text: "Encaixam bem e não escorregam. Design simples e bem feito.",
    rating: 5,
  },
];

export const SocialProof = () => {
  return (
    <section id="atletas" className="relative py-24 sm:py-32 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Athlete feature */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 relative rounded-3xl overflow-hidden min-h-[480px]"
          >
            <img src={ATHLETE} alt="Atleta XOK'S" className="absolute inset-0 w-full h-full object-cover grayscale" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8">
              <Quote className="w-10 h-10 text-[#7EDAF2] mb-3" />
              <p className="text-xl font-semibold text-white leading-snug">
                &quot;Uso as XOK&apos;S em todos os jogos. Fazem a diferença.&quot;
              </p>
            </div>
          </motion.div>

          {/* Reviews */}
          <div className="lg:col-span-7">
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#7EDAF2]">Testemunhos</span>
            <h2 className="font-display text-[clamp(2.5rem,6vw,4rem)] leading-none uppercase text-white mt-3 mb-10">
              O que dizem os jogadores
            </h2>

            <div className="space-y-4">
              {reviews.map((r, i) => (
                <motion.div
                  key={i}
                  data-testid={`review-${i}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="rounded-2xl border border-white/10 bg-[#121212] p-6 hover:border-[#7EDAF2]/30 transition-colors"
                >
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(r.rating)].map((_, k) => (
                      <Star key={k} className="w-4 h-4 fill-[#7EDAF2] text-[#7EDAF2]" />
                    ))}
                  </div>
                  <p className="text-zinc-200 leading-relaxed">"{r.text}"</p>
                  <div className="mt-4">
                    <p className="font-bold text-white">{r.name}</p>
                    <p className="text-sm text-zinc-500">{r.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
