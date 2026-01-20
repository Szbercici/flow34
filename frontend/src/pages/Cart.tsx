import React, { useContext } from 'react';
import { Link } from 'react-router-dom'; // Ha akarsz "Vissza a boltba" gombot
import './Cart.css';
import { Context, useCart,type CartItem } from '../Context';
import { products } from '../components/Products_loader';


const Cart = () => {
   const { items } = useContext(Context)!;
   const { removeFromCart } = useCart();
   const {addToCart} = useCart();
   let tempItems: CartItem[] = [];

       for (const product of items) {
            const inTempItems = tempItems.find((tempItem) => tempItem.id === product.id);
            if (!inTempItems){
              tempItems.push(product);
            }
           }


  return (
        <div className="container">
            {/* Itt a SZŰRT listán (tempItems) megyünk végig, hogy minden cipő csak 1x látszódjon */}
            {tempItems.map((product, index) => {
                
                // 4. ITT SZÁMOLJUK A DARABSZÁMOT:
                // Visszanyúlunk az EREDETI 'items' listához, és megszámoljuk, hányszor szerepel benne ez az ID.
                const quantity = items.filter((i) => i.id === product.id).length;

                return (
                    <div key={index} className="cart-item">
                        <h2>{product.name}</h2>
                        
                        <img 
                            src={`/${product.img}`} 
                            alt={product.name} 
                            className="cart-item-image" 
                            style={{width: "100px"}}
                        />                    
                        <h2>Darab: {quantity}</h2>                        
                        <button 
                            className="add-to-cart" 
                            onClick={() => removeFromCart(product)} 
                        >
                            Remove from cart
                        </button>
                        <button 
                            className="add-to-cart" 
                            onClick={() => addToCart(product)} 
                        > Add to cart
                        </button>
                           
                          
                        
                    </div>
                );
            })}
        </div>
    );
};

export default Cart;