import React, { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Layout } from "@/components/Layout";
import { PageHeader } from "@/components/PageHeader";
import { ProductGrid } from "@/components/ProductGrid";

export default function Produtos() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    api.get("/products").then((res) => setProducts(res.data)).catch(() => {});
  }, []);

  return (
    <Layout>
      <PageHeader
        eyebrow="A Coleção"
        title="Caneleiras XOK'S"
        accentWord="XOK'S"
        subtitle="Toda a gama de caneleiras em fibra de carbono de alta performance. Escolhe a proteção certa para o teu nível de jogo."
      />
      <div data-testid="produtos-page">
        <ProductGrid products={products} hideHeader />
      </div>
    </Layout>
  );
}
