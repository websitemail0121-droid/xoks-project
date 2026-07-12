import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, ShoppingCart, Minus, Plus, Star } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/api";
import { toast } from "sonner";

export const ProductShowcase = ({ product }) => {
  const { addItem } = useCart();
  const [size, setSize] = useState("M");
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);

  if (!product) return null;

  const gallery = product.gallery?.length ? product.gallery : [product.image];

  const handleAdd = () => {
    addItem(product, size, qty);
    toast.success(`${product.name} adicionada ao carrinho`, {
      description: `Tamanho ${size} · Quantidade ${qty}`,
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
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] border border-white/10 aspect-square flex items-center justify-center">
            <div className="absolute top-5 left-5 z-10 bg-[#7EDAF2] text-black text-xs font-bold uppercase px-3 py-1 rounded-full tracking-wide">
              Best Seller
            </div>
            <img
              data-testid="product-main-image"
              src={gallery[activeImg]}
              alt={product.name}
              className="w-[85%] h-[85%] object-contain drop-shadow-2xl"
            />
          </div>
          {gallery.length > 1 && (
            <div className="flex gap-3 mt-4">
              {gallery.map((g, i) => (
                <button
                  key={i}
                  data-testid={`product-thumb-${i}`}
                  onClick={() => setActiveImg(i)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border transition-colors bg-[#151515] ${
                    activeImg === i ? "border-[#7EDAF2]" : "border-white/10 hover:border-white/30"
                  }`}
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
            <span className="text-zinc-500 line-through">{formatPrice(product.price * 1.4, product.currency)}</span>
            <span className="text-[#7EDAF2] font-bold text-sm">-29%</span>
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

          {/* Size selector */}
          <div className="mt-8">
            <span className="text-sm font-semibold text-zinc-400 uppercase tracking-wide">Tamanho</span>
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
