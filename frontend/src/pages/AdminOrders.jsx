import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { RefreshCw, Package, TrendingUp, Clock, ArrowLeft } from "lucide-react";
import { api, formatPrice } from "@/lib/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { AdminProducts } from "@/components/admin/AdminProducts";
import { AdminAthletes } from "@/components/admin/AdminAthletes";
import { AdminPartnerships } from "@/components/admin/AdminPartnerships";
import { toast } from "sonner";

const STATUS = [
  { value: "pending", label: "Pendente", color: "text-amber-400 bg-amber-400/10 border-amber-400/30" },
  { value: "processing", label: "Em processamento", color: "text-blue-400 bg-blue-400/10 border-blue-400/30" },
  { value: "shipped", label: "Enviada", color: "text-purple-400 bg-purple-400/10 border-purple-400/30" },
  { value: "delivered", label: "Entregue", color: "text-[#7EDAF2] bg-[#7EDAF2]/10 border-[#7EDAF2]/30" },
  { value: "cancelled", label: "Cancelada", color: "text-red-400 bg-red-400/10 border-red-400/30" },
];

const statusMeta = (s) => STATUS.find((x) => x.value === s) || STATUS[0];

const OrdersPanel = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);

  const load = useCallback(() => {
    setLoading(true);
    api
      .get("/orders")
      .then((res) => setOrders(res.data))
      .catch(() => toast.error("Erro ao carregar encomendas"))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const changeStatus = async (orderNumber, status) => {
    try {
      await api.patch(`/orders/${orderNumber}`, { status });
      setOrders((prev) => prev.map((o) => (o.order_number === orderNumber ? { ...o, status } : o)));
      toast.success("Estado atualizado");
    } catch {
      toast.error("Erro ao atualizar estado");
    }
  };

  const totalRevenue = orders.reduce((s, o) => s + o.total, 0);
  const pendingCount = orders.filter((o) => o.status === "pending").length;

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button
          data-testid="admin-refresh-btn"
          onClick={load}
          className="flex items-center gap-2 text-sm border border-white/15 hover:border-[#7EDAF2] px-4 py-2 rounded-full transition-colors text-white"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} /> Atualizar
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="rounded-xl border border-white/10 bg-[#121212] p-6" data-testid="stat-total-orders">
          <div className="flex items-center gap-2 text-zinc-400 text-sm"><Package className="w-4 h-4" /> Total de encomendas</div>
          <p className="font-display text-4xl text-white mt-2">{orders.length}</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-[#121212] p-6" data-testid="stat-revenue">
          <div className="flex items-center gap-2 text-zinc-400 text-sm"><TrendingUp className="w-4 h-4" /> Receita total</div>
          <p className="font-display text-4xl text-[#7EDAF2] mt-2">{formatPrice(totalRevenue)}</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-[#121212] p-6" data-testid="stat-pending">
          <div className="flex items-center gap-2 text-zinc-400 text-sm"><Clock className="w-4 h-4" /> Pendentes</div>
          <p className="font-display text-4xl text-amber-400 mt-2">{pendingCount}</p>
        </div>
      </div>

      {loading ? (
        <p className="text-zinc-500">A carregar...</p>
      ) : orders.length === 0 ? (
        <div className="rounded-xl border border-dashed border-white/15 p-16 text-center" data-testid="no-orders-msg">
          <Package className="w-12 h-12 text-zinc-700 mx-auto mb-3" />
          <p className="text-zinc-400">Ainda não há encomendas.</p>
        </div>
      ) : (
        <div className="rounded-xl border border-white/10 overflow-hidden" data-testid="orders-table">
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 bg-[#151515] text-xs uppercase tracking-wide text-zinc-500 font-bold">
            <div className="col-span-2">Nº</div>
            <div className="col-span-3">Cliente</div>
            <div className="col-span-2">Data</div>
            <div className="col-span-2">Total</div>
            <div className="col-span-3">Estado</div>
          </div>
          {orders.map((o) => {
            const meta = statusMeta(o.status);
            const isOpen = expanded === o.order_number;
            return (
              <div key={o.order_number} className="border-t border-white/5" data-testid={`order-row-${o.order_number}`}>
                <div
                  className="grid grid-cols-2 md:grid-cols-12 gap-4 px-6 py-4 items-center cursor-pointer hover:bg-white/[0.02]"
                  onClick={() => setExpanded(isOpen ? null : o.order_number)}
                >
                  <div className="md:col-span-2 font-bold text-[#7EDAF2]">{o.order_number}</div>
                  <div className="md:col-span-3 text-white text-sm truncate">
                    {o.shipping?.full_name}
                    <span className="block text-zinc-500 text-xs">{o.shipping?.email}</span>
                  </div>
                  <div className="md:col-span-2 text-zinc-400 text-sm">
                    {new Date(o.created_at).toLocaleDateString("pt-PT")}
                  </div>
                  <div className="md:col-span-2 text-white font-semibold">{formatPrice(o.total)}</div>
                  <div className="md:col-span-3" onClick={(e) => e.stopPropagation()}>
                    <Select value={o.status} onValueChange={(v) => changeStatus(o.order_number, v)}>
                      <SelectTrigger data-testid={`status-select-${o.order_number}`} className={`w-full border ${meta.color} font-semibold text-sm`}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#151515] border-white/10 text-white">
                        {STATUS.map((s) => (
                          <SelectItem key={s.value} value={s.value} className="text-white">{s.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 bg-[#0d0d0d] grid sm:grid-cols-2 gap-6 text-sm" data-testid={`order-detail-${o.order_number}`}>
                    <div>
                      <p className="text-zinc-500 uppercase text-xs font-bold mb-2">Artigos</p>
                      {o.items.map((it, i) => (
                        <div key={i} className="flex justify-between text-zinc-300 py-1">
                          <span>{it.quantity}× {it.name}{it.size ? ` (${it.size})` : ""}</span>
                          <span>{formatPrice(it.price * it.quantity)}</span>
                        </div>
                      ))}
                      <div className="flex justify-between text-white font-bold pt-2 mt-1 border-t border-white/10">
                        <span>Total</span><span>{formatPrice(o.total)}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-zinc-500 uppercase text-xs font-bold mb-2">Envio</p>
                      <p className="text-zinc-300">{o.shipping?.full_name}</p>
                      <p className="text-zinc-300">{o.shipping?.address}</p>
                      <p className="text-zinc-300">{o.shipping?.postal_code} {o.shipping?.city}, {o.shipping?.country}</p>
                      <p className="text-zinc-300">{o.shipping?.phone}</p>
                      {o.notes && <p className="text-zinc-500 mt-2 italic">Nota: {o.notes}</p>}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default function AdminOrders() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <div className="border-b border-white/10 backdrop-blur-xl bg-black/60 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center gap-4">
          <Link to="/" className="text-zinc-400 hover:text-white transition-colors" data-testid="admin-back-link">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <span className="font-display text-2xl text-white">
            XOK'S <span className="text-[#7EDAF2]">ADMIN</span>
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-10">
        <h1 className="font-display text-4xl uppercase text-white mb-8">Painel de Gestão</h1>

        <Tabs defaultValue="orders">
          <TabsList className="bg-[#121212] border border-white/10 mb-8">
            <TabsTrigger value="orders" data-testid="tab-orders" className="data-[state=active]:bg-[#7EDAF2] data-[state=active]:text-black">Encomendas</TabsTrigger>
            <TabsTrigger value="products" data-testid="tab-products" className="data-[state=active]:bg-[#7EDAF2] data-[state=active]:text-black">Produtos</TabsTrigger>
            <TabsTrigger value="athletes" data-testid="tab-athletes" className="data-[state=active]:bg-[#7EDAF2] data-[state=active]:text-black">Atletas</TabsTrigger>
            <TabsTrigger value="partnerships" data-testid="tab-partnerships" className="data-[state=active]:bg-[#7EDAF2] data-[state=active]:text-black">Parcerias</TabsTrigger>
          </TabsList>
          <TabsContent value="orders"><OrdersPanel /></TabsContent>
          <TabsContent value="products"><AdminProducts /></TabsContent>
          <TabsContent value="athletes"><AdminAthletes /></TabsContent>
          <TabsContent value="partnerships"><AdminPartnerships /></TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
