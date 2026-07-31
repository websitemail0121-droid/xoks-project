import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { api } from "@/lib/api";
import { Layout } from "@/components/Layout";
import { PageHeader } from "@/components/PageHeader";
import { AthleteCarousel } from "@/components/AthleteCarousel";
import { SocialProof } from "@/components/SocialProof";

export default function Atletas() {
  const [athletes, setAthletes] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    api.get("/athletes").then((res) => setAthletes(res.data)).catch(() => {});
  }, []);

  return (
    <Layout>
      <PageHeader
        eyebrow="Team XOK'S"
        title="Os Nossos Atletas"
        accentWord="Atletas"
        subtitle="De promessas locais a profissionais de topo — conhece os jogadores que confiam nas caneleiras XOK'S para proteger cada jogada."
      />

      <div data-testid="atletas-page">
        <AthleteCarousel athletes={athletes} hideHeader />

        {/* athlete grid */}
        <section className="bg-[#0d0d0d] border-y border-white/5 py-20 sm:py-28">
          <div className="max-w-7xl mx-auto px-5 sm:px-8">
            <h2 className="font-display text-4xl uppercase text-white mb-10">Em campo com XOK'S</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {athletes.map((a, i) => (
                <motion.figure
                  key={a.id}
                  data-testid={`athlete-grid-${a.id}`}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, delay: (i % 4) * 0.08 }}
                  className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 group"
                >
                  <img src={a.image} alt={a.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
                  <figcaption className="absolute bottom-0 left-0 right-0 p-4">
                    {a.name && <p className="font-display text-xl uppercase text-white leading-none">{a.name}</p>}
                    {a.club && <p className="text-xs text-[#7EDAF2] font-semibold mt-1">{a.club}</p>}
                  </figcaption>
                </motion.figure>
              ))}
            </div>
          </div>
        </section>

        <SocialProof />

        {/* CTA */}
        <section className="py-20 sm:py-28 bg-[#0A0A0A]">
          <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center">
            <h2 className="font-display text-[clamp(2.5rem,6vw,4rem)] leading-none uppercase text-white">
              Queres ser <span className="text-[#7EDAF2]">atleta XOK'S?</span>
            </h2>
            <p className="text-zinc-400 mt-5 max-w-xl mx-auto">
              Procuramos jogadores determinados para representar a marca. Envia-nos a tua candidatura.
            </p>
            <a
              href="mailto:geral@patrickgomesfr-xoks.pt"
              data-testid="atletas-cta-parcerias"
              className="cta-glow inline-flex items-center gap-2 mt-8 bg-[#7EDAF2] hover:bg-[#A5E8F7] text-black font-bold px-8 py-4 rounded-full uppercase tracking-widest text-sm"
            >
              Candidatar-me <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>
      </div>
    </Layout>
  );
}
