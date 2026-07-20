import React from "react";

export const AthleteCarousel = ({ athletes }) => {
  if (!athletes || athletes.length === 0) return null;
  const loop = [...athletes, ...athletes];

  return (
    <section id="atletas" className="relative py-24 sm:py-32 bg-[#0A0A0A] overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 mb-12">
        <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#7EDAF2]">Prova Social</span>
        <h2 className="font-display text-[clamp(2.5rem,6vw,4rem)] leading-none uppercase text-white mt-3">
          Atletas que confiam nas XOK'S
        </h2>
        <p className="text-zinc-400 mt-4 max-w-xl">
          De campos distritais a estádios de topo — os que levam o jogo a sério equipam-se com XOK'S.
        </p>
      </div>

      <div className="relative" data-testid="athlete-carousel">
        {/* edge fades */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-[#0A0A0A] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-[#0A0A0A] to-transparent" />

        <div className="marquee-track gap-5">
          {loop.map((a, i) => (
            <figure
              key={`${a.id}-${i}`}
              data-testid={`athlete-slide-${i}`}
              className="relative w-72 sm:w-80 aspect-[3/4] shrink-0 rounded-2xl overflow-hidden border border-white/10 group"
            >
              <img
                src={a.image}
                alt={a.name || "Atleta XOK'S"}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              {(a.name || a.club) && (
                <figcaption className="absolute bottom-0 left-0 right-0 p-5">
                  {a.name && <p className="font-display text-2xl uppercase text-white leading-none">{a.name}</p>}
                  {a.club && <p className="text-sm text-[#7EDAF2] font-semibold mt-1">{a.club}</p>}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};
