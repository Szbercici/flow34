import { useParams } from "react-router-dom";
import { Products } from "../components/Product_loader_api";
import "./Product_page.css";
import { CartContext } from "../CartContext";
import { API_BASE_URL } from "../config/api";
import { useContext } from "react";
import { toast } from "sonner";

const Product_page = () => {
  const { products } = Products();
  const name = useParams().Product_name;
  const currentProduct = products.find((p) => p.name === name);
  const { addToCart } = useContext(CartContext)!;
  window.scrollTo(0, 0);

  return (
    <>
      {/* 2. VÁLTOZÁS: styles.container használata */}
      <div className="container, product-container">
        {/* FONTOS: Ha a CSS-ben kötőjelet használtál (left-column), 
               akkor itt [] zárójelet kell használnod! 
               (Mert a styles.left-column kivonást jelentene JS-ben)
            */}
        <div className="left-column">
          <img
            src={`${API_BASE_URL}/${currentProduct?.img}`}
            alt={currentProduct?.name}
          />
        </div>

        <div className="right-column">
          <h1>{name}</h1>
          <p>{currentProduct?.description}</p>
          <p>Price: {currentProduct?.price} €</p>
          <button
            className="add-to-cart"
            onClick={() => {
              addToCart(currentProduct!);
              toast.info("Item added to the cart");
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
