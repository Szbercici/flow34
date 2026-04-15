import { Link } from "react-router-dom";
import { API_BASE_URL } from "../config/api";
import type { Product } from "./Product_loader_api";

interface ProductShowProps {
  product: Product;
}

const Product_show = ({ product }: ProductShowProps) => {
  const imageUrl = product.img ? `${API_BASE_URL}/${product.img}` : undefined;

  return (
    <Link className="product-card" to={`/product/${product.name}`}>
      {imageUrl ? (
        <img className="product-image" src={imageUrl} alt={product.name} />
      ) : (
        <div className="product-image placeholder">No image</div>
      )}
      <div className="productName">{product.name}</div>
      <p className="productPrice"> {product.price} €</p>
    </Link>
  );
};

export default Product_show;
