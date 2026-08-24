import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

const links = [
  { to: "/produtos", label: "Produtos" },
  { to: "/custom-studio", label: "Custom Studio" },
  { to: "/atletas", label: "Atletas" },
  { to: "/sobre", label: "Sobre Nós" },
  { to: "/parcerias", label: "Parcerias" },
];

export const Navigation = () => {
  const { count, setIsOpen } = useCart();
  const { pathname } = useLocation();

  return (
    <header
      data-testid="main-nav"
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/60 border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-20 flex items-center justify-between">
        <Link to="/" data-testid="nav-logo" className="flex items-center group">
          <img src="/xoks-emblem.png" alt="XOK'S" className="h-14 w-auto" />
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold">
          {links.map((l) => {
            const active = pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                data-testid={`nav-${l.label.toLowerCase().replace(/\s|ó/g, (m) => (m === "ó" ? "o" : ""))}`}
                className={`transition-colors ${active ? "text-[#7EDAF2]" : "text-zinc-300 hover:text-[#7EDAF2]"}`}
              >
                {l.label}
              </Link>
            );
          })}
          <Link to="/admin" className="text-zinc-600 hover:text-zinc-300 transition-colors" data-testid="nav-admin">
            Admin
          </Link>
        </nav>

        <button
          data-testid="cart-toggle-btn"
          onClick={() => setIsOpen(true)}
          className="relative flex items-center gap-2 rounded-full border border-white/15 hover:border-[#7EDAF2] px-4 py-2 transition-colors"
        >
          <ShoppingBag className="w-5 h-5" />
          <span className="hidden sm:inline text-sm font-semibold">Carrinho</span>
          {count > 0 && (
            <span
              data-testid="cart-count-badge"
              className="absolute -top-2 -right-2 bg-[#7EDAF2] text-black text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center"
            >
              {count}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};
