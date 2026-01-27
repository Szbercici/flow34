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
import { AuthProvider } from "./AuthContext";
import Account_me from "./pages/Account_Me";
import Account_order from "./pages/Account_orders";

function App() {
  return (
    <AuthProvider>
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
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:Product_name" element={<Product_page />} />
          <Route path="/account/orders" element={<Account_order />} />
          <Route path="/account/me" element={<Account_me />} />
        </Routes>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
