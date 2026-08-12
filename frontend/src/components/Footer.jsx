import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/10 py-14">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-3">
            <img src="/xoks-logo.png" alt="XOK'S" className="h-16 w-auto" />
            <span className="font-display text-2xl text-white leading-none">
              XOK'S
            </span>
          </div>
          <p className="text-zinc-500 mt-3 max-w-xs">
            Caneleiras de alta performance para futebolistas que não aceitam limites.
          </p>
        </div>
        <div>
          <h4 className="font-bold text-white uppercase text-sm tracking-wide mb-4">Navegação</h4>
          <ul className="space-y-2 text-zinc-400 text-sm">
            <li><Link to="/produtos" className="hover:text-[#7EDAF2] transition-colors">Produtos</Link></li>
            <li><Link to="/atletas" className="hover:text-[#7EDAF2] transition-colors">Atletas</Link></li>
            <li><Link to="/sobre" className="hover:text-[#7EDAF2] transition-colors">Sobre Nós</Link></li>
            <li><Link to="/parcerias" className="hover:text-[#7EDAF2] transition-colors">Parcerias</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-white uppercase text-sm tracking-wide mb-4">Legal</h4>
          <ul className="space-y-2 text-zinc-400 text-sm" data-testid="footer-legal-links">
            <li><Link to="/termos-e-condicoes" className="hover:text-[#7EDAF2] transition-colors">Termos e Condições</Link></li>
            <li><Link to="/politica-de-privacidade" className="hover:text-[#7EDAF2] transition-colors">Política de Privacidade</Link></li>
            <li><Link to="/politica-de-cookies" className="hover:text-[#7EDAF2] transition-colors">Política de Cookies</Link></li>
            <li><Link to="/politica-de-envios" className="hover:text-[#7EDAF2] transition-colors">Política de Envios</Link></li>
            <li><Link to="/politica-de-devolucoes" className="hover:text-[#7EDAF2] transition-colors">Devoluções e Reembolsos</Link></li>
            <li><Link to="/aviso-legal" className="hover:text-[#7EDAF2] transition-colors">Aviso Legal</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-white uppercase text-sm tracking-wide mb-4">Suporte</h4>
          <ul className="space-y-2 text-zinc-400 text-sm">
            <li>Fabrico por encomenda</li>
            <li>Entrega em até 10 dias úteis</li>
            <li>Envios via CTT e DHL</li>
            <li><a href="mailto:xokscarbon@gmail.com" className="hover:text-[#7EDAF2] transition-colors">xokscarbon@gmail.com</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 mt-10 pt-6 border-t border-white/5 text-xs text-zinc-600">
        © {new Date().getFullYear()} XOK'S · Patrício Manuel Correia Gomes · NIF 223104990. Todos os direitos reservados.
      </div>
    </footer>
  );
};
