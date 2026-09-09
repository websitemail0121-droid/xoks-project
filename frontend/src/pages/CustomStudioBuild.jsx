import React, { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Upload, Check, X, ShieldCheck, Mail, ArrowRight, Loader2, Info } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { CartSheet } from "@/components/CartSheet";
import { api, API, formatPrice } from "@/lib/api";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

const CARBON_META = {
  plain: { label: "Carbon Plain", delta: 0, tagline: "Plain Weave" },
  twill: { label: "Carbon Twill", delta: 5, tagline: "2x2 Twill" },
  fusion: { label: "Carbon Fusion", delta: 10, tagline: "GG215 · Diamond" },
};

const TIER_META = {
  base: {
    id: "studio-base",
    name: "Studio Base",
    maxPhotos: 2,
    price: 92.9,
    image: "https://customer-assets-lqy194kg.emergentagent.net/job_xoks-shin-guards/artifacts/ql0rqrsp_Captura%20de%20ecr%C3%A3%202026-08-24%20191243.png",
  },
  pro: {
    id: "studio-pro",
    name: "Studio Pro",
    maxPhotos: 4,
    price: 99.9,
    image: "https://customer-assets-lqy194kg.emergentagent.net/job_xoks-shin-guards/artifacts/mk5elhi1_Captura%20de%20ecr%C3%A3%202026-08-24%20192818.png",
  },
};

const SIZES = ["XS", "S", "M", "L", "XL"];

const PhotoSlot = ({ label, required, file, onSelect, onClear, testid }) => {
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-wide text-zinc-400 flex items-center gap-2">
        {label}
        {required && <span className="text-[#7EDAF2]">*</span>}
      </label>
      <div className="mt-2 relative">
        {file ? (
          <div className="relative rounded-xl border border-[#7EDAF2]/40 bg-[#0f1a1e] p-4 flex flex-col items-center justify-center gap-3 min-h-[140px]">
            <div className="w-12 h-12 rounded-full bg-[#7EDAF2]/20 flex items-center justify-center">
              <Check className="w-6 h-6 text-[#7EDAF2]" strokeWidth={3} />
            </div>
            <div className="text-center">
              <p className="text-xs font-semibold text-[#7EDAF2] uppercase tracking-wide">Carregada</p>
              <p className="text-[11px] text-zinc-400 mt-1 truncate max-w-[140px] mx-auto">{file.name}</p>
            </div>
            <button
              type="button"
              onClick={onClear}
              data-testid={`${testid}-clear`}
              className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/50 hover:bg-red-500/80 text-white flex items-center justify-center transition-colors"
              aria-label="Remover foto"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <label
            data-testid={`${testid}-input`}
            className="min-h-[140px] rounded-xl border border-dashed border-white/15 bg-[#0d0d0d] hover:border-[#7EDAF2] hover:bg-[#7EDAF2]/[0.04] flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors group p-4"
          >
            <div className="w-10 h-10 rounded-full bg-white/5 group-hover:bg-[#7EDAF2]/20 flex items-center justify-center transition-colors">
              <Upload className="w-4 h-4 text-zinc-400 group-hover:text-[#7EDAF2] transition-colors" />
            </div>
            <div className="text-center">
              <p className="text-xs font-semibold text-zinc-300 group-hover:text-white">Carregar foto</p>
              <p className="text-[10px] text-zinc-500 mt-0.5">JPG · PNG · máx. 8MB</p>
            </div>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && onSelect(e.target.files[0])}
            />
          </label>
        )}
      </div>
    </div>
  );
};

