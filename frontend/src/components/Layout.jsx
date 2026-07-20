import React from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { CartSheet } from "@/components/CartSheet";

export const Layout = ({ children }) => {
  return (
    <div className="bg-[#0A0A0A] min-h-screen flex flex-col">
      <Navigation />
      <CartSheet />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};
