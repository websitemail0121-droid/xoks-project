import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { api } from "@/lib/api";
import { Navigation } from "@/components/Navigation";
import { ProductShowcase } from "@/components/ProductShowcase";
import { Reviews } from "@/components/Reviews";
import { Footer } from "@/components/Footer";
import { CartSheet } from "@/components/CartSheet";

export default function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setProduct(null);
    setNotFound(false);
    window.scrollTo(0, 0);
    api
      .get(`/products/${productId}`)
      .then((res) => setProduct(res.data))
      .catch(() => setNotFound(true));
  }, [productId]);

  return (
    <div className="bg-[#0A0A0A] min-h-screen">
      <Navigation />
      <CartSheet />
      <div className="pt-24 max-w-7xl mx-auto px-5 sm:px-8">
        <nav className="flex items-center gap-2 text-sm text-zinc-500" data-testid="breadcrumb">
          <Link to="/" className="hover:text-white">Início</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/#produto" className="hover:text-white">Caneleiras</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-zinc-300">{product?.name || "..."}</span>
        </nav>
      </div>

      {notFound ? (
        <div className="min-h-[50vh] flex flex-col items-center justify-center gap-4 text-center px-6">
          <h1 className="font-display text-4xl uppercase text-white">Produto não encontrado</h1>
          <Link to="/" className="text-[#7EDAF2] font-semibold hover:underline">Voltar à loja</Link>
        </div>
      ) : (
        <ProductShowcase product={product} />
      )}
      {product && !notFound && <Reviews />}
      <Footer />
    </div>
  );
}
