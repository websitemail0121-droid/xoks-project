import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { SHIPPING_COST, FREE_SHIPPING_THRESHOLD } from "@/lib/api";

const CartContext = createContext(null);

const STORAGE_KEY = "xoks_cart";

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = useCallback((product, size, quantity = 1) => {
    setItems((prev) => {
      const key = `${product.id}-${size || "std"}`;
      const existing = prev.find((i) => i.key === key);
      if (existing) {
        return prev.map((i) =>
          i.key === key ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [
        ...prev,
        {
          key,
          product_id: product.id,
          name: product.name,
          size: size || null,
          price: product.price,
          quantity,
          image: product.image,
        },
      ];
    });
    setIsOpen(true);
  }, []);

  const updateQuantity = useCallback((key, quantity) => {
    setItems((prev) =>
      quantity <= 0
        ? prev.filter((i) => i.key !== key)
        : prev.map((i) => (i.key === key ? { ...i, quantity } : i))
    );
  }, []);

  const removeItem = useCallback((key) => {
    setItems((prev) => prev.filter((i) => i.key !== key));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const count = items.reduce((sum, i) => sum + i.quantity, 0);
  const shippingCost = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total = subtotal + shippingCost;

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        setIsOpen,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        subtotal,
        shippingCost,
        total,
        count,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
