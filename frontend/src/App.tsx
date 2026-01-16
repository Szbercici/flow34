import Navbar from "./components/Navbar"; 
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import {Route, Routes} from "react-router-dom";
import Product_page from "./pages/Product_page";
import Cart from "./pages/Cart";
import Register from "./pages/Register";

 
function App() {
  
  return (
    <div>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Lexend+Exa:wght@100..900&display=swap" rel="stylesheet" />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:Product_name" element={<Product_page />} />
      </Routes>
    </div>
  );
}

export default App;
