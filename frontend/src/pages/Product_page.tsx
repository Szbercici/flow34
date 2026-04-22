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
  const descriptionParts = currentProduct?.description
    ?.split(":")
    .map((part) => part.trim())
    .filter((part) => part.length > 0);
  const primaryDescription = descriptionParts?.[0];
  const secondaryDescriptionParts = descriptionParts?.slice(1) ?? [];

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
          {secondaryDescriptionParts.length > 0 && (
            <div className="product-description-top">
              {secondaryDescriptionParts.map((part, index) => (
                <p key={`${part}-${index}`}>{part}</p>
              ))}
            </div>
          )}
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
          {primaryDescription && (
            <p className="product-description-bottom">{primaryDescription}</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Product_page;
