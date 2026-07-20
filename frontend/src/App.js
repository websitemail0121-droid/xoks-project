import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import { Toaster } from "@/components/ui/sonner";
import Home from "@/pages/Home";
import Produtos from "@/pages/Produtos";
import ProductDetail from "@/pages/ProductDetail";
import Atletas from "@/pages/Atletas";
import SobreNos from "@/pages/SobreNos";
import Parcerias from "@/pages/Parcerias";
import Checkout from "@/pages/Checkout";
import OrderSuccess from "@/pages/OrderSuccess";
import AdminOrders from "@/pages/AdminOrders";

function App() {
  return (
    <div className="App">
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/produtos" element={<Produtos />} />
            <Route path="/produto/:productId" element={<ProductDetail />} />
            <Route path="/atletas" element={<Atletas />} />
            <Route path="/sobre" element={<SobreNos />} />
            <Route path="/parcerias" element={<Parcerias />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/sucesso/:orderNumber" element={<OrderSuccess />} />
            <Route path="/admin" element={<AdminOrders />} />
          </Routes>
        </BrowserRouter>
        <Toaster position="top-right" theme="dark" richColors />
      </CartProvider>
    </div>
  );
}

export default App;
