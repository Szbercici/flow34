import Product_show from "../components/Product_show";
import styles from "./Produtcs.module.css";
import { Products } from "../components/Product_loader_api";

const Produtcs = () => {
  const { products, loading, error } = Products();

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

  if (error) {
    return (
      <div className={styles.productsPage}>
        <div className="container">
          <h1>Termékek</h1>
          <div className={styles.error}>Hiba történt: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.productsPage}>
      <div className="container">
        <h1>Termékek</h1>
        <div className={styles.productsGrid}>
          {products.map((product) => (
            <Product_show key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
    
  );
};

export default Produtcs;
