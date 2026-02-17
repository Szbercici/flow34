import React, { useContext } from "react";
import { Link } from "react-router-dom"; // Ha akarsz "Vissza a boltba" gombot
import "./Cart.css";
import { CartContext, useCart, type CartItem } from "../CartContext";
import { products } from "../components/Products_loader";


const Cart = () => {
  const { items } = useContext(CartContext)!;
  const { removeFromCart } = useCart();
  const { addToCart } = useCart();

  return (
    <div className="container">
      {/* Itt a SZŰRT listán (tempItems) megyünk végig, hogy minden cipő csak 1x látszódjon */}
      {items.map((product, index) => {
        // 4. ITT SZÁMOLJUK A DARABSZÁMOT:
        // Visszanyúlunk az EREDETI 'items' listához, és megszámoljuk, hányszor szerepel benne ez az ID.
        return (
          <div key={index} className="cart-item">
            <h2>{product.name}</h2>

            <img
              src={`/${product.img}`}
              alt={product.name}
              className="cart-item-image"
              style={{ width: "100px" }}
            />
            <h2>Darab: {product.quantity}</h2>
            <button
              className="add-to-cart"
              onClick={() => removeFromCart(product)}
            >
              Remove from cart
            </button>
            <button className="add-to-cart" onClick={() => addToCart(product)}>
              Add to cart
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Cart;
