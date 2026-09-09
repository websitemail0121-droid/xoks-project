import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";

const links = [
  { to: "/produtos", label: "Produtos" },
  { to: "/custom-studio", label: "Custom Studio" },
  { to: "/atletas", label: "Atletas" },
  { to: "/sobre", label: "Sobre Nós" },
];

export const Navigation = () => {
  const { count, setIsOpen } = useCart();
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const testId = (label) => `nav-${label.toLowerCase().replace(/\s|ó/g, (m) => (m === "ó" ? "o" : ""))}`;

  return (
    <header
      data-testid="main-nav"
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/60 border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 sm:h-20 flex items-center justify-between">
        <Link to="/" data-testid="nav-logo" className="flex items-center group" onClick={() => setMobileOpen(false)}>
          <img src="/xoks-emblem.png" alt="XOK'S" className="h-10 sm:h-14 w-auto" />
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold">
          {links.map((l) => {
            const active = pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                data-testid={testId(l.label)}
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

        <div className="flex items-center gap-2">
          <button
            data-testid="cart-toggle-btn"
            onClick={() => setIsOpen(true)}
            className="relative flex items-center gap-2 rounded-full border border-white/15 hover:border-[#7EDAF2] px-3 sm:px-4 py-2 transition-colors"
          >
            <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
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
          <button
            data-testid="mobile-menu-toggle"
            onClick={() => setMobileOpen((s) => !s)}
            className="md:hidden w-10 h-10 rounded-full border border-white/15 hover:border-[#7EDAF2] flex items-center justify-center transition-colors"
            aria-label="Menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/10 bg-black/95 backdrop-blur-xl" data-testid="mobile-menu">
          <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            {links.map((l) => {
              const active = pathname === l.to;
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setMobileOpen(false)}
                  data-testid={`mobile-${testId(l.label)}`}
                  className={`px-3 py-3 rounded-lg font-semibold transition-colors ${active ? "text-[#7EDAF2] bg-[#7EDAF2]/10" : "text-zinc-200 hover:bg-white/5"}`}
                >
                  {l.label}
                </Link>
              );
            })}
            <Link
              to="/admin"
              onClick={() => setMobileOpen(false)}
              className="px-3 py-3 rounded-lg text-zinc-500 font-semibold text-sm"
            >
              Admin
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};
