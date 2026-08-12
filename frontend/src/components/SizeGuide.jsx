import React from "react";
import { Ruler, ArrowUpNarrowWide, CircleDot, Target } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

const rows = [
  { size: "XS", height: "11,5 cm", calf: "28 – 32 cm", use: "Crianças / pernas muito finas" },
  { size: "S", height: "13 cm", calf: "32 – 35 cm", use: "Jovens / adultos magros" },
  { size: "M", height: "15 cm", calf: "35 – 38 cm", use: "Adulto (mais comum)" },
  { size: "L", height: "17 cm", calf: "38 – 42 cm", use: "Adultos com pernas fortes" },
  { size: "XL", height: "19 cm", calf: "42 – 46 cm", use: "Pernas muito musculadas" },
];

const steps = [
  "Fica de pé com a perna relaxada.",
  "Mede a parte mais larga do gémeo com uma fita métrica.",
  "Consulta a tabela e escolhe o tamanho que melhor se adapta a ti.",
];

export const SizeGuide = ({ trigger, showXS = true, productName = "XOK'S" }) => {
  const data = showXS ? rows : rows.filter((r) => r.size !== "XS");
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        data-testid="size-guide-dialog"
        className="bg-[#0A0A0A] border-white/10 text-white max-w-2xl"
      >
        <DialogHeader>
          <DialogTitle className="font-display text-3xl uppercase tracking-wide">
            Tabela de Perímetro <span className="text-[#7EDAF2]">de Pernas</span>
          </DialogTitle>
          <DialogDescription className="text-zinc-400">
            Encontra o tamanho ideal das tuas caneleiras {productName} com base na altura e no perímetro do gémeo.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-2 overflow-hidden rounded-xl border border-white/10">
          {/* header */}
          <div className="grid grid-cols-[64px_1fr_1.2fr_1.3fr] bg-[#151515] text-[10px] sm:text-xs font-bold uppercase tracking-wide text-zinc-400">
            <div className="p-3 flex items-center gap-1.5"><Ruler className="w-3.5 h-3.5 text-[#7EDAF2]" /> Tam.</div>
            <div className="p-3 flex items-center gap-1.5"><ArrowUpNarrowWide className="w-3.5 h-3.5 text-[#7EDAF2]" /> Altura</div>
            <div className="p-3 flex items-center gap-1.5"><CircleDot className="w-3.5 h-3.5 text-[#7EDAF2]" /> Perímetro (gémeo)</div>
            <div className="p-3 flex items-center gap-1.5"><Target className="w-3.5 h-3.5 text-[#7EDAF2]" /> Recomendado</div>
          </div>
          {data.map((r, i) => (
            <div
              key={r.size}
              data-testid={`size-row-${r.size}`}
              className={`grid grid-cols-[64px_1fr_1.2fr_1.3fr] items-center border-t border-white/5 ${i % 2 ? "bg-white/[0.015]" : ""}`}
            >
              <div className="p-3 font-display text-2xl text-white">{r.size}</div>
              <div className="p-3 text-sm text-white font-semibold">{r.height}</div>
              <div className="p-3 text-sm text-[#7EDAF2] font-semibold">{r.calf}</div>
              <div className="p-3 text-xs text-zinc-400">{r.use}</div>
            </div>
          ))}
        </div>

        {/* how to measure */}
        <div className="mt-1">
          <p className="text-xs font-bold uppercase tracking-wide text-zinc-400 mb-2">Como medir</p>
          <ol className="space-y-1.5">
            {steps.map((s, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-zinc-300">
                <span className="shrink-0 w-5 h-5 rounded-full bg-[#7EDAF2] text-black text-xs font-bold flex items-center justify-center">{i + 1}</span>
                {s}
              </li>
            ))}
          </ol>
        </div>
      </DialogContent>
    </Dialog>
  );
};
