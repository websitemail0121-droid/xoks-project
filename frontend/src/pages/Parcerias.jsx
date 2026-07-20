import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Building2, Trophy, Store, Handshake, CheckCircle2 } from "lucide-react";
import { api } from "@/lib/api";
import { Layout } from "@/components/Layout";
import { PageHeader } from "@/components/PageHeader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const HANDSHAKE = "https://images.pexels.com/photos/4963359/pexels-photo-4963359.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";

const types = [
  { icon: Trophy, title: "Clubes & Equipas", desc: "Equipa todo o plantel com condições exclusivas e personalização." },
  { icon: Store, title: "Revendedores", desc: "Leva as XOK'S para a tua loja com margens competitivas." },
  { icon: Building2, title: "Marcas & Patrocínios", desc: "Co-branding e campanhas conjuntas com a XOK'S." },
  { icon: Handshake, title: "Embaixadores", desc: "Atletas e criadores que vivem o jogo e representam a marca." },
];

const benefits = [
  "Preços exclusivos por volume",
  "Personalização de produto e branding",
  "Apoio de marketing dedicado",
  "Prioridade em novos lançamentos",
];

const inputCls =
  "bg-transparent border border-white/15 rounded-lg px-4 py-3 text-white placeholder:text-zinc-600 outline-none focus:border-[#7EDAF2] focus:ring-2 focus:ring-[#7EDAF2]/30 transition-colors w-full";

export default function Parcerias() {
  const [form, setForm] = useState({ name: "", organization: "", email: "", phone: "", type: "club", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => window.scrollTo(0, 0), []);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      toast.error("Nome e email são obrigatórios");
      return;
    }
    setSubmitting(true);
    try {
      await api.post("/partnerships", form);
      setDone(true);
      toast.success("Pedido de parceria enviado!");
    } catch {
      toast.error("Erro ao enviar. Tenta novamente.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout>
      <PageHeader
        eyebrow="Cresce connosco"
        title="Parcerias XOK'S"
        accentWord="XOK'S"
        subtitle="Clubes, revendedores, marcas e embaixadores — vamos levar a proteção de elite mais longe, juntos."
      />

      <div data-testid="parcerias-page">
        {/* Types */}
        <section className="py-20 sm:py-28 bg-[#0A0A0A]">
          <div className="max-w-7xl mx-auto px-5 sm:px-8">
            <h2 className="font-display text-4xl uppercase text-white mb-12">Tipos de parceria</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {types.map((t, i) => {
                const Icon = t.icon;
                return (
                  <motion.div
                    key={t.title}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: i * 0.1 }}
                    className="rounded-2xl border border-white/10 bg-[#121212] p-6 hover:border-[#7EDAF2]/40 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#7EDAF2] flex items-center justify-center mb-5">
                      <Icon className="w-6 h-6 text-black" />
                    </div>
                    <h3 className="font-display text-2xl uppercase text-white leading-none">{t.title}</h3>
                    <p className="text-sm text-zinc-400 mt-3 leading-relaxed">{t.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Benefits + Form */}
        <section className="py-20 sm:py-28 bg-[#0d0d0d] border-y border-white/5">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div>
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3] border border-white/10 mb-8">
                <img src={HANDSHAKE} alt="Parceria XOK'S" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              </div>
              <h3 className="font-display text-3xl uppercase text-white mb-5">Vantagens para parceiros</h3>
              <ul className="space-y-3">
                {benefits.map((b) => (
                  <li key={b} className="flex items-center gap-3 text-zinc-300">
                    <CheckCircle2 className="w-5 h-5 text-[#7EDAF2] shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            {/* Form */}
            <div className="rounded-2xl border border-white/10 bg-[#121212] p-6 sm:p-8">
              {done ? (
                <div className="text-center py-10" data-testid="parceria-success">
                  <CheckCircle2 className="w-16 h-16 text-[#7EDAF2] mx-auto mb-5" />
                  <h3 className="font-display text-3xl uppercase text-white">Pedido enviado!</h3>
                  <p className="text-zinc-400 mt-3">
                    Obrigado pelo teu interesse. A equipa XOK'S entrará em contacto brevemente.
                  </p>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-4" data-testid="parceria-form">
                  <h3 className="font-display text-3xl uppercase text-white">Candidata-te a parceiro</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <input className={inputCls} placeholder="Nome *" data-testid="pt-name" value={form.name} onChange={(e) => set("name", e.target.value)} />
                    <input className={inputCls} placeholder="Organização / Clube" data-testid="pt-org" value={form.organization} onChange={(e) => set("organization", e.target.value)} />
                    <input className={inputCls} type="email" placeholder="Email *" data-testid="pt-email" value={form.email} onChange={(e) => set("email", e.target.value)} />
                    <input className={inputCls} placeholder="Telemóvel" data-testid="pt-phone" value={form.phone} onChange={(e) => set("phone", e.target.value)} />
                  </div>
                  <div>
                    <Select value={form.type} onValueChange={(v) => set("type", v)}>
                      <SelectTrigger data-testid="pt-type" className="w-full border border-white/15 text-white bg-transparent">
                        <SelectValue placeholder="Tipo de parceria" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#151515] border-white/10 text-white">
                        <SelectItem value="club" className="text-white">Clube / Equipa</SelectItem>
                        <SelectItem value="reseller" className="text-white">Revendedor</SelectItem>
                        <SelectItem value="brand" className="text-white">Marca / Patrocínio</SelectItem>
                        <SelectItem value="ambassador" className="text-white">Embaixador / Atleta</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <textarea
                    className={inputCls}
                    rows={4}
                    placeholder="Conta-nos sobre ti e o teu objetivo..."
                    data-testid="pt-message"
                    value={form.message}
                    onChange={(e) => set("message", e.target.value)}
                  />
                  <button
                    type="submit"
                    data-testid="pt-submit"
                    disabled={submitting}
                    className="cta-glow w-full bg-[#7EDAF2] hover:bg-[#A5E8F7] disabled:opacity-60 text-black font-bold px-6 py-4 rounded-full uppercase tracking-widest text-sm"
                  >
                    {submitting ? "A enviar..." : "Enviar pedido"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
