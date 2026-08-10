import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, ArrowRight, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/api";
import { toast } from "sonner";

export const ProductGrid = ({ products, hideHeader = false }) => {
  const { addItem } = useCart();

  const quickAdd = (e, p) => {
    e.preventDefault();
    e.stopPropagation();
    const size = p.sizes?.[Math.floor(p.sizes.length / 2)] || null;
    addItem(p, size, 1);
    toast.success(`${p.name} adicionada ao carrinho`, {
      description: size ? `Tamanho ${size}` : undefined,
    });
  };

  return (
    <section id="produto" className="relative py-24 sm:py-32 bg-[#0d0d0d] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {!hideHeader && (
          <div className="max-w-2xl mb-14">
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#7EDAF2]">A Coleção</span>
            <h2 className="font-display text-[clamp(2.5rem,6vw,4rem)] leading-none uppercase text-white mt-3">
              Escolhe a tua arma
            </h2>
            <p className="text-zinc-400 mt-4">
              Toda a gama XOK'S de caneleiras de alta performance. Proteção que acompanha o teu nível.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p, i) => (
            <motion.div
              key={p.id}
              data-testid={`product-card-${p.id}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
            >
              <Link
                to={`/produto/${p.id}`}
                className="group block rounded-2xl border border-white/10 bg-[#121212] overflow-hidden hover:border-[#7EDAF2]/40 transition-colors h-full flex flex-col"
              >
                <div style={p.image_bg === "light" ? { backgroundColor: "#FEFEFE" } : undefined} className={`relative aspect-square flex items-center justify-center overflow-hidden ${p.image_bg === "light" ? "" : "bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a]"}`}>
                  {p.badge && (
                    <span className="absolute top-4 left-4 z-10 bg-[#7EDAF2] text-black text-xs font-bold uppercase px-3 py-1 rounded-full tracking-wide">
                      {p.badge}
                    </span>
                  )}
                  <img
                    src={p.image}
                    alt={p.name}
                    className={`w-[80%] h-[80%] object-contain group-hover:scale-105 transition-transform duration-500 ${p.image_bg === "light" ? "" : "drop-shadow-2xl"}`}
                  />
                  <button
                    data-testid={`quick-add-${p.id}`}
                    onClick={(e) => quickAdd(e, p)}
                    className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-[#7EDAF2] text-black flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all hover:bg-[#A5E8F7]"
                    aria-label="Adicionar ao carrinho"
                  >
                    <ShoppingCart className="w-5 h-5" />
                  </button>
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
                      <span className="font-display text-2xl text-white">{formatPrice(p.price, p.currency)}</span>
                      {p.old_price && (
                        <span className="text-zinc-600 line-through text-sm">
                          {formatPrice(p.old_price, p.currency)}
                        </span>
                      )}
                    </div>
                    <span className="flex items-center gap-1 text-[#7EDAF2] text-sm font-semibold group-hover:gap-2 transition-all">
                      Ver <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
