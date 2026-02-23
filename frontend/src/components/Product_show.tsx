import React from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../config/api";
 
const Product_show = ({ product }) => {
  return (
    <Link className="product-card" to={`/product/${product.name}`}>
      <img
        className="product-image"
        src={`${API_BASE_URL}/${product.img}`}
        alt={product.name}
      />
      <div className="productName">{product.name}</div>
      <p className="productPrice"> {product.price} €</p>
    </Link>
  );
};

export default Product_show;
