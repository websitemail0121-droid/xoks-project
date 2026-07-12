import React from "react";
import { useNavigate } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { useCart } from "@/context/CartContext";
import { formatPrice, FREE_SHIPPING_THRESHOLD } from "@/lib/api";

export const CartSheet = () => {
  const {
    items,
    isOpen,
    setIsOpen,
    updateQuantity,
    removeItem,
    subtotal,
    shippingCost,
    total,
  } = useCart();
  const navigate = useNavigate();

  const goToCheckout = () => {
    setIsOpen(false);
    navigate("/checkout");
  };

  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent
        data-testid="cart-sheet"
        className="w-full sm:max-w-md bg-[#0d0d0d] border-l border-white/10 text-white flex flex-col p-0"
      >
        <SheetHeader className="p-6 border-b border-white/10">
          <SheetTitle className="font-display text-3xl uppercase text-white text-left tracking-wide">
            O teu carrinho
          </SheetTitle>
          <SheetDescription className="sr-only">
            Reveja e ajuste os artigos no seu carrinho de compras
          </SheetDescription>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-8 gap-4">
            <ShoppingBag className="w-14 h-14 text-zinc-700" />
            <p className="text-zinc-400" data-testid="cart-empty-msg">
              O teu carrinho está vazio.
            </p>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#7EDAF2] font-semibold hover:underline"
            >
              Continuar a comprar
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-6 space-y-5">
              {remaining > 0 && (
                <div className="text-sm text-zinc-400 bg-[#151515] border border-white/10 rounded-lg p-3">
                  Faltam <span className="text-[#7EDAF2] font-bold">{formatPrice(remaining)}</span> para
                  envio grátis.
                </div>
              )}
              {items.map((item) => (
                <div
                  key={item.key}
                  data-testid={`cart-item-${item.product_id}`}
                  className="flex gap-4"
                >
                  <div className="w-20 h-20 rounded-xl bg-[#1a1a1a] border border-white/10 shrink-0 overflow-hidden flex items-center justify-center">
                    <img src={item.image} alt={item.name} className="w-full h-full object-contain p-1" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm leading-tight">{item.name}</p>
                    {item.size && <p className="text-xs text-zinc-500 mt-0.5">Tamanho {item.size}</p>}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-white/15 rounded-full">
                        <button
                          data-testid={`cart-dec-${item.product_id}`}
                          onClick={() => updateQuantity(item.key, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center hover:text-[#7EDAF2]"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                        <button
                          data-testid={`cart-inc-${item.product_id}`}
                          onClick={() => updateQuantity(item.key, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center hover:text-[#7EDAF2]"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="font-bold text-sm">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  </div>
                  <button
                    data-testid={`cart-remove-${item.product_id}`}
                    onClick={() => removeItem(item.key)}
                    className="text-zinc-600 hover:text-red-400 transition-colors self-start"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="border-t border-white/10 p-6 space-y-3">
              <div className="flex justify-between text-sm text-zinc-400">
                <span>Subtotal</span>
                <span data-testid="cart-subtotal">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm text-zinc-400">
                <span>Envio</span>
                <span>{shippingCost === 0 ? "Grátis" : formatPrice(shippingCost)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-2 border-t border-white/10">
                <span>Total</span>
                <span data-testid="cart-total" className="text-[#7EDAF2]">{formatPrice(total)}</span>
              </div>
              <button
                data-testid="checkout-btn"
                onClick={goToCheckout}
                className="cta-glow w-full inline-flex items-center justify-center gap-2 bg-[#7EDAF2] hover:bg-[#A5E8F7] text-black font-bold px-6 py-4 rounded-full uppercase tracking-wide mt-2"
              >
                Finalizar Compra
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};
