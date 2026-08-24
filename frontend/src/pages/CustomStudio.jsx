import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Check, Palette, Camera, Clock } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { CartSheet } from "@/components/CartSheet";
import { api, formatPrice } from "@/lib/api";

const CARBON_OPTIONS = [
  {
    id: "plain",
    name: "Carbon Plain",
    tagline: "Plain Weave",
    delta: 0,
    image: "/carbon-plain-v1.png",
    description: "O acabamento mais limpo — visual elegante e brilho profundo.",
    level: "Essencial",
  },
  {
    id: "twill",
    name: "Carbon Twill",
    tagline: "2x2 Twill",
    delta: 5,
    image: "/carbon-twill.png",
    description: "Padrão sarja premium com brilho profundo e textura marcada.",
    level: "Premium",
  },
  {
    id: "fusion",
    name: "Carbon Fusion",
    tagline: "GG215 · Diamond",
    delta: 10,
    image: "/carbon-fusion.png",
    description: "Topo de gama. Textura diamante e rigidez máxima.",
    level: "Top Gama",
  },
];

const TIERS = [
  {
    id: "base",
    name: "Studio Base",
    tagline: "Design Your Identity",
    price: 92.9,
    features: ["Até 2 fotografias", "Nome + número personalizados", "Preview do design em 48h", "Aprovação antes de produzir"],
    image: "https://customer-assets-lqy194kg.emergentagent.net/job_xoks-shin-guards/artifacts/ql0rqrsp_Captura%20de%20ecr%C3%A3%202026-08-24%20191243.png",
  },
  {
    id: "pro",
    name: "Studio Pro",
    tagline: "Advanced Custom",
    price: 99.9,
    features: ["Até 4 fotografias", "Nome + número personalizados", "Acabamentos premium exclusivos", "Preview do design em 48h"],
    image: "https://customer-assets-lqy194kg.emergentagent.net/job_xoks-shin-guards/artifacts/mk5elhi1_Captura%20de%20ecr%C3%A3%202026-08-24%20192818.png",
    highlight: true,
  },
];

