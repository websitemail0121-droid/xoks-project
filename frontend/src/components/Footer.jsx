import React from "react";

export const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/10 py-14">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <span className="font-display text-3xl text-white">
            PATRICKGOMES<span className="text-[#7EDAF2]">FR</span> XOK'S
          </span>
          <p className="text-zinc-500 mt-3 max-w-xs">
            Caneleiras de alta performance para futebolistas que não aceitam limites.
          </p>
        </div>
        <div>
          <h4 className="font-bold text-white uppercase text-sm tracking-wide mb-4">Loja</h4>
          <ul className="space-y-2 text-zinc-400 text-sm">
            <li><a href="#produto" className="hover:text-[#7EDAF2] transition-colors">Caneleiras XOK'S</a></li>
            <li><a href="#vantagens" className="hover:text-[#7EDAF2] transition-colors">Vantagens</a></li>
            <li><a href="#atletas" className="hover:text-[#7EDAF2] transition-colors">Atletas</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-white uppercase text-sm tracking-wide mb-4">Suporte</h4>
          <ul className="space-y-2 text-zinc-400 text-sm">
            <li>Envios em 2-4 dias úteis</li>
            <li>Devolução gratuita 30 dias</li>
            <li>geral@patrickgomesfr-xoks.pt</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 mt-10 pt-6 border-t border-white/5 text-xs text-zinc-600">
        © {new Date().getFullYear()} PatrickGomesFR XOK'S. Todos os direitos reservados.
      </div>
    </footer>
  );
};
