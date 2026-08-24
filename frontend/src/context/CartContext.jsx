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

  const addItem = useCallback((product, size, quantity = 1, extras = {}) => {
    setItems((prev) => {
      const { custom_data, price: overridePrice, image: overrideImage, name: overrideName } = extras || {};
      // Custom items get a unique key (never merged with existing lines)
      const uniqueKey = custom_data ? `${product.id}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}` : null;
      const key = uniqueKey || `${product.id}-${size || "std"}`;
      const existing = !custom_data && prev.find((i) => i.key === key);
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
          name: overrideName || product.name,
          size: size || null,
          price: overridePrice !== undefined ? overridePrice : product.price,
          quantity,
          image: overrideImage || product.image,
          custom_data: custom_data || null,
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
