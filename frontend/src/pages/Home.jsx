import React, { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useCart } from "@/context/CartContext";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { ValueProposition } from "@/components/ValueProposition";
import { ProductShowcase } from "@/components/ProductShowcase";
import { SocialProof } from "@/components/SocialProof";
import { Footer } from "@/components/Footer";
import { CartSheet } from "@/components/CartSheet";

export default function Home() {
  const [product, setProduct] = useState(null);
  const { addItem, setIsOpen } = useCart();

  useEffect(() => {
    api
      .get("/products")
      .then((res) => setProduct(res.data[0]))
      .catch((e) => console.error("Erro ao carregar produto", e));
  }, []);

  const handleHeroCta = () => {
    const el = document.getElementById("produto");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-[#0A0A0A] min-h-screen">
      <Navigation />
      <CartSheet />
      <main>
        <Hero onCta={handleHeroCta} />
        <ValueProposition />
        <ProductShowcase product={product} />
        <SocialProof />
      </main>
      <Footer />
    </div>
  );
}
