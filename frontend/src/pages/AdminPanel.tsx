import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import AdminPageHeader from "../components/AdminPageHeader.tsx";
import styles from "./AdminWorkspace.module.css";
import {
  currencyFormatter,
  emptyAdminSnapshot,
  fetchAdminSnapshot,
  numberFormatter,
  toNumber,
} from "./adminData";

const AdminPanel = () => {
  const [snapshot, setSnapshot] = useState(emptyAdminSnapshot);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadAdminData = async () => {
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
            : "Unexpected admin loading error.",
        );
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadAdminData();

    return () => {
      isMounted = false;
    };
  }, []);

  const { users, products, orderSummaries, orders } = snapshot;

  const metrics = useMemo(() => {
    const totalOrders = orderSummaries.reduce(
      (sum, user) => sum + user.orderCount,
      0,
    );
    const totalRevenue = orderSummaries.reduce(
      (sum, user) => sum + user.totalRevenue,
      0,
    );
    const adminCount = users.filter(
      (user) => (user.role ?? user.ROLE ?? "USER") === "ADMIN",
    ).length;
    const categoryCount = new Set(
      products.map((product) => product.category).filter(Boolean),
    ).size;
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    return [
      {
        label: "Users",
        value: numberFormatter.format(users.length),
        helper: `${adminCount} admin account`,
      },
      {
        label: "Products",
        value: numberFormatter.format(products.length),
        helper: `${categoryCount} categories`,
      },
      {
        label: "Orders",
        value: numberFormatter.format(totalOrders),
        helper: `${numberFormatter.format(orderSummaries.filter((user) => user.orderCount > 0).length)} active buyers`,
      },
      {
        label: "Revenue",
        value: currencyFormatter.format(totalRevenue),
        helper: `${currencyFormatter.format(averageOrderValue)} avg order`,
      },
    ];
  }, [orderSummaries, products, users]);

  const topCustomers = useMemo(
    () =>
      [...orderSummaries]
        .filter((user) => user.orderCount > 0)
        .sort((a, b) => b.totalRevenue - a.totalRevenue)
        .slice(0, 5),
    [orderSummaries],
  );

  const largestOrders = useMemo(
    () =>
      [...orders].sort((a, b) => b.totalRevenue - a.totalRevenue).slice(0, 4),
    [orders],
  );

  const categoryPreview = useMemo(() => {
    const counts = products.reduce<Record<string, number>>(
      (accumulator, product) => {
        const key = product.category || "Uncategorized";
        accumulator[key] = (accumulator[key] ?? 0) + 1;
        return accumulator;
      },
      {},
    );

    return Object.entries(counts)
      .sort(([, leftCount], [, rightCount]) => rightCount - leftCount)
      .slice(0, 3);
  }, [products]);

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <div className={styles.content}>
          <AdminPageHeader
            title="Store overview"
            description="Dashboard built from current store data, live catalog rows and aggregated admin order activity."
            meta={
              loading
                ? "Syncing current store data..."
                : "Current store data ready"
            }
          />

          {error && <div className={styles.errorBox}>{error}</div>}

          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <div>
                <p className={styles.eyebrow}>Dashboard</p>
                <h2>Current store data</h2>
              </div>
            </div>

            <div className={styles.cardGrid}>
              {metrics.map((card) => (
                <article key={card.label} className={styles.metricCard}>
                  <span>{card.label}</span>
                  <strong>{card.value}</strong>
                  <p>{card.helper}</p>
                </article>
              ))}
            </div>

            <div className={styles.dashboardGrid}>
              <article className={styles.panel}>
                <div className={styles.panelHeader}>
                  <h3>Top customers</h3>
                  <span className={styles.panelMeta}>By total revenue</span>
                </div>
                <div className={styles.orderList}>
                  {topCustomers.length > 0 ? (
                    topCustomers.map((customer) => (
                      <div key={customer.userId} className={styles.orderItem}>
                        <div>
                          <strong>{customer.username}</strong>
                          <p>{customer.email}</p>
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
                      No order data available yet.
                    </p>
                  )}
                </div>
              </article>

              <article className={styles.panel}>
                <div className={styles.panelHeader}>
                  <h3>Largest baskets</h3>
                  <span className={styles.panelMeta}>Highest order value</span>
                </div>
                <div className={styles.compactList}>
                  {largestOrders.length > 0 ? (
                    largestOrders.map((order) => (
                      <div key={order.id} className={styles.compactItem}>
                        <div>
                          <strong>{order.username}</strong>
                          <p>{order.address}</p>
                        </div>
                        <small>
                          {numberFormatter.format(order.itemCount)} items •{" "}
                          {currencyFormatter.format(order.totalRevenue)}
                        </small>
                      </div>
                    ))
                  ) : (
                    <p className={styles.emptyText}>No order data available.</p>
                  )}
                </div>
              </article>
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <div>
                <p className={styles.eyebrow}>Products</p>
                <h2>Catalog overview</h2>
              </div>
              <div className={styles.sectionActions}>
                <span className={styles.sectionMeta}>
                  Live product list from catalog
                </span>
                <Link to="/adminpanel/catalog" className={styles.modifyButton}>
                  Modify
                </Link>
              </div>
            </div>

            <div className={styles.miniStatGrid}>
              {categoryPreview.map(([category, count]) => (
                <article key={category} className={styles.miniStat}>
                  <span className={styles.ctaLabel}>Category mix</span>
                  <strong>{numberFormatter.format(count)}</strong>
                  <p className={styles.ctaText}>{category}</p>
                </article>
              ))}
            </div>

            <article className={styles.panel}>
              <div className={styles.tableHeader}>
                <strong>Products</strong>
                <span>Name, category and price</span>
              </div>
              <div className={styles.tableWrap}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Category</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.length > 0 ? (
                      products.map((product) => (
                        <tr key={product.id}>
                          <td>{product.name}</td>
                          <td>{product.category || "Uncategorized"}</td>
                          <td>
                            {currencyFormatter.format(toNumber(product.price))}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={3} className={styles.emptyCell}>
                          No products available.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </article>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <div>
                <p className={styles.eyebrow}>Users</p>
                <h2>User directory</h2>
              </div>
              <span className={styles.sectionMeta}>
                Live admin user endpoint
              </span>
            </div>

            <article className={styles.panel}>
              <div className={styles.tableHeader}>
                <strong>Users</strong>
                <span>Role, order count and total customer value</span>
              </div>
              <div className={styles.tableWrap}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Orders</th>
                      <th>Revenue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.length > 0 ? (
                      users.map((user) => {
                        const role = user.role ?? user.ROLE ?? "USER";
                        const summary = orderSummaries.find(
                          (item) => item.userId === user.id,
                        );

                        return (
                          <tr key={user.id}>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>
                              <span className={styles.roleBadge}>{role}</span>
                            </td>
                            <td>
                              {numberFormatter.format(summary?.orderCount ?? 0)}
                            </td>
                            <td>
                              {currencyFormatter.format(
                                summary?.totalRevenue ?? 0,
                              )}
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={5} className={styles.emptyCell}>
                          No users available.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </article>
          </section>
        </div>
      </div>
    </main>
  );
};

export default AdminPanel;
