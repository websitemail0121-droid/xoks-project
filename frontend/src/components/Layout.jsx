import React from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { CartSheet } from "@/components/CartSheet";
import { CookieConsent } from "@/components/CookieConsent";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export const Layout = ({ children }) => {
  return (
    <div className="bg-[#0A0A0A] min-h-screen flex flex-col">
      <Navigation />
      <CartSheet />
      <main className="flex-1">{children}</main>
      <Footer />
      <CookieConsent />
      <WhatsAppButton />
    </div>
  );
};
