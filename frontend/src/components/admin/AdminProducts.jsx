import React, { useEffect, useState, useCallback } from "react";
import { Plus, Pencil, Trash2, Star } from "lucide-react";
import { api, formatPrice } from "@/lib/api";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

const EMPTY = {
  name: "",
  tagline: "",
  description: "",
  price: "",
  old_price: "",
  image: "",
  gallery: "",
  specs: "",
  sizes: "S, M, L, XL",
  badge: "",
  featured: false,
  active: true,
};

const Input = ({ label, ...props }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-semibold uppercase tracking-wide text-zinc-400">{label}</label>
    <input
      {...props}
      className="bg-transparent border border-white/15 rounded-lg px-3 py-2 text-white placeholder:text-zinc-600 outline-none focus:border-[#7EDAF2] focus:ring-2 focus:ring-[#7EDAF2]/30 transition-colors"
    />
  </div>
);

const Area = ({ label, ...props }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-semibold uppercase tracking-wide text-zinc-400">{label}</label>
    <textarea
      {...props}
      className="bg-transparent border border-white/15 rounded-lg px-3 py-2 text-white placeholder:text-zinc-600 outline-none focus:border-[#7EDAF2] focus:ring-2 focus:ring-[#7EDAF2]/30 transition-colors"
    />
  </div>
);

