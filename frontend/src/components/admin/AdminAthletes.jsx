import React, { useEffect, useState, useCallback } from "react";
import { Plus, Trash2 } from "lucide-react";
import { api } from "@/lib/api";
import { toast } from "sonner";

export const AdminAthletes = () => {
  const [athletes, setAthletes] = useState([]);
  const [form, setForm] = useState({ name: "", club: "", image: "" });
  const [saving, setSaving] = useState(false);

  const load = useCallback(() => {
    api.get("/athletes").then((res) => setAthletes(res.data)).catch(() => {});
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const add = async (e) => {
    e.preventDefault();
    if (!form.image) {
      toast.error("A URL da imagem é obrigatória");
      return;
    }
    setSaving(true);
    try {
      await api.post("/athletes", { ...form, order: athletes.length + 1 });
      toast.success("Atleta adicionado");
      setForm({ name: "", club: "", image: "" });
      load();
    } catch {
      toast.error("Erro ao adicionar atleta");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (a) => {
    if (!window.confirm("Remover este atleta do carrossel?")) return;
    try {
      await api.delete(`/athletes/${a.id}`);
      toast.success("Atleta removido");
      load();
    } catch {
      toast.error("Erro ao remover");
    }
  };

  const inputCls =
    "bg-transparent border border-white/15 rounded-lg px-3 py-2 text-white placeholder:text-zinc-600 outline-none focus:border-[#7EDAF2] focus:ring-2 focus:ring-[#7EDAF2]/30 transition-colors";

  return (
    <div data-testid="admin-athletes">
      <form onSubmit={add} className="rounded-xl border border-white/10 bg-[#121212] p-5 mb-8" data-testid="athlete-form">
        <h4 className="font-display text-2xl uppercase text-white mb-4">Adicionar atleta ao carrossel</h4>
        <div className="grid sm:grid-cols-3 gap-4">
          <input className={inputCls} placeholder="Nome (opcional)" data-testid="af-name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input className={inputCls} placeholder="Clube / Categoria (opcional)" data-testid="af-club" value={form.club} onChange={(e) => setForm({ ...form, club: e.target.value })} />
          <input className={inputCls} placeholder="URL da imagem *" data-testid="af-image" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
        </div>
        <button
          type="submit"
          data-testid="add-athlete-btn"
          disabled={saving}
          className="cta-glow mt-4 inline-flex items-center gap-2 bg-[#7EDAF2] hover:bg-[#A5E8F7] disabled:opacity-60 text-black font-bold px-5 py-2.5 rounded-full text-sm uppercase tracking-wide"
        >
          <Plus className="w-4 h-4" /> Adicionar
        </button>
      </form>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {athletes.map((a) => (
          <div key={a.id} data-testid={`admin-athlete-${a.id}`} className="relative rounded-xl overflow-hidden border border-white/10 aspect-[3/4] group">
            <img src={a.image} alt={a.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-3">
              {a.name && <p className="text-white font-semibold text-sm leading-tight">{a.name}</p>}
              {a.club && <p className="text-[#7EDAF2] text-xs">{a.club}</p>}
            </div>
            <button
              data-testid={`delete-athlete-${a.id}`}
              onClick={() => remove(a)}
              className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/70 hover:bg-red-500 text-white flex items-center justify-center transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
      {athletes.length === 0 && <p className="text-zinc-500">Ainda não há atletas no carrossel.</p>}
    </div>
  );
};
