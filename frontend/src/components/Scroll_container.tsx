import React from 'react';
import Product_show from './Product_show';
import './Scroll_container.css'; 

const Scroll_container = ({ products }) => {
  return (
    <div className="flow-scroll-container">
      {products.map((product) => (
        <div key={product.id} className="flow-product-wrapper"> 
           <Product_show product={product} />
        </div>
      ))}
    </div>
  )
}

export default Scroll_container;