export const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);

  const load = useCallback(() => {
    api.get("/products?include_inactive=true").then((res) => setProducts(res.data)).catch(() => {});
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const openNew = () => {
    setEditing(null);
    setForm(EMPTY);
    setOpen(true);
  };

  const openEdit = (p) => {
    setEditing(p);
    setForm({
      name: p.name,
      tagline: p.tagline || "",
      description: p.description || "",
      price: String(p.price),
      old_price: p.old_price ? String(p.old_price) : "",
      image: p.image || "",
      gallery: (p.gallery || []).join("\n"),
      specs: (p.specs || []).join("\n"),
      sizes: (p.sizes || []).join(", "),
      badge: p.badge || "",
      featured: !!p.featured,
      active: p.active !== false,
    });
    setOpen(true);
  };

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const save = async () => {
    if (!form.name || !form.price) {
      toast.error("Nome e preço são obrigatórios");
      return;
    }
    setSaving(true);
    const gallery = form.gallery.split("\n").map((s) => s.trim()).filter(Boolean);
    const payload = {
      name: form.name,
      tagline: form.tagline,
      description: form.description,
      price: parseFloat(form.price),
      old_price: form.old_price ? parseFloat(form.old_price) : null,
      image: form.image || gallery[0] || "",
      gallery: gallery.length ? gallery : form.image ? [form.image] : [],
      specs: form.specs.split("\n").map((s) => s.trim()).filter(Boolean),
      sizes: form.sizes.split(",").map((s) => s.trim()).filter(Boolean),
      badge: form.badge || null,
      featured: form.featured,
      active: form.active,
    };
    try {
      if (editing) {
        await api.put(`/products/${editing.id}`, payload);
        toast.success("Produto atualizado");
      } else {
        await api.post("/products", payload);
        toast.success("Produto criado");
      }
      setOpen(false);
      load();
    } catch (e) {
      toast.error("Erro ao guardar produto");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (p) => {
    if (!window.confirm(`Eliminar "${p.name}"?`)) return;
    try {
      await api.delete(`/products/${p.id}`);
      toast.success("Produto eliminado");
      load();
    } catch {
      toast.error("Erro ao eliminar");
    }
  };

  return (
    <div data-testid="admin-products">
      <div className="flex items-center justify-between mb-6">
        <p className="text-zinc-400 text-sm">{products.length} produto(s)</p>
        <button
          data-testid="new-product-btn"
          onClick={openNew}
          className="cta-glow inline-flex items-center gap-2 bg-[#7EDAF2] hover:bg-[#A5E8F7] text-black font-bold px-5 py-2.5 rounded-full text-sm uppercase tracking-wide"
        >
          <Plus className="w-4 h-4" /> Novo produto
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((p) => (
          <div
            key={p.id}
            data-testid={`admin-product-${p.id}`}
            className={`rounded-xl border bg-[#121212] overflow-hidden ${p.active === false ? "border-white/5 opacity-60" : "border-white/10"}`}
          >
            <div className="relative aspect-video bg-[#0d0d0d] flex items-center justify-center">
              <img src={p.image} alt={p.name} className="h-full object-contain p-2" />
              {p.featured && (
                <span className="absolute top-2 left-2 flex items-center gap-1 bg-[#7EDAF2] text-black text-[10px] font-bold px-2 py-0.5 rounded-full">
                  <Star className="w-3 h-3" /> Destaque
                </span>
              )}
              {p.active === false && (
                <span className="absolute top-2 right-2 bg-zinc-700 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">Inativo</span>
              )}
            </div>
            <div className="p-4">
              <h4 className="font-semibold text-white leading-tight">{p.name}</h4>
              <p className="text-[#7EDAF2] font-bold mt-1">{formatPrice(p.price, p.currency)}</p>
              <div className="flex gap-2 mt-3">
                <button
                  data-testid={`edit-product-${p.id}`}
                  onClick={() => openEdit(p)}
                  className="flex-1 inline-flex items-center justify-center gap-1 border border-white/15 hover:border-[#7EDAF2] rounded-lg py-2 text-sm text-white transition-colors"
                >
                  <Pencil className="w-3.5 h-3.5" /> Editar
                </button>
                <button
                  data-testid={`delete-product-${p.id}`}
                  onClick={() => remove(p)}
                  className="inline-flex items-center justify-center border border-white/15 hover:border-red-400 hover:text-red-400 rounded-lg py-2 px-3 text-sm text-zinc-400 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-[#121212] border-white/10 text-white max-w-2xl max-h-[90vh] overflow-y-auto" data-testid="product-form-dialog">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl uppercase">
              {editing ? "Editar produto" : "Novo produto"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid sm:grid-cols-2 gap-4 mt-2">
            <Input label="Nome" data-testid="pf-name" value={form.name} onChange={(e) => set("name", e.target.value)} />
            <Input label="Badge (opcional)" data-testid="pf-badge" value={form.badge} onChange={(e) => set("badge", e.target.value)} placeholder="Novo, Pro..." />
            <Input label="Tagline" data-testid="pf-tagline" value={form.tagline} onChange={(e) => set("tagline", e.target.value)} />
            <div className="grid grid-cols-2 gap-4">
              <Input label="Preço (€)" data-testid="pf-price" type="number" step="0.01" value={form.price} onChange={(e) => set("price", e.target.value)} />
              <Input label="Preço antigo" data-testid="pf-oldprice" type="number" step="0.01" value={form.old_price} onChange={(e) => set("old_price", e.target.value)} />
            </div>
            <div className="sm:col-span-2">
              <Area label="Descrição" rows={3} data-testid="pf-desc" value={form.description} onChange={(e) => set("description", e.target.value)} />
            </div>
            <div className="sm:col-span-2">
              <Input label="Imagem principal (URL)" data-testid="pf-image" value={form.image} onChange={(e) => set("image", e.target.value)} placeholder="https://..." />
            </div>
            <div className="sm:col-span-2">
              <Area label="Galeria (uma URL por linha)" rows={2} data-testid="pf-gallery" value={form.gallery} onChange={(e) => set("gallery", e.target.value)} />
            </div>
            <div className="sm:col-span-2">
              <Area label="Especificações (uma por linha)" rows={4} data-testid="pf-specs" value={form.specs} onChange={(e) => set("specs", e.target.value)} />
            </div>
            <Input label="Tamanhos (separados por vírgula)" data-testid="pf-sizes" value={form.sizes} onChange={(e) => set("sizes", e.target.value)} />
            <div className="flex items-end gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.featured} onChange={(e) => set("featured", e.target.checked)} className="w-4 h-4 accent-[#7EDAF2]" data-testid="pf-featured" />
                <span className="text-sm text-zinc-300">Destaque</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.active} onChange={(e) => set("active", e.target.checked)} className="w-4 h-4 accent-[#7EDAF2]" data-testid="pf-active" />
                <span className="text-sm text-zinc-300">Ativo</span>
              </label>
            </div>
          </div>
          <DialogFooter className="mt-4">
            <button
              data-testid="save-product-btn"
              onClick={save}
              disabled={saving}
              className="cta-glow bg-[#7EDAF2] hover:bg-[#A5E8F7] disabled:opacity-60 text-black font-bold px-6 py-2.5 rounded-full uppercase tracking-wide text-sm"
            >
              {saving ? "A guardar..." : "Guardar"}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
