import React, { useState } from "react";
import styles from "./Checkout.module.css";
import { Toaster, toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useCart } from "../CartContext";
import { API_BASE_URL } from "../config/api";

const Checkout = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { items, setItems } = useCart();

  // Végösszeg kiszámítása
  const totalPrice = items.reduce(
    (acc, item) =>
      acc + Number(item.price ?? 0) * (Number(item.quantity ?? "1") || 1),
    0,
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    // Adatok kiszedése
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(`${API_BASE_URL}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, items }),
      });
      if (response.ok) {
        toast.success("Order placed successfully!");
        navigate("/");
        setItems([]);
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Checkout failed.");
      }
    } catch (err) {
      setError("Network error, please try again later!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Toaster position="top-center" />
      <div className={styles["checkout-layout"]}>
        {" "}
        <div className={styles["form-section"]}>
          <h2>Billing Information</h2>

          {/* Hibaüzenet megjelenítése, ha van */}
          {error && (
            <div style={{ color: "red", fontSize: "20px" }}>{error}</div>
          )}

          <form onSubmit={handleSubmit}>
            <div className={`${styles["form-group"]} ${styles["name-row"]}`}>
              <input
                className={styles["name-input"]}
                placeholder="First Name"
                type="text"
                name="firstName"
                required
              />
              <input
                className={styles["name-input"]}
                placeholder="Last Name"
                type="text"
                name="lastName"
                required
              />
            </div>
            <div className={styles["form-group"]}>
              <input placeholder="Email" type="email" name="email" required />
            </div>
            <div className={styles["form-group"]}>
              <input
                placeholder="Address"
                type="text"
                name="address"
                required
              />
            </div>
          </form>
        </div>
        {/* Jobb oldal: Cart tartalom és végösszeg (30%) */}
        <div className={styles["cart-section"]}>
          <h3>Order Summary</h3>
          <div className={styles["cart-list"]}>
            {items.map((product) => (
              <div key={product.id} className={styles["cart-item"]}>
                <div className={styles["cart-info"]}>
                  {product.img ? (
                    <img
                      src={`${API_BASE_URL}/${product.img}`}
                      alt={product.name}
                      className={styles["cart-item-image"]}
                    />
                  ) : (
                    <div
                      className={`${styles["cart-item-image"]} ${styles.placeholder}`}
                    >
                      No Image
                    </div>
                  )}
                  <div>
                    <h4>{product.name}</h4>
                    <p className={styles["item-price"]}>
                      {(product.price ?? 0).toLocaleString()} € x{" "}
                      {product.quantity ?? 1}
                    </p>
                  </div>
                </div>
                <div className={styles["item-total"]}>
                  {(product.price * (product.quantity || 1)).toLocaleString()} €
                </div>
              </div>
            ))}
          </div>
          <div className={styles["cart-summary"]}>
            <div className={styles["summary-row"]}>
              <span>Total:</span>
              <span className={styles["total-amount"]}>
                {totalPrice.toLocaleString()} €
              </span>
            </div>
          </div>
        </div>
      </div>
      <button
        type="submit"
        className={styles["checkout-button"]}
        disabled={loading}
        onClick={() => {
          const form = document.querySelector("form");
          if (form) form.requestSubmit();
        }}
      >
        {loading ? "Processing..." : "Place order"}
      </button>
    </div>
  );
};

export default Checkout;
