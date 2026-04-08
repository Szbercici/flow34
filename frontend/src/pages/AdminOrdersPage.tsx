import { useEffect, useMemo, useState } from "react";
import AdminPageHeader from "../components/AdminPageHeader.tsx";
import styles from "./AdminWorkspace.module.css";
import pageStyles from "./AdminOrdersPage.module.css";
import {
  currencyFormatter,
  emptyAdminSnapshot,
  fetchAdminSnapshot,
  numberFormatter,
} from "./adminData";

const AdminOrdersPage = () => {
  const [snapshot, setSnapshot] = useState(emptyAdminSnapshot);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadOrders = async () => {
      setLoading(true);
      setError(null);

      try {
        const nextSnapshot = await fetchAdminSnapshot();

        if (!isMounted) {
          return;
        }

        setSnapshot(nextSnapshot);
      } catch (loadError) {
        if (!isMounted) {
          return;
        }

        setError(
          loadError instanceof Error
            ? loadError.message
            : "Unexpected orders loading error.",
        );
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    void loadOrders();

    return () => {
      isMounted = false;
    };
  }, []);

  const { orders, orderSummaries } = snapshot;

  const totalRevenue = useMemo(
    () => orders.reduce((sum, order) => sum + order.totalRevenue, 0),
    [orders],
  );

  const totalItems = useMemo(
    () => orders.reduce((sum, order) => sum + order.itemCount, 0),
    [orders],
  );

  const repeatCustomers = useMemo(
    () => orderSummaries.filter((summary) => summary.orderCount > 1).length,
    [orderSummaries],
  );

  const averageBasketValue =
    orders.length > 0 ? totalRevenue / orders.length : 0;
  const averageBasketSize = orders.length > 0 ? totalItems / orders.length : 0;

  const topCustomers = useMemo(
    () =>
      [...orderSummaries]
        .filter((summary) => summary.orderCount > 0)
        .sort((left, right) => right.totalRevenue - left.totalRevenue)
        .slice(0, 5),
    [orderSummaries],
  );

  const rankedOrders = useMemo(
    () =>
      [...orders].sort((left, right) => right.totalRevenue - left.totalRevenue),
    [orders],
  );

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <AdminPageHeader
          title="Orders overview"
          description="Admin orders are aggregated from current store data by combining the admin user directory with each user order stream."
          meta={
            loading
              ? "Loading order activity..."
              : `${numberFormatter.format(orders.length)} order batches aggregated`
          }
        />

        {error && <div className={styles.errorBox}>{error}</div>}

        <section className={`${styles.cardGrid} ${pageStyles.cardGrid}`}>
          <article className={styles.metricCard}>
            <span>Orders</span>
            <strong>{numberFormatter.format(orders.length)}</strong>
            <p>Aggregated order batches available for review.</p>
          </article>

          <article className={styles.metricCard}>
            <span>Revenue</span>
            <strong>{currencyFormatter.format(totalRevenue)}</strong>
            <p>
              {currencyFormatter.format(averageBasketValue)} average basket
              value.
            </p>
          </article>

          <article className={styles.metricCard}>
            <span>Items sold</span>
            <strong>{numberFormatter.format(totalItems)}</strong>
            <p>{averageBasketSize.toFixed(1)} items per order on average.</p>
          </article>

          <article className={styles.metricCard}>
            <span>Repeat buyers</span>
            <strong>{numberFormatter.format(repeatCustomers)}</strong>
            <p>Customers with more than one order.</p>
          </article>
        </section>

        <section className={`${styles.ordersGrid} ${pageStyles.ordersGrid}`}>
          <article className={`${styles.panel} ${pageStyles.panel}`}>
            <div className={styles.panelHeader}>
              <h3>Order ledger</h3>
              <span className={styles.panelMeta}>Sorted by basket value</span>
            </div>

            <div className={styles.recordList}>
              {rankedOrders.length > 0 ? (
                rankedOrders.map((order, index) => (
                  <article key={order.id} className={styles.recordCard}>
                    <div className={styles.recordHeader}>
                      <div>
                        <strong>{order.username}</strong>
                        <p className={styles.recordMeta}>{order.email}</p>
                      </div>
                      <div className={styles.orderSide}>
                        <span className={styles.statusBadge}>
                          Batch {index + 1}
                        </span>
                        <small>
                          {currencyFormatter.format(order.totalRevenue)}
                        </small>
                      </div>
                    </div>

                    <p className={styles.recordMeta}>{order.address}</p>

                    <div className={styles.tagList}>
                      <span className={styles.tag}>
                        {numberFormatter.format(order.itemCount)} items
                      </span>
                      {order.items.slice(0, 3).map((item) => (
                        <span
                          key={`${order.id}-${item.id}`}
                          className={styles.tag}
                        >
                          {item.name}
                        </span>
                      ))}
                    </div>
                  </article>
                ))
              ) : (
                <p className={styles.emptyText}>No order data available yet.</p>
              )}
            </div>
          </article>

          <div className={`${styles.stack} ${pageStyles.stack}`}>
            <article className={`${styles.panel} ${pageStyles.panel}`}>
              <div className={styles.panelHeader}>
                <h3>Top customers</h3>
                <span className={styles.panelMeta}>By revenue</span>
              </div>

              <div className={styles.orderList}>
                {topCustomers.length > 0 ? (
                  topCustomers.map((customer) => (
                    <div key={customer.userId} className={styles.orderItem}>
                      <div>
                        <strong>{customer.username}</strong>
                        <p>{customer.primaryAddress}</p>
                      </div>
                      <div className={styles.orderSide}>
                        <span className={styles.statusBadge}>
                          {customer.orderCount} orders
                        </span>
                        <small>
                          {currencyFormatter.format(customer.totalRevenue)}
                        </small>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className={styles.emptyText}>
                    No repeat order activity yet.
                  </p>
                )}
              </div>
            </article>

            <article className={`${styles.panel} ${pageStyles.panel}`}>
              <div className={styles.panelHeader}>
                <h3>Operational notes</h3>
                <span className={styles.panelMeta}>Current data shape</span>
              </div>

              <div className={styles.compactList}>
                <div className={styles.compactItem}>
                  <div>
                    <strong>Source</strong>
                    <p>Admin users plus per-user order endpoint aggregation.</p>
                  </div>
                </div>
                <div className={styles.compactItem}>
                  <div>
                    <strong>Missing fields</strong>
                    <p>No global admin order id or timestamp is exposed yet.</p>
                  </div>
                </div>
                <div className={styles.compactItem}>
                  <div>
                    <strong>Use case</strong>
                    <p>
                      This view is optimized for customer value and basket
                      review.
                    </p>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>
      </div>
    </main>
  );
};

export default AdminOrdersPage;
