import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import { Route, Routes } from "react-router-dom";
import Product_page from "./pages/Product_page";
import Cart from "./pages/Cart";
import Register from "./pages/Register";
import ScrollToTop from "./components/Scrolltotop";
import Account_me from "./pages/Account_me";
import Account_order from "./pages/Account_orders";
import NotFound from "./pages/NotFound";
import { Toaster } from "sonner";
import Checkout from "./pages/Checkout";
import Products from "./pages/Produtcs_all";
import OrderShow from "./components/Account_order_show";
import AdminPanel from "./pages/AdminPanel";
import AdminCatalogPage from "./pages/AdminCatalogPage";
import AdminOrdersPage from "./pages/AdminOrdersPage";
import Privacy from "./pages/Privacy";

function App() {
  return (
    <div>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Lexend+Exa:wght@100..900&display=swap"
        rel="stylesheet"
      />
      <Navbar />
      <Toaster position="top-center" richColors closeButton />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/cart/checkout" element={<Checkout />} />
        <Route path="/product/:Product_name" element={<Product_page />} />
        <Route path="/products" element={<Products />} />
        <Route path="/adminpanel" element={<AdminPanel />} />
        <Route path="/adminpanel/catalog" element={<AdminCatalogPage />} />
        <Route path="/adminpanel/orders" element={<AdminOrdersPage />} />
        <Route path="/account/orders" element={<Account_order />} />
        <Route path="/account/orders/:orderId" element={<OrderShow />} />
        <Route path="/account/me" element={<Account_me />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
