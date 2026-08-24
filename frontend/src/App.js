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
import Termos from "@/pages/legal/Termos";
import Privacidade from "@/pages/legal/Privacidade";
import Cookies from "@/pages/legal/Cookies";
import Envios from "@/pages/legal/Envios";
import Devolucoes from "@/pages/legal/Devolucoes";
import AvisoLegal from "@/pages/legal/AvisoLegal";
import PaymentSuccess from "@/pages/PaymentSuccess";
import PaymentCancel from "@/pages/PaymentCancel";

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
            <Route path="/termos-e-condicoes" element={<Termos />} />
            <Route path="/politica-de-privacidade" element={<Privacidade />} />
            <Route path="/politica-de-cookies" element={<Cookies />} />
            <Route path="/politica-de-envios" element={<Envios />} />
            <Route path="/politica-de-devolucoes" element={<Devolucoes />} />
            <Route path="/aviso-legal" element={<AvisoLegal />} />
            <Route path="/payment/success" element={<PaymentSuccess />} />
            <Route path="/payment/cancel" element={<PaymentCancel />} />
          </Routes>
        </BrowserRouter>
        <Toaster position="top-right" theme="dark" richColors />
      </CartProvider>
    </div>
  );
}

export default App;
