import React from "react";
import { Ruler, ArrowUpNarrowWide, CircleDot, Target } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const rows = [
  { size: "S", height: "13 cm", calf: "32 – 35 cm", use: "Jovens / adultos magros" },
  { size: "M", height: "15 cm", calf: "35 – 38 cm", use: "Adulto (mais comum)" },
  { size: "L", height: "17 cm", calf: "38 – 42 cm", use: "Adultos com pernas fortes" },
  { size: "XL", height: "19 cm", calf: "42 – 46 cm", use: "Pernas muito musculadas" },
];

export const SizeGuide = ({ trigger }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        data-testid="size-guide-dialog"
        className="bg-[#0A0A0A] border-white/10 text-white max-w-2xl"
      >
        <DialogHeader>
          <DialogTitle className="font-display text-3xl uppercase tracking-wide">
            Guia de Tamanhos <span className="text-[#7EDAF2]">XOK'S Game</span>
          </DialogTitle>
        </DialogHeader>

        <div className="mt-2 overflow-hidden rounded-xl border border-white/10">
          {/* header */}
          <div className="grid grid-cols-[64px_1fr_1.2fr_1.3fr] bg-[#151515] text-[10px] sm:text-xs font-bold uppercase tracking-wide text-zinc-400">
            <div className="p-3 flex items-center gap-1.5"><Ruler className="w-3.5 h-3.5 text-[#7EDAF2]" /> Tam.</div>
            <div className="p-3 flex items-center gap-1.5"><ArrowUpNarrowWide className="w-3.5 h-3.5 text-[#7EDAF2]" /> Altura</div>
            <div className="p-3 flex items-center gap-1.5"><CircleDot className="w-3.5 h-3.5 text-[#7EDAF2]" /> Perímetro (gémeo)</div>
            <div className="p-3 flex items-center gap-1.5"><Target className="w-3.5 h-3.5 text-[#7EDAF2]" /> Recomendado</div>
          </div>
          {rows.map((r, i) => (
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
        <p className="text-xs text-zinc-500 mt-1">
          Medições aproximadas. Em caso de dúvida entre dois tamanhos, escolhe o maior.
        </p>
      </DialogContent>
    </Dialog>
  );
};
