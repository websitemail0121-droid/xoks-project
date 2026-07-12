import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

export const Navigation = () => {
  const { count, setIsOpen } = useCart();
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <header
      data-testid="main-nav"
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/60 border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <Link to="/" data-testid="nav-logo" className="flex items-center gap-2 group">
          <span className="font-display text-2xl sm:text-3xl tracking-wide text-white leading-none">
            PATRICKGOMES<span className="text-[#7EDAF2]">FR</span>
          </span>
          <span className="hidden sm:inline text-[10px] font-bold tracking-[0.3em] text-zinc-500 border border-white/10 px-1.5 py-0.5 rounded">
            XOK'S
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-zinc-300">
          {isHome ? (
            <>
              <a href="#produto" className="hover:text-[#7EDAF2] transition-colors" data-testid="nav-produto">
                Produto
              </a>
              <a href="#vantagens" className="hover:text-[#7EDAF2] transition-colors" data-testid="nav-vantagens">
                Vantagens
              </a>
              <a href="#atletas" className="hover:text-[#7EDAF2] transition-colors" data-testid="nav-atletas">
                Atletas
              </a>
            </>
          ) : (
            <Link to="/" className="hover:text-[#7EDAF2] transition-colors">
              Início
            </Link>
          )}
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
