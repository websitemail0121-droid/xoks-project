import React, { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { ValueProposition } from "@/components/ValueProposition";
import { ProductGrid } from "@/components/ProductGrid";
import { AthleteCarousel } from "@/components/AthleteCarousel";
import { SocialProof } from "@/components/SocialProof";
import { Footer } from "@/components/Footer";
import { CartSheet } from "@/components/CartSheet";
import { CustomStudioTeaser } from "@/components/CustomStudioTeaser";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [athletes, setAthletes] = useState([]);

  useEffect(() => {
    api.get("/products").then((res) => setProducts(res.data)).catch(() => {});
    api.get("/athletes").then((res) => setAthletes(res.data)).catch(() => {});
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
        <ProductGrid products={products} />
        <CustomStudioTeaser />
        <AthleteCarousel athletes={athletes} />
        <SocialProof />
      </main>
      <Footer />
    </div>
  );
}
