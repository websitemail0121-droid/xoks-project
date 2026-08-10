import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check, ShoppingCart, Minus, Plus, Star, Ruler } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/api";
import { SizeGuide } from "@/components/SizeGuide";
import { toast } from "sonner";

export const ProductShowcase = ({ product }) => {
  const { addItem } = useCart();
  const [size, setSize] = useState(null);
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [color, setColor] = useState(null);

  useEffect(() => {
    if (product?.sizes?.length) {
      setSize(product.sizes[Math.floor(product.sizes.length / 2)]);
    }
    setColor(product?.colors?.length ? product.colors[0] : null);
    setActiveImg(0);
  }, [product]);

  if (!product) return null;

  const gallery = product.gallery?.length ? product.gallery : [product.image];
  const lightBg = product.image_bg === "light";

  const selectColor = (c) => {
    setColor(c);
    const idx = gallery.findIndex((g) => g === c.image);
    if (idx >= 0) setActiveImg(idx);
  };

  const handleAdd = () => {
    addItem(product, size, qty);
    toast.success(`${product.name} adicionada ao carrinho`, {
      description: `${color ? color.name + " · " : ""}Tamanho ${size} · Quantidade ${qty}`,
    });
  };

  return (
    <section id="produto" className="relative py-24 sm:py-32 bg-[#0d0d0d] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        {/* Product image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:sticky lg:top-24"
        >
          <div style={lightBg ? { backgroundColor: "#FEFEFE" } : undefined} className={`relative rounded-3xl overflow-hidden border border-white/10 aspect-square flex items-center justify-center ${lightBg ? "" : "bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a]"}`}>
            {product.badge && (
              <div className="absolute top-5 left-5 z-10 bg-[#7EDAF2] text-black text-xs font-bold uppercase px-3 py-1 rounded-full tracking-wide">
                {product.badge}
              </div>
            )}
            <img
              data-testid="product-main-image"
              src={gallery[activeImg]}
              alt={product.name}
              className={`w-[85%] h-[85%] object-contain ${lightBg ? "" : "drop-shadow-2xl"}`}
            />
          </div>
          {gallery.length > 1 && (
            <div className="flex gap-3 mt-4">
              {gallery.map((g, i) => (
                <button
                  key={i}
                  data-testid={`product-thumb-${i}`}
                  onClick={() => setActiveImg(i)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border transition-colors ${lightBg ? "" : "bg-[#151515]"} ${
                    activeImg === i ? "border-[#7EDAF2]" : "border-white/10 hover:border-white/30"
                  }`}
                  style={lightBg ? { backgroundColor: "#FEFEFE" } : undefined}
                >
                  <img src={g} alt="" className="w-full h-full object-contain p-1" />
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Product details */}
        <div>
          <div className="flex items-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-[#7EDAF2] text-[#7EDAF2]" />
            ))}
            <span className="text-sm text-zinc-400 ml-2">4.9 · 1.284 avaliações</span>
          </div>

          <h2 data-testid="product-name" className="font-display text-[clamp(2.5rem,5vw,3.75rem)] leading-none uppercase text-white">
            {product.name}
          </h2>
          <p className="text-[#7EDAF2] font-semibold mt-2">{product.tagline}</p>

          <p className="text-zinc-400 leading-relaxed mt-5">{product.description}</p>

          <div className="mt-6 flex items-baseline gap-3">
            <span data-testid="product-price" className="font-display text-5xl text-white">
              {formatPrice(product.price, product.currency)}
            </span>
            {product.old_price && (
              <>
                <span className="text-zinc-500 line-through">{formatPrice(product.old_price, product.currency)}</span>
                <span className="text-[#7EDAF2] font-bold text-sm">
                  -{Math.round((1 - product.price / product.old_price) * 100)}%
                </span>
              </>
            )}
          </div>

          {/* Specs */}
          <ul className="mt-8 grid sm:grid-cols-2 gap-3">
            {product.specs?.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-zinc-300">
                <Check className="w-4 h-4 text-[#7EDAF2] mt-0.5 shrink-0" />
                {s}
              </li>
            ))}
          </ul>

          {/* Color selector */}
          {product.colors?.length > 0 && (
            <div className="mt-8">
              <span className="text-sm font-semibold text-zinc-400 uppercase tracking-wide">
                Cor: <span className="text-white">{color?.name}</span>
              </span>
              <div className="flex gap-3 mt-2">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    data-testid={`color-option-${c.name}`}
                    onClick={() => selectColor(c)}
                    aria-label={c.name}
                    className={`w-10 h-10 rounded-full border-2 transition-transform hover:scale-110 ${
                      color?.name === c.name ? "border-[#7EDAF2] scale-110" : "border-white/20"
                    }`}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Size selector */}
          <div className="mt-8">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-zinc-400 uppercase tracking-wide">Tamanho</span>
              <SizeGuide
                trigger={
                  <button
                    data-testid="size-guide-btn"
                    className="flex items-center gap-1.5 text-sm text-[#7EDAF2] hover:text-[#A5E8F7] font-semibold transition-colors"
                  >
                    <Ruler className="w-4 h-4" /> Guia de tamanhos
                  </button>
                }
              />
            </div>
            <div className="flex gap-2 mt-2">
              {product.sizes?.map((s) => (
                <button
                  key={s}
                  data-testid={`size-option-${s}`}
                  onClick={() => setSize(s)}
                  className={`w-12 h-12 rounded-lg font-bold border transition-colors ${
                    size === s
                      ? "bg-[#7EDAF2] text-black border-[#7EDAF2]"
                      : "bg-transparent text-white border-white/20 hover:border-white/50"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity + Add to cart */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <div className="flex items-center border border-white/20 rounded-full overflow-hidden">
              <button
                data-testid="qty-decrease"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="w-12 h-12 flex items-center justify-center hover:bg-white/5 transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span data-testid="qty-value" className="w-10 text-center font-bold">
                {qty}
              </span>
              <button
                data-testid="qty-increase"
                onClick={() => setQty((q) => q + 1)}
                className="w-12 h-12 flex items-center justify-center hover:bg-white/5 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <button
              data-testid="add-to-cart-btn"
              onClick={handleAdd}
              className="cta-glow flex-1 inline-flex items-center justify-center gap-2 bg-[#7EDAF2] hover:bg-[#A5E8F7] text-black font-bold px-8 py-4 rounded-full uppercase tracking-wide"
            >
              <ShoppingCart className="w-5 h-5" />
              Adicionar ao Carrinho
            </button>
          </div>

          <p className="text-xs text-zinc-500 mt-4">
            Envio grátis acima de 60€ · Entrega em 2-4 dias úteis · Devolução gratuita em 30 dias
          </p>
        </div>
      </div>
    </section>
  );
};
