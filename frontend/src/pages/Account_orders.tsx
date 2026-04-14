import { useState, useEffect } from "react";
import Account_page_menu from "../components/Account_page_menu";
import { useAuth } from "../AuthContext";
import { API_BASE_URL } from "../config/api";
import styles from "./Account_orders.module.css";
import { useNavigate } from "react-router-dom";

interface OrderSummary {
  orderId: number;
  createdAt: string;
  itemCount?: number;
  totalPrice: number;
}



const Account_orders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<OrderSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
    }
  }, [navigate, user]);

  useEffect(() => {
    async function getOrders() {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/api/orders`, {
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const result = (await response.json()) as OrderSummary[];
        setOrders(Array.isArray(result) ? result : []);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    }

    getOrders();
  }, [user]);


  if (loading) {
    return (
      <Account_page_menu>
        <div className={styles.container}>
          <div className={styles.emptyState}>
            <p>Loading your orders...</p>
          </div>
        </div>
      </Account_page_menu>
    );
  }

  return (
    <Account_page_menu>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>My Orders</h1>
        </div>
        {!orders.length ? (
          <div className={styles.emptyState}>
            <h2>No orders yet</h2>
            <p>When you place your first order, it will appear here.</p>
          </div>
        ) : (
          <div className={styles.ordersGrid}>
            {orders.map((order) => (
              <div key={order.orderId} onClick={() => navigate(`/account/orders/${order.orderId}`)} className={styles.orderCard}>
                <div className={styles.orderHeader}>
                  <h3 className={styles.orderId}>Order #{order.orderId}</h3>
                  <span className={styles.orderStatus}>In progress</span>
                </div>
                <div className={styles.orderDetails}>
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Date</span>
                    <span className={styles.detailValue}>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Items</span>
                    <span className={styles.detailValue}>
                      {order.itemCount || 0} item
                      {(order.itemCount || 0) !== 1 ? "s" : ""}
                    </span>
                  </div>
                </div>
                <div className={styles.orderTotal}>
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Total</span>
                    <span className={styles.totalAmount}>
                      {order.totalPrice}$
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Account_page_menu>
  );
};

export default Account_orders;
