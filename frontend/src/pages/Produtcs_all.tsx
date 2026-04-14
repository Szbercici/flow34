import Product_show from "../components/Product_show";
import { Products } from "../components/Product_loader_api";
import styles from "./Produtcs_all.module.css";

const Produtcs = () => {
  const { products, loading, error } = Products();

  // Betöltési állapot
  if (loading) {
    return (
      <div className={styles.productsPage}>
        <div className="container">
          <h1>Termékek</h1>
          <div className={styles.loading}>Termékek betöltése...</div>
        </div>
      </div>
    );
  }

  // Hiba állapot
  if (error) {
    return (
      <div className={styles.productsPage}>
        <div className="container">
          <h1>Products</h1>
          <div className={styles.error}>Error occurred: {error}</div>
        </div>
      </div>
    );
  }

  // Successful load
  return (
    <div className={styles.productsPage}>
      <div className="container">
        <h1>Products</h1>
        <div className={styles.productsGrid}>
          {products.map((product) => (
            /* Itt a Product_show komponensed fogja használni a .product-card stílusokat */
            <Product_show key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Produtcs;