export default function CustomStudio() {
  const navigate = useNavigate();
  const [carbon, setCarbon] = useState("plain");
  const [tier, setTier] = useState("base");
  const [products, setProducts] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
    api.get("/products").then((res) => {
      const map = {};
      res.data.forEach((p) => (map[p.id] = p));
      setProducts(map);
    }).catch(() => {});
  }, []);

  const selectedTier = TIERS.find((t) => t.id === tier);
  const selectedCarbon = CARBON_OPTIONS.find((c) => c.id === carbon);
  const finalPrice = useMemo(() => (selectedTier?.price || 0) + (selectedCarbon?.delta || 0), [selectedTier, selectedCarbon]);

  const goToBuild = () => {
    navigate(`/custom-studio/build?tier=${tier}&carbon=${carbon}`);
  };

  return (
    <div className="bg-[#0A0A0A] min-h-screen text-white">
      <Navigation />
      <CartSheet />

      {/* Hero */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,#7EDAF215,transparent_50%),radial-gradient(circle_at_80%_100%,#7EDAF210,transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.9' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' /%3E%3C/svg%3E\")" }} />
        <div className="relative max-w-5xl mx-auto px-5 sm:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="flex items-center gap-2 mb-6">
            <div className="w-10 h-[1px] bg-[#7EDAF2]" />
            <span className="text-xs font-bold tracking-[0.35em] uppercase text-[#7EDAF2]">XOK&apos;S® Custom Studio</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            data-testid="custom-studio-hero-title"
            className="font-display text-[clamp(3rem,9vw,6.5rem)] leading-[0.9] uppercase text-white"
          >
            Design Your <br />
            <span className="text-[#7EDAF2] italic">Identity.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-6 max-w-xl text-lg text-zinc-400"
          >
            Cria umas caneleiras únicas, produzidas exclusivamente para ti. Sem stock, sem repetições. Só a tua história em fibra de carbono.
          </motion.p>

          {/* How it works badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 flex flex-wrap gap-3"
          >
            {[
              { icon: Palette, label: "Passo 1 · Carbono" },
              { icon: Sparkles, label: "Passo 2 · Estilo" },
              { icon: Camera, label: "Passo 3 · Fotos" },
              { icon: Clock, label: "Preview 48h" },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-xs text-zinc-300">
                <s.icon className="w-3.5 h-3.5 text-[#7EDAF2]" />
                <span className="font-semibold tracking-wide uppercase">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* PASSO 1: Choose Carbon */}
      <section className="relative py-20 bg-[#0d0d0d] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex items-baseline gap-4 mb-3">
            <span className="font-display text-6xl text-[#7EDAF2]/30 leading-none">01</span>
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#7EDAF2]">Passo 1</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl uppercase text-white leading-tight">
            Escolhe o teu <span className="text-[#7EDAF2]">carbono</span>
          </h2>
          <p className="text-zinc-400 mt-3 max-w-xl text-sm">A base da tua caneleira. Cada tipo tem uma textura, um brilho e uma personalidade próprias.</p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
            {CARBON_OPTIONS.map((c) => {
              const active = carbon === c.id;
              return (
                <button
                  key={c.id}
                  data-testid={`carbon-select-${c.id}`}
                  onClick={() => setCarbon(c.id)}
                  className={`text-left rounded-2xl overflow-hidden border transition-all duration-300 group ${
                    active
                      ? "border-[#7EDAF2] bg-[#7EDAF2]/[0.06] shadow-[0_0_0_1px_#7EDAF240,0_20px_60px_-15px_#7EDAF230]"
                      : "border-white/10 bg-[#111] hover:border-white/25"
                  }`}
                >
                  <div className="relative aspect-[4/3] bg-[#FEFEFE] flex items-center justify-center overflow-hidden">
                    <img src={c.image} alt={c.name} className="w-[70%] h-[85%] object-contain group-hover:scale-105 transition-transform duration-500" />
                    <span className={`absolute top-3 left-3 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${active ? "bg-[#7EDAF2] text-black" : "bg-black/70 text-white"}`}>
                      {c.level}
                    </span>
                    {active && (
                      <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-[#7EDAF2] text-black flex items-center justify-center">
                        <Check className="w-4 h-4" strokeWidth={3} />
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <div className="flex items-baseline justify-between">
                      <h3 className="font-display text-2xl uppercase leading-none">{c.name}</h3>
                      <span className={`text-xs font-semibold ${active ? "text-[#7EDAF2]" : "text-zinc-500"}`}>
                        {c.delta === 0 ? "Incluído" : `+${formatPrice(c.delta)}`}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-500 uppercase tracking-widest mt-1">{c.tagline}</p>
                    <p className="text-sm text-zinc-400 mt-3">{c.description}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* PASSO 2: Choose Tier */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex items-baseline gap-4 mb-3">
            <span className="font-display text-6xl text-[#7EDAF2]/30 leading-none">02</span>
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#7EDAF2]">Passo 2</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl uppercase text-white leading-tight">
            Escolhe o teu <span className="text-[#7EDAF2]">nível</span>
          </h2>
          <p className="text-zinc-400 mt-3 max-w-xl text-sm">Quantas memórias vais levar contigo em campo?</p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            {TIERS.map((t) => {
              const active = tier === t.id;
              return (
                <button
                  key={t.id}
                  data-testid={`tier-select-${t.id}`}
                  onClick={() => setTier(t.id)}
                  className={`text-left relative rounded-3xl overflow-hidden border transition-all duration-300 group ${
                    active
                      ? "border-[#7EDAF2] shadow-[0_0_0_1px_#7EDAF240,0_25px_70px_-20px_#7EDAF250]"
                      : "border-white/10 hover:border-white/25"
                  }`}
                >
                  {t.highlight && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 bg-gradient-to-r from-[#7EDAF2] to-[#A5E8F7] text-black text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg shadow-[#7EDAF2]/20">
                      Mais Escolhido
                    </span>
                  )}
                  <div className="grid grid-cols-2">
                    <div className="aspect-square bg-[#FEFEFE] flex items-center justify-center overflow-hidden">
                      <img src={t.image} alt={t.name} className="w-[75%] h-[85%] object-contain group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="bg-gradient-to-br from-[#141414] to-[#0a0a0a] p-6 flex flex-col justify-between">
                      <div>
                        <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#7EDAF2]">{t.tagline}</p>
                        <h3 className="font-display text-3xl uppercase text-white leading-none mt-2">{t.name}</h3>
                        <div className="mt-4 flex items-baseline gap-1.5">
                          <span className="text-xs text-zinc-500 uppercase tracking-wide">Desde</span>
                          <span className="font-display text-3xl text-white">{formatPrice(t.price)}</span>
                        </div>
                        <ul className="mt-5 space-y-2">
                          {t.features.map((f, k) => (
                            <li key={k} className="flex items-start gap-2 text-xs text-zinc-300">
                              <Check className="w-3.5 h-3.5 text-[#7EDAF2] shrink-0 mt-0.5" strokeWidth={3} />
                              <span>{f}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      {active && (
                        <div className="mt-4 flex items-center gap-2 text-[#7EDAF2] text-xs font-bold uppercase tracking-widest">
                          <Check className="w-4 h-4" strokeWidth={3} /> Selecionado
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Sticky CTA summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 rounded-2xl border border-white/10 bg-gradient-to-br from-[#141414] to-[#0a0a0a] p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
          >
            <div>
              <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-zinc-500">A tua seleção</p>
              <p className="font-display text-2xl uppercase text-white mt-2">
                {selectedTier?.name} <span className="text-[#7EDAF2]">·</span> {selectedCarbon?.name}
              </p>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-xs text-zinc-500 uppercase tracking-wide">Total desde</span>
                <span className="font-display text-3xl text-[#7EDAF2]" data-testid="custom-studio-total">
                  {formatPrice(finalPrice)}
                </span>
              </div>
            </div>
            <button
              data-testid="go-to-build-btn"
              onClick={goToBuild}
              className="cta-glow inline-flex items-center gap-2 bg-[#7EDAF2] hover:bg-[#A5E8F7] text-black font-bold px-8 py-4 rounded-full uppercase tracking-widest text-sm transition-colors"
            >
              Personalizar Agora
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
