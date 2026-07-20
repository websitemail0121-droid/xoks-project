import React, { useEffect, useState, useCallback } from "react";
import { Handshake, RefreshCw } from "lucide-react";
import { api } from "@/lib/api";

const TYPE_LABEL = {
  club: "Clube / Equipa",
  reseller: "Revendedor",
  brand: "Marca / Patrocínio",
  ambassador: "Embaixador / Atleta",
};

export const AdminPartnerships = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(() => {
    setLoading(true);
    api.get("/partnerships").then((res) => setItems(res.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div data-testid="admin-partnerships">
      <div className="flex items-center justify-between mb-6">
        <p className="text-zinc-400 text-sm">{items.length} pedido(s) de parceria</p>
        <button
          data-testid="partnerships-refresh-btn"
          onClick={load}
          className="flex items-center gap-2 text-sm border border-white/15 hover:border-[#7EDAF2] px-4 py-2 rounded-full transition-colors text-white"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} /> Atualizar
        </button>
      </div>

      {items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-white/15 p-16 text-center">
          <Handshake className="w-12 h-12 text-zinc-700 mx-auto mb-3" />
          <p className="text-zinc-400">Ainda não há pedidos de parceria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((p) => (
            <div key={p.id} data-testid={`partnership-${p.id}`} className="rounded-xl border border-white/10 bg-[#121212] p-5">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-white">{p.name}</h4>
                <span className="text-xs font-bold uppercase tracking-wide text-[#7EDAF2] bg-[#7EDAF2]/10 border border-[#7EDAF2]/30 px-2.5 py-1 rounded-full">
                  {TYPE_LABEL[p.type] || p.type}
                </span>
              </div>
              {p.organization && <p className="text-sm text-zinc-400 mt-1">{p.organization}</p>}
              <div className="text-sm text-zinc-400 mt-3 space-y-0.5">
                <p>{p.email}</p>
                {p.phone && <p>{p.phone}</p>}
              </div>
              {p.message && <p className="text-sm text-zinc-300 mt-3 italic border-l-2 border-white/10 pl-3">{p.message}</p>}
              <p className="text-xs text-zinc-600 mt-3">{new Date(p.created_at).toLocaleString("pt-PT")}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
