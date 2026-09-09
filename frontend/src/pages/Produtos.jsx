import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Star, ShoppingCart, Sparkles } from "lucide-react";
import { api, formatPrice } from "@/lib/api";
import { Layout } from "@/components/Layout";
import { PageHeader } from "@/components/PageHeader";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

const SECTIONS = [
  {
    id: "collection",
    eyebrow: "A Coleção",
    title: "Original",
    subtitle: "Os modelos originais XOK'S.",
  },
  {
    id: "carbon",
    eyebrow: "Carbon Line",
    title: "Fibra de Carbono",
    subtitle: "Acabamentos em carbono real. Leveza e resistência para quem procura o melhor.",
  },
  {
    id: "custom",
    eyebrow: "XOK'S® Custom Studio",
    title: "Personalizadas",
    subtitle: "Cria umas caneleiras únicas com o teu nome, número e fotografias.",
    isCustom: true,
  },
];

function ProductCard({ p, isCustom }) {
  const { addItem } = useCart();
  const quickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const size = p.sizes?.[Math.floor(p.sizes.length / 2)] || null;
    addItem(p, size, 1);
    toast.success(`${p.name} adicionada ao carrinho`, {
      description: size ? `Tamanho ${size}` : undefined,
    });
  };

  const linkTo = isCustom
    ? `/custom-studio?tier=${p.id === "studio-pro" ? "pro" : "base"}`
    : `/produto/${p.id}`;

  return (
    <motion.div
      data-testid={`product-card-${p.id}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
    >
      <Link
        to={linkTo}
        className="group block rounded-2xl border border-white/10 bg-[#121212] overflow-hidden hover:border-[#7EDAF2]/40 transition-colors h-full flex flex-col"
      >
        <div
          style={p.image_bg === "light" ? { backgroundColor: "#FEFEFE" } : undefined}
          className={`relative aspect-square flex items-center justify-center overflow-hidden ${p.image_bg === "light" ? "" : "bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a]"}`}
        >
          {p.badge && (
            <span className={`absolute top-4 left-4 z-10 text-xs font-bold uppercase px-3 py-1 rounded-full tracking-wide ${isCustom ? "bg-gradient-to-r from-[#7EDAF2] to-[#A5E8F7] text-black" : "bg-[#7EDAF2] text-black"}`}>
              {p.badge}
            </span>
          )}
          <img
            src={p.image}
            alt={p.name}
            className={`w-[80%] h-[80%] object-contain group-hover:scale-105 transition-transform duration-500 ${p.image_bg === "light" ? "" : "drop-shadow-2xl"}`}
          />
          {!isCustom && (
            <button
              data-testid={`quick-add-${p.id}`}
              onClick={quickAdd}
              className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-[#7EDAF2] text-black flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all hover:bg-[#A5E8F7]"
              aria-label="Adicionar ao carrinho"
            >
              <ShoppingCart className="w-5 h-5" />
            </button>
          )}
        </div>
        <div className="p-5 flex flex-col flex-1">
          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, k) => (
              <Star key={k} className="w-3 h-3 fill-[#7EDAF2] text-[#7EDAF2]" />
            ))}
          </div>
          <h3 className="font-display text-2xl uppercase text-white leading-none">{p.name}</h3>
          <p className="text-sm text-zinc-500 mt-1 flex-1">{p.tagline}</p>
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-baseline gap-2">
              {isCustom && <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-widest">Desde</span>}
              <span className="font-display text-2xl text-white">{formatPrice(p.price, p.currency)}</span>
            </div>
            <span className="flex items-center gap-1 text-[#7EDAF2] text-sm font-semibold group-hover:gap-2 transition-all">
              {isCustom ? "Personalizar" : "Ver"} <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function CustomStudioBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative rounded-3xl overflow-hidden border border-[#7EDAF2]/30 bg-gradient-to-br from-[#0d1a1e] via-[#0a0a0a] to-[#0a0a0a] p-8 sm:p-12 mb-10"
    >
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#7EDAF2]/10 blur-3xl pointer-events-none" />
      <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-[#7EDAF2]" />
            <span className="text-[10px] font-bold tracking-[0.35em] uppercase text-[#7EDAF2]">XOK&apos;S® Custom Studio</span>
          </div>
          <h3 className="font-display text-3xl sm:text-4xl uppercase text-white leading-tight">
            Personaliza as tuas <span className="text-[#7EDAF2]">caneleiras</span>
          </h3>
          <p className="text-zinc-400 mt-3 text-sm max-w-md">
            Escolhe o carbono, adiciona nome, número e fotografias. Enviamos-te o preview em 48h para aprovares antes de produzirmos.
          </p>
        </div>
        <Link
          to="/custom-studio"
          data-testid="custom-studio-banner-cta"
          className="cta-glow inline-flex items-center gap-2 bg-[#7EDAF2] hover:bg-[#A5E8F7] text-black font-bold px-6 py-3.5 rounded-full uppercase tracking-widest text-xs whitespace-nowrap"
        >
          Explorar Studio <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </motion.div>
  );
}

export default function Produtos() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    api.get("/products").then((res) => setProducts(res.data)).catch(() => {});
  }, []);

  const grouped = useMemo(() => {
    const map = { collection: [], carbon: [], custom: [] };
    products.forEach((p) => {
      const sec = p.section || "collection";
      if (map[sec]) map[sec].push(p);
    });
    return map;
  }, [products]);

  return (
    <Layout>
      <PageHeader
        eyebrow="A Coleção"
        title="Caneleiras XOK'S"
        accentWord="XOK'S"
        subtitle="A gama completa de caneleiras, organizada por linha. Do modelo original ao 100% personalizado."
      />
      <section data-testid="produtos-page" className="relative pb-24 bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 space-y-24">
          {SECTIONS.map((section, idx) => {
            const items = grouped[section.id] || [];
            if (items.length === 0) return null;
            return (
              <div key={section.id} data-testid={`section-${section.id}`}>
                {section.isCustom && <CustomStudioBanner />}
                <div className="flex items-baseline justify-between gap-6 mb-8">
                  <div>
                    <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#7EDAF2]">{section.eyebrow}</span>
                    <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] leading-none uppercase text-white mt-2">
                      {section.title}
                    </h2>
                    <p className="text-zinc-400 mt-3 max-w-xl text-sm">{section.subtitle}</p>
                  </div>
                  <span className="hidden sm:block font-display text-6xl text-white/5 leading-none select-none">
                    0{idx + 1}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {items.map((p) => (
                    <ProductCard key={p.id} p={p} isCustom={section.isCustom} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </Layout>
  );
}
