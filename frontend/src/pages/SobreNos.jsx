import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Target, Rocket, ShieldCheck, Leaf, ArrowRight } from "lucide-react";
import { Layout } from "@/components/Layout";
import { PageHeader } from "@/components/PageHeader";

const CARBON = "https://images.unsplash.com/photo-1637004732258-4b792ce8f474?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwxfHxjYXJib24lMjBmaWJlciUyMG1hdGVyaWFsJTIwdGV4dHVyZSUyMG1hY3JvfGVufDB8fHx8MTc4NDU1Mjk0M3ww&ixlib=rb-4.1.0&q=85";
const HUDDLE = "https://images.pexels.com/photos/27394504/pexels-photo-27394504.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";

const values = [
  { icon: ShieldCheck, title: "Proteção sem compromissos", desc: "Cada caneleira é testada para absorver impactos reais de jogo." },
  { icon: Rocket, title: "Inovação constante", desc: "Materiais e design em evolução contínua para máxima performance." },
  { icon: Leaf, title: "Leveza extrema", desc: "Fibra de carbono premium para proteção que não pesa." },
  { icon: Target, title: "Feito para vencedores", desc: "Equipamento pensado para quem leva o jogo a sério." },
];

const stats = [
  { value: "12K+", label: "Atletas equipados" },
  { value: "55g", label: "Peso por caneleira" },
  { value: "4.9★", label: "Avaliação média" },
  { value: "30d", label: "Devolução gratuita" },
];

export default function SobreNos() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <PageHeader
        eyebrow="A Marca"
        title="Sobre a XOK'S"
        accentWord="XOK'S"
        subtitle="Nascemos da obsessão por proteção de elite. A PatrickGomesFR XOK'S cria caneleiras em fibra de carbono para quem se recusa a comprometer segurança por performance."
      />

      <div data-testid="sobre-page">
        {/* Story */}
        <section className="py-20 sm:py-28 bg-[#0A0A0A]">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#7EDAF2]">A Nossa História</span>
              <h2 className="font-display text-[clamp(2.25rem,5vw,3.5rem)] leading-none uppercase text-white mt-3">
                Da paixão pelo jogo à obsessão pela proteção
              </h2>
              <div className="text-zinc-400 mt-6 space-y-4 leading-relaxed">
                <p>
                  A XOK'S nasceu nos campos, entre entradas duras e a certeza de que a proteção existente não
                  estava à altura do jogo moderno. Decidimos mudar isso.
                </p>
                <p>
                  Combinámos fibra de carbono aeroespacial com um design anatómico obsessivo para criar uma
                  caneleira que se esquece — até ao momento em que a precisas. Leve, resistente e inconfundível.
                </p>
                <p>
                  Hoje, milhares de atletas em todo o país confiam nas XOK'S. Esta é apenas a primeira jogada.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-3xl overflow-hidden aspect-[4/3] border border-white/10"
            >
              <img src={CARBON} alt="Fibra de carbono XOK'S" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </motion.div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 sm:py-28 bg-[#0d0d0d] border-y border-white/5">
          <div className="max-w-7xl mx-auto px-5 sm:px-8">
            <h2 className="font-display text-4xl uppercase text-white mb-12">O que nos move</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((v, i) => {
                const Icon = v.icon;
                return (
                  <motion.div
                    key={v.title}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: i * 0.1 }}
                    className="rounded-2xl border border-white/10 bg-[#121212] p-6"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#7EDAF2] flex items-center justify-center mb-5">
                      <Icon className="w-6 h-6 text-black" />
                    </div>
                    <h3 className="font-display text-2xl uppercase text-white leading-none">{v.title}</h3>
                    <p className="text-sm text-zinc-400 mt-3 leading-relaxed">{v.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Stats over image */}
        <section className="relative py-24 overflow-hidden">
          <img src={HUDDLE} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/80" />
          <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-display text-5xl sm:text-6xl text-[#7EDAF2]">{s.value}</p>
                <p className="text-sm text-zinc-300 mt-2 uppercase tracking-wide">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 sm:py-28 bg-[#0A0A0A] text-center">
          <div className="max-w-3xl mx-auto px-5 sm:px-8">
            <h2 className="font-display text-[clamp(2.5rem,6vw,4rem)] leading-none uppercase text-white">
              Junta-te à <span className="text-[#7EDAF2]">revolução</span>
            </h2>
            <p className="text-zinc-400 mt-5">Equipa-te com a proteção que os profissionais escolhem.</p>
            <Link
              to="/produtos"
              data-testid="sobre-cta-produtos"
              className="cta-glow inline-flex items-center gap-2 mt-8 bg-[#7EDAF2] hover:bg-[#A5E8F7] text-black font-bold px-8 py-4 rounded-full uppercase tracking-widest text-sm"
            >
              Ver Caneleiras <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
}