export default function CustomStudioBuild() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const tierId = (searchParams.get("tier") || "base").toLowerCase() === "pro" ? "pro" : "base";
  const carbonId = ["plain", "twill", "fusion"].includes(searchParams.get("carbon"))
    ? searchParams.get("carbon")
    : "plain";

  const tier = TIER_META[tierId];
  const carbon = CARBON_META[carbonId];

  const [size, setSize] = useState("M");
  const [playerName, setPlayerName] = useState("");
  const [playerNumber, setPlayerNumber] = useState("");
  const [notes, setNotes] = useState("");
  const [photos, setPhotos] = useState({}); // { left: {file, id, url, name, previewUrl}, right, extra1, extra2 }
  const [uploading, setUploading] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const slotKeys = useMemo(() => {
    const base = ["left", "right"];
    if (tier.maxPhotos > 2) {
      for (let i = 1; i <= tier.maxPhotos - 2; i++) base.push(`extra${i}`);
    }
    return base;
  }, [tier.maxPhotos]);

  const finalPrice = tier.price + carbon.delta;

  const handleUpload = async (slot, file) => {
    if (!file) return;
    if (!["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(file.type)) {
      toast.error("Formato inválido. Só JPG ou PNG.");
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      toast.error("Ficheiro muito grande (máx. 8MB).");
      return;
    }
    setUploading(slot);
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await api.post("/uploads/custom-photo", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setPhotos((p) => ({
        ...p,
        [slot]: {
          id: res.data.id,
          url: res.data.url,
          name: file.name,
        },
      }));
      toast.success("Foto carregada");
    } catch (err) {
      toast.error("Não foi possível carregar a foto.", {
        description: err?.response?.data?.detail || "Tenta novamente",
      });
    } finally {
      setUploading(null);
    }
  };

  const handleClear = (slot) => {
    setPhotos((p) => {
      const n = { ...p };
      delete n[slot];
      return n;
    });
  };

  const handleAddToCart = () => {
    if (!photos.left) {
      toast.error("A foto da caneleira esquerda é obrigatória");
      const el = document.querySelector('[data-testid="photo-left-input"]');
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    if (!playerName.trim()) {
      toast.error("Introduz o nome do jogador");
      return;
    }
    setSubmitting(true);
    try {
      const rightUrl = photos.right?.url || photos.left.url; // fallback: mesma foto nos dois lados
      const extras = slotKeys.filter((k) => k.startsWith("extra")).map((k) => photos[k]?.url).filter(Boolean);
      const customData = {
        tier: tierId,
        carbon: carbonId,
        player_name: playerName.trim(),
        player_number: playerNumber.trim(),
        notes: notes.trim(),
        photo_left: photos.left.url,
        photo_right: rightUrl,
        photo_extras: extras,
      };
      const productLike = {
        id: tier.id,
        name: `XOK'S® ${tier.name} · ${carbon.label}`,
        price: finalPrice,
        image: tier.image,
      };
      addItem(productLike, size, 1, {
        custom_data: customData,
        price: finalPrice,
        image: tier.image,
        name: productLike.name,
      });
      toast.success("Adicionado ao carrinho", {
        description: "Confirmamos o preview do design em 48h por email.",
      });
      // Reset after add
      setTimeout(() => {
        setSubmitting(false);
        navigate("/checkout");
      }, 600);
    } catch (e) {
      setSubmitting(false);
      toast.error("Erro inesperado, tenta novamente.");
    }
  };

  return (
    <div className="bg-[#0A0A0A] min-h-screen text-white">
      <Navigation />
      <CartSheet />

      <div className="pt-20 sm:pt-24 max-w-7xl mx-auto px-4 sm:px-8">
        <button
          onClick={() => navigate("/custom-studio")}
          data-testid="build-back-btn"
          className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Voltar à seleção
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-6 sm:pt-8 pb-20 sm:pb-24 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10">
        {/* Left column: preview + summary */}
        <aside className="lg:col-span-5">
          <div className="lg:sticky lg:top-28 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative rounded-3xl overflow-hidden border border-white/10 bg-[#FEFEFE] aspect-square flex items-center justify-center"
            >
              <img
                src={tier.image}
                alt={tier.name}
                data-testid="build-static-preview"
                className="w-full h-full object-contain"
              />
              <div className="absolute top-4 left-4 bg-black/80 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full backdrop-blur">
                {tier.name}
              </div>
            </motion.div>

            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#141414] to-[#0a0a0a] p-6">
              <div className="flex items-baseline justify-between mb-4">
                <div>
                  <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#7EDAF2]">A tua seleção</p>
                  <h3 className="font-display text-2xl uppercase mt-1">{tier.name}</h3>
                  <p className="text-xs text-zinc-500 mt-1">{carbon.label} · {carbon.tagline}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-zinc-500">Total</p>
                  <p className="font-display text-3xl text-[#7EDAF2]" data-testid="build-total">
                    {formatPrice(finalPrice)}
                  </p>
                </div>
              </div>
              <div className="pt-4 border-t border-white/10 space-y-2 text-xs text-zinc-400">
                <div className="flex justify-between"><span>Modelo base</span><span className="text-zinc-200">{formatPrice(tier.price)}</span></div>
                <div className="flex justify-between"><span>Carbono {carbon.label}</span><span className="text-zinc-200">{carbon.delta === 0 ? "Incluído" : `+${formatPrice(carbon.delta)}`}</span></div>
              </div>
            </div>
          </div>
        </aside>

        {/* Right column: form */}
        <div className="lg:col-span-7 space-y-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-[1px] bg-[#7EDAF2]" />
              <span className="text-xs font-bold tracking-[0.35em] uppercase text-[#7EDAF2]">Custom Studio</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl uppercase leading-tight">
              Personaliza as tuas <br /><span className="text-[#7EDAF2]">{tier.name}</span>
            </h1>
            <p className="text-zinc-400 mt-3 max-w-md text-sm">
              Preenche os campos abaixo. Enviamos-te o preview do design por email em 48h para aprovares antes de produzirmos.
            </p>
          </div>

          {/* Sizes */}
          <section>
            <h2 className="font-display text-2xl uppercase text-white mb-3">Tamanho</h2>
            <div className="flex flex-wrap gap-2">
              {SIZES.map((s) => (
                <button
                  key={s}
                  type="button"
                  data-testid={`size-${s}`}
                  onClick={() => setSize(s)}
                  className={`w-14 h-14 rounded-xl font-bold uppercase text-sm border transition-all ${
                    size === s
                      ? "border-[#7EDAF2] bg-[#7EDAF2] text-black"
                      : "border-white/15 hover:border-white/40 text-white"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </section>

          {/* Player info */}
          <section>
            <h2 className="font-display text-2xl uppercase text-white mb-4">Identidade do jogador</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-wide text-zinc-400">Nome do jogador <span className="text-[#7EDAF2]">*</span></label>
                <input
                  type="text"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  placeholder="Ex: João Castro"
                  data-testid="input-player-name"
                  maxLength={30}
                  className="bg-transparent border border-white/15 rounded-lg px-4 py-3 text-white placeholder:text-zinc-600 outline-none focus:border-[#7EDAF2] focus:ring-2 focus:ring-[#7EDAF2]/30 transition-colors"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-wide text-zinc-400">Número</label>
                <input
                  type="number"
                  value={playerNumber}
                  onChange={(e) => setPlayerNumber(e.target.value.replace(/[^0-9]/g, "").slice(0, 3))}
                  placeholder="10"
                  data-testid="input-player-number"
                  className="bg-transparent border border-white/15 rounded-lg px-4 py-3 text-white placeholder:text-zinc-600 outline-none focus:border-[#7EDAF2] focus:ring-2 focus:ring-[#7EDAF2]/30 transition-colors"
                />
              </div>
            </div>
          </section>

          {/* Photos */}
          <section>
            <div className="flex items-baseline justify-between mb-1">
              <h2 className="font-display text-2xl uppercase text-white">Fotografias</h2>
              <span className="text-xs text-zinc-500">
                Até {tier.maxPhotos} · {Object.keys(photos).length}/{tier.maxPhotos} carregadas
              </span>
            </div>
            <p className="text-xs text-zinc-500 mb-4 flex items-center gap-1.5">
              <Info className="w-3 h-3" />
              A foto esquerda é obrigatória. Se não enviares a direita, usamos a mesma nos dois lados.
            </p>
            <div className={`grid grid-cols-2 ${tier.maxPhotos > 2 ? "md:grid-cols-4" : ""} gap-3`}>
              {slotKeys.map((slot, idx) => {
                const labels = {
                  left: "Foto esquerda",
                  right: "Foto direita",
                };
                const label = labels[slot] || `Extra ${idx - 1}`;
                const required = slot === "left";
                return (
                  <div key={slot} className="relative">
                    <PhotoSlot
                      label={label}
                      required={required}
                      file={photos[slot]}
                      onSelect={(file) => handleUpload(slot, file)}
                      onClear={() => handleClear(slot)}
                      testid={`photo-${slot}`}
                    />
                    {uploading === slot && (
                      <div className="absolute inset-0 mt-8 rounded-xl bg-black/60 backdrop-blur-sm flex items-center justify-center">
                        <Loader2 className="w-6 h-6 text-[#7EDAF2] animate-spin" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Notes */}
          <section>
            <h2 className="font-display text-2xl uppercase text-white mb-3">Observações <span className="text-zinc-600 text-base">(opcional)</span></h2>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              data-testid="input-notes"
              placeholder="Ex: preferência de posição do nome, cores adicionais, referências..."
              className="w-full bg-transparent border border-white/15 rounded-lg px-4 py-3 text-white placeholder:text-zinc-600 outline-none focus:border-[#7EDAF2] focus:ring-2 focus:ring-[#7EDAF2]/30 transition-colors"
            />
          </section>

          {/* CTA */}
          <div>
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={submitting || !!uploading}
              data-testid="add-custom-to-cart-btn"
              className="cta-glow w-full inline-flex items-center justify-center gap-2 bg-[#7EDAF2] hover:bg-[#A5E8F7] disabled:opacity-60 text-black font-bold px-8 py-4 rounded-full uppercase tracking-widest transition-colors"
            >
              {submitting ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> A adicionar...</>
              ) : (
                <>Adicionar ao carrinho · {formatPrice(finalPrice)} <ArrowRight className="w-4 h-4" /></>
              )}
            </button>

            {/* Trust notes */}
            <div className="mt-6 grid sm:grid-cols-2 gap-3">
              <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-[#101010] p-4">
                <Mail className="w-5 h-5 text-[#7EDAF2] shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-white">Preview em 48h</p>
                  <p className="text-xs text-zinc-500 mt-1">Recebes o design final por email para validares antes da produção.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-[#101010] p-4">
                <ShieldCheck className="w-5 h-5 text-[#7EDAF2] shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-white">Aprovas antes de produzir</p>
                  <p className="text-xs text-zinc-500 mt-1">A montagem do design é obrigatória — só produzimos após o teu OK.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
