import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Hammer,
  Sparkles,
  Gem,
  Brush,
  ScanSearch,
  Award,
  MessageSquare,
  Truck,
  ShieldCheck,
  PackageCheck,
  Headphones,
} from "lucide-react";
import { Layout } from "@/components/Layout";
import { PageHeader } from "@/components/PageHeader";

const CARBON = "https://images.unsplash.com/photo-1637004732258-4b792ce8f474?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwxfHxjYXJib24lMjBmaWJlciUyMG1hdGVyaWFsJTIwdGV4dHVyZSUyMG1hY3JvfGVufDB8fHx8MTc4NDU1Mjk0M3ww&ixlib=rb-4.1.0&q=85";
const HUDDLE = "https://images.pexels.com/photos/27394504/pexels-photo-27394504.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";

const differentiators = [
  { icon: Hammer, title: "Fabrico por encomenda", desc: "Cada par é produzido de raiz para ti — nada de produção em massa." },
  { icon: Sparkles, title: "Personalização exclusiva", desc: "Um produto único, adaptado ao estilo de cada atleta." },
  { icon: Gem, title: "Materiais de elevada qualidade", desc: "Selecionamos os melhores materiais para resistência e leveza." },
  { icon: Brush, title: "Acabamento cuidado", desc: "Detalhe e rigor em cada fase do processo de fabrico." },
  { icon: ScanSearch, title: "Atenção aos detalhes", desc: "Cada encomenda é tratada de forma individual e minuciosa." },
  { icon: Award, title: "Produção com rigor e dedicação", desc: "Feito com paixão pelo futebol, do início ao fim." },
];

const commitments = [
  { icon: ShieldCheck, label: "Qualidade em cada produto" },
  { icon: MessageSquare, label: "Comunicação transparente" },
  { icon: PackageCheck, label: "Produção cuidada" },
  { icon: Truck, label: "Entregas seguras" },
  { icon: Headphones, label: "Apoio ao cliente antes e após a compra" },
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
        subtitle="Acreditamos que cada jogador merece entrar em campo com equipamento que combine proteção, conforto e personalidade."
      />

      <div data-testid="sobre-page">
        {/* A Nossa História */}
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
                Feitas para além do convencional
              </h2>
              <div className="text-zinc-400 mt-6 space-y-4 leading-relaxed">
                <p>
                  A marca nasceu da paixão pelo futebol e da vontade de criar caneleiras que vão além do
                  convencional. Em vez de produtos produzidos em massa, desenvolvemos caneleiras
                  <span className="text-white font-semibold"> fabricadas por encomenda</span>, com atenção ao
                  detalhe e adaptadas ao estilo de cada atleta.
                </p>
                <p>
                  Cada par é produzido com dedicação, utilizando materiais de elevada qualidade e um processo
                  de fabrico que privilegia a resistência, a leveza e um acabamento cuidado.
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

        {/* A Nossa Missão */}
        <section className="py-20 sm:py-28 bg-[#0d0d0d] border-y border-white/5">
          <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center">
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#7EDAF2]">A Nossa Missão</span>
            <h2 className="font-display text-[clamp(2rem,5vw,3.25rem)] leading-tight uppercase text-white mt-4">
              Caneleiras personalizadas que dão <span className="text-[#7EDAF2]">confiança dentro de campo</span>
            </h2>
            <p className="text-zinc-400 mt-6 text-lg leading-relaxed">
              Aliamos desempenho, design e qualidade de fabrico. Queremos que cada cliente receba um produto
              único, feito especialmente para si.
            </p>
          </div>
        </section>

        {/* O Que Nos Diferencia */}
        <section className="py-20 sm:py-28 bg-[#0A0A0A]">
          <div className="max-w-7xl mx-auto px-5 sm:px-8">
            <div className="max-w-2xl mb-12">
              <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#7EDAF2]">O Que Nos Diferencia</span>
              <h2 className="font-display text-4xl uppercase text-white mt-3">Não acreditamos em soluções iguais para todos</h2>
              <p className="text-zinc-400 mt-4">Acreditamos em criar um produto que represente cada jogador.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {differentiators.map((d, i) => {
                const Icon = d.icon;
                return (
                  <motion.div
                    key={d.title}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.45, delay: (i % 3) * 0.1 }}
                    className="rounded-2xl border border-white/10 bg-[#121212] p-6 hover:border-[#7EDAF2]/40 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#7EDAF2] flex items-center justify-center mb-5">
                      <Icon className="w-6 h-6 text-black" />
                    </div>
                    <h3 className="font-display text-2xl uppercase text-white leading-none">{d.title}</h3>
                    <p className="text-sm text-zinc-400 mt-3 leading-relaxed">{d.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* O Nosso Compromisso */}
        <section className="py-20 sm:py-28 bg-[#0d0d0d] border-y border-white/5">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-3xl overflow-hidden aspect-[4/3] border border-white/10 order-2 lg:order-1"
            >
              <img src={HUDDLE} alt="Equipa XOK'S" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            </motion.div>
            <div className="order-1 lg:order-2">
              <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#7EDAF2]">O Nosso Compromisso</span>
              <h2 className="font-display text-4xl uppercase text-white mt-3 mb-8">
                A confiança dos nossos clientes em primeiro lugar
              </h2>
              <ul className="space-y-4">
                {commitments.map((c) => {
                  const Icon = c.icon;
                  return (
                    <li key={c.label} className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg border border-white/10 bg-white/[0.03] flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-[#7EDAF2]" strokeWidth={1.75} />
                      </div>
                      <span className="text-zinc-200">{c.label}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </section>

        {/* A Nossa Visão */}
        <section className="relative py-28 overflow-hidden">
          <img src={CARBON} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-black/80" />
          <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 text-center">
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#7EDAF2]">A Nossa Visão</span>
            <h2 className="font-display text-[clamp(2rem,5vw,3.25rem)] leading-tight uppercase text-white mt-4">
              Uma referência em caneleiras <span className="text-[#7EDAF2]">personalizadas</span>
            </h2>
            <p className="text-zinc-300 mt-6 text-lg leading-relaxed">
              Reconhecida pela qualidade, inovação e proximidade com os atletas. Queremos acompanhar jogadores
              de todos os níveis — desde os que dão os primeiros passos no futebol até aos que competem ao mais
              alto nível.
            </p>
          </div>
        </section>

        {/* Fecho / Obrigado */}
        <section className="py-24 sm:py-32 bg-[#0A0A0A] text-center">
          <div className="max-w-3xl mx-auto px-5 sm:px-8">
            <h2 className="font-display text-[clamp(2.25rem,6vw,4rem)] leading-[0.9] uppercase text-white">
              Obrigado por fazer parte da <span className="text-[#7EDAF2]">nossa história</span>
            </h2>
            <p className="text-zinc-400 mt-6 leading-relaxed">
              Cada encomenda representa mais do que uma venda — representa a confiança que depositas no nosso
              trabalho. Obrigado por escolheres a XOK'S. É um orgulho fazer parte do teu percurso dentro de campo.
            </p>
            <p className="font-display text-2xl uppercase text-[#7EDAF2] tracking-wide mt-10">
              Crafted for Your Game. Built to Perform.
            </p>
            <Link
              to="/produtos"
              data-testid="sobre-cta-produtos"
              className="cta-glow inline-flex items-center gap-2 mt-10 bg-[#7EDAF2] hover:bg-[#A5E8F7] text-black font-bold px-8 py-4 rounded-full uppercase tracking-widest text-sm"
            >
              Ver Caneleiras <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
}
