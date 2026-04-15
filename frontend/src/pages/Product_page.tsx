import { useParams } from "react-router-dom";
import { Products } from "../components/Product_loader_api";
import "./Product_page.css";
import { CartContext } from "../CartContext";
import { API_BASE_URL } from "../config/api";
import { useContext } from "react";
import { toast } from "sonner";
import type { CartItem } from "../CartContext";

const Product_page = () => {
  const { products } = Products();
  const name = useParams().Product_name;
  const currentProduct = products.find((p) => p.name === name);
  const { addToCart } = useContext(CartContext)!;

  return (
    <>
      {/* 2. VÁLTOZÁS: styles.container használata */}
      <div className="container, product-container">
        <div className="left-column">
          {currentProduct?.img ? (
            <img
              src={`${API_BASE_URL}/${currentProduct.img}`}
              alt={currentProduct.name}
            />
          ) : (
            <div className="product-image placeholder">No image</div>
          )}
        </div>

        <div className="right-column">
          <h1>{name}</h1>
          <p>{currentProduct?.description}</p>
          <p>Price: {currentProduct?.price} €</p>
          <button
            className="add-to-cart"
            onClick={() => {
              if (!currentProduct) {
                return;
              }

              const cartItem: CartItem = { ...currentProduct, quantity: 1 };
              addToCart(cartItem);
              toast.success("Product added to cart!");
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
};

export default Product_page;
