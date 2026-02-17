import React from "react";
import { Link } from "react-router-dom";
import "./Cart.css";
import { useCart } from "../CartContext";
import { API_BASE_URL } from "../config/api";
import Blob from "../assets/Blob";

const Cart = () => {
  const { items, addToCart, removeFromCart } = useCart();

  // 1. Végösszeg kiszámítása (price * quantity)
  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0,
  );

  // 2. Üres kosár kezelése
  if (items.length === 0) {
    return (
      <div className="container empty-cart">
        <h2>Your cart is empty 😢</h2>
        <Link to="/" className="back-button">
          Back to the store
        </Link>
      </div>
    );
  }

  return (
    <div className="container cart-page">
      <h1>Cart contents</h1>
      <Blob className="cart-blob" />

      <div className="cart-list">
        {items.map((product) => (
          <div key={product.id} className="cart-item">
            <div className="cart-info">
              <img
                src={`${API_BASE_URL}/${product.img}`}
                alt={product.name}
                className="cart-item-image"
              />
              <div>
                <h2>{product.name}</h2>
                <p className="item-price">
                  {(product.price ?? 0).toLocaleString()} € / db
                </p>
              </div>
            </div>

            <div className="cart-controls">
              <button
                className="btn-minus"
                onClick={() => removeFromCart(product)}
              >
                -
              </button>
              <span className="quantity">{product.quantity ?? 1}</span>
              <button className="btn-plus" onClick={() => addToCart(product)}>
                +
              </button>
            </div>

            <div className="item-total">
              {(product.price * (product.quantity || 1)).toLocaleString()} €
            </div>
          </div>
        ))}
      </div>

      {/* 3. Összegző rész */}
      <div className="cart-summary">
        <div className="summary-row">
          <span>Total:</span>
          <span className="total-amount">{totalPrice.toLocaleString()} € </span>
        </div>
        <button
          className="checkout-button"
          onClick={() => alert("Irány a fizetés!")}
        >
          Proceed to Checkout
        </button>
        <Link to="/" className="continue-shopping">
          Continue shopping
        </Link>
      </div>
    </div>
  );
};

export default Cart;
