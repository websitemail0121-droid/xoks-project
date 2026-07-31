import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShieldCheck, ArrowRight } from "lucide-react";
import { Layout } from "@/components/Layout";
import { PageHeader } from "@/components/PageHeader";

const clubs = [
  { initials: "AR", name: "Atlético Ribeira", region: "Lisboa", since: "2023", color: "#7EDAF2" },
  { initials: "SN", name: "FC Serra Norte", region: "Porto", since: "2023", color: "#F2A65A" },
  { initials: "UA", name: "União Atlântico", region: "Faro", since: "2024", color: "#8CF27E" },
  { initials: "SV", name: "Sporting Vale", region: "Braga", since: "2024", color: "#F27EBE" },
  { initials: "RM", name: "Real Montanha", region: "Coimbra", since: "2024", color: "#7E8CF2" },
  { initials: "ES", name: "Estrela do Sul", region: "Setúbal", since: "2025", color: "#F2E27E" },
  { initials: "AM", name: "Clube Aveiro Mar", region: "Aveiro", since: "2025", color: "#7EDAF2" },
  { initials: "DU", name: "Douro United", region: "Vila Real", since: "2025", color: "#F26D6D" },
];

const stats = [
  { value: "+40", label: "Clubes parceiros" },
  { value: "12K+", label: "Atletas equipados" },
  { value: "18", label: "Distritos" },
];

export default function Parcerias() {
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <Layout>
      <PageHeader
        eyebrow="A nossa rede"
        title="Clubes Parceiros"
        accentWord="Parceiros"
        subtitle="Clubes de todo o país que confiam nas caneleiras XOK'S para equipar os seus atletas. Estes são alguns dos parceiros que já fazem parte da família."
      />

      <div data-testid="parcerias-page">
        {/* stats */}
        <section className="bg-[#0d0d0d] border-b border-white/5 py-12">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-3 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-display text-4xl sm:text-6xl text-[#7EDAF2]">{s.value}</p>
                <p className="text-xs sm:text-sm text-zinc-400 mt-1 uppercase tracking-wide">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* clubs grid */}
        <section className="py-20 sm:py-28 bg-[#0A0A0A]">
          <div className="max-w-7xl mx-auto px-5 sm:px-8">
            <h2 className="font-display text-4xl uppercase text-white mb-12">Onde jogamos juntos</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {clubs.map((c, i) => (
                <motion.div
                  key={c.name}
                  data-testid={`club-${c.initials}`}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, delay: (i % 4) * 0.08 }}
                  className="rounded-2xl border border-white/10 bg-[#121212] p-6 flex flex-col items-center text-center hover:border-white/25 transition-colors"
                >
                  {/* crest */}
                  <div
                    className="relative w-20 h-24 flex items-center justify-center mb-5"
                    style={{
                      background: `linear-gradient(160deg, ${c.color}22, transparent)`,
                      border: `1px solid ${c.color}55`,
                      clipPath: "polygon(50% 0, 100% 18%, 100% 70%, 50% 100%, 0 70%, 0 18%)",
                    }}
                  >
                    <span className="font-display text-3xl" style={{ color: c.color }}>
                      {c.initials}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl uppercase text-white leading-none">{c.name}</h3>
                  <p className="text-sm text-zinc-500 mt-2">{c.region}</p>
                  <p className="text-xs text-zinc-600 mt-1">Parceiro desde {c.since}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 sm:py-28 bg-[#0d0d0d] border-t border-white/5">
          <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center">
            <ShieldCheck className="w-12 h-12 text-[#7EDAF2] mx-auto mb-6" />
            <h2 className="font-display text-[clamp(2.5rem,6vw,4rem)] leading-none uppercase text-white">
              O teu clube também <span className="text-[#7EDAF2]">joga XOK'S?</span>
            </h2>
            <p className="text-zinc-400 mt-5 max-w-xl mx-auto">
              Equipa toda a tua equipa com condições exclusivas. Fala connosco e junta-te à rede de clubes parceiros.
            </p>
            <a
              href="mailto:geral@patrickgomesfr-xoks.pt"
              data-testid="parcerias-cta-email"
              className="cta-glow inline-flex items-center gap-2 mt-8 bg-[#7EDAF2] hover:bg-[#A5E8F7] text-black font-bold px-8 py-4 rounded-full uppercase tracking-widest text-sm"
            >
              Contactar equipa XOK'S <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>
      </div>
    </Layout>
  );
}
