import React, { useState, useEffect } from "react";
import Account_page_menu from "../components/Account_page_menu";
import { useAuth } from "../AuthContext";
import { API_BASE_URL } from "../config/api";
import { Link, useNavigate, useParams } from "react-router-dom";
import checkoutStyles from "../pages/Checkout.module.css";
import styles from "./Account_order_show.module.css";

const Account_order_show = () => {
  const { user } = useAuth();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const orderId = useParams().orderId;

  if (!user) {
    navigate("/login");
  }

  useEffect(() => {
    async function getOrderById() {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/api/orders/${orderId}`, {
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        setOrder(result);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    }

    getOrderById();
  }, [orderId]);

  return (
    <>
      <Account_page_menu>
        <div className={styles.headerRow}>
          <button
            type="button"
            onClick={() => navigate("/account/orders")}
            className={styles.backButton}
            aria-label="Back"
          >
            <span className={styles.backArrow}>←</span>
          </button>
          <h1 className={styles.orderTitle}>Order #{orderId}</h1>
        </div>

        <div className={styles.infoCard}>
          <p className={styles.infoCardTitle}>Information</p>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Name</span>
            <span className={styles.infoValue}>
              {order?.firstName} {order?.lastName}
            </span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Address</span>
            <span className={styles.infoValue}>{order?.address ?? "—"}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Order email</span>
            <span className={styles.infoValue}>{order?.email ?? "—"}</span>
          </div>
        </div>

        <p className={styles.sectionTitle}>Order items</p>
        <div className={styles.itemsWrapper}>
          {order?.items.map((product) => (
            <Link
              key={product.id}
              className={styles.productLink}
              to={`/product/${product.name}`}
            >
              <div className={checkoutStyles["cart-item"]}>
                <div className={checkoutStyles["cart-info"]}>
                  {product.img ? (
                    <img
                      src={`${API_BASE_URL}/${product.img}`}
                      alt={product.name}
                      className={checkoutStyles["cart-item-image"]}
                    />
                  ) : (
                    <div
                      className={`${checkoutStyles["cart-item-image"]} ${checkoutStyles.placeholder}`}
                    >
                      No Image
                    </div>
                  )}
                  <div>
                    <h4>{product.name}</h4>
                    <p className={checkoutStyles["item-price"]}>
                      {(product.price ?? 0).toLocaleString()} € x{" "}
                      {product.quantity ?? 1}
                    </p>
                  </div>
                </div>
                <div className={checkoutStyles["item-total"]}>
                  {(product.price * (product.quantity || 1)).toLocaleString()} €
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Account_page_menu>
    </>
  );
};

export default Account_order_show;
