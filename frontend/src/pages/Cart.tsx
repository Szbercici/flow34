import React from "react";
import { Link } from "react-router-dom";
import styles from "./Cart.module.css";
import { useCart } from "../CartContext";
import { API_BASE_URL } from "../config/api";
import Blob from "../assets/Blob";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "../AuthContext";

const Cart = () => {
  const { items, addToCart, removeFromCart } = useCart();
  const navigate = useNavigate();
  const { user } = useAuth();
  // 1. Végösszeg kiszámítása (price * quantity)
  const totalPrice = items.reduce(
    (acc, item) =>
      acc + Number(item.price ?? 0) * (Number(item.quantity ?? "1") || 1),
    0,
  );
  function toCheckout() {
    if (!user) {
      navigate("/login");
      toast.error("Please login to checkout."); 
    } else {
      navigate("/cart/checkout");
    }
  }

  // 2. Üres kosár kezelése
  if (items.length === 0) {
    return (
      <div className={`${styles.container} ${styles["empty-cart"]}`}>
        <h2>Your cart is empty 😢</h2>
        <Link to="/" className={styles["back-button"]}>
          Back to the store
        </Link>
      </div>
    );
  }

  return (
    <div className={`${styles.container} ${styles["cart-page"]}`}>
      <h2>Cart contents</h2>
      <Blob className={styles["cart-blob"]} />

      <div className={styles["cart-list"]}>
        {items.map((product) => (
          <div key={product.id} className={styles["cart-item"]}>
            <div className={styles["cart-info"]}>
              {product.img ? (
                <img
                  onClick={() => navigate(`/product/${product.name}`)}
                  src={`${API_BASE_URL}/${product.img}`}
                  alt={product.name}
                  className={`${styles["cart-item-image"]} ${styles.clickable}`}
                />
              ) : (
                <div
                  className={`${styles["cart-item-image"]} ${styles.placeholder}`}
                >
                  No Image
                </div>
              )}
              <div>
                <h2
                  className={styles.clickable}
                  onClick={() => navigate(`/product/${product.name}`)}
                >
                  {product.name}
                </h2>
                <p className={styles["item-price"]}>
                  {(product.price ?? 0).toLocaleString()} € / unit
                </p>
              </div>
            </div>

            <div className={styles["cart-controls"]}>
              <button
                className={styles["btn-minus"]}
                onClick={() => removeFromCart(product)}
              >
                -
              </button>
              <span className={styles.quantity}>{product.quantity ?? 1}</span>
              <button
                className={styles["btn-plus"]}
                onClick={() => addToCart(product)}
              >
                +
              </button>
            </div>

            <div className={styles["item-total"]}>
              {(product.price * (product.quantity || 1)).toLocaleString()} €
            </div>
          </div>
        ))}
      </div>

      {/* 3. Összegző rész */}
      <div className={styles["cart-summary"]}>
        <div className={styles["summary-row"]}>
          <span>Total:</span>
          <span className={styles["total-amount"]}>
            {totalPrice.toLocaleString()} €{" "}
          </span>
        </div>
        <button
          className={styles["checkout-button"]}
          onClick={toCheckout}
        >
          Proceed to Checkout
        </button>
        <div
          onClick={() => navigate("/")}
          className={`${styles["continue-shopping"]} ${styles.clickable}`}
        >
          Continue shopping
        </div>
      </div>
    </div>
  );
};

export default Cart;
