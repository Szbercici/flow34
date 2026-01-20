import React from 'react'
import "./Product_show.css"; 
import { Link } from 'react-router-dom';

const Product_show = ({ product }) => {

  return (
    <Link className="product-card" to={`/product/${product.name}`}> 
        <img 
            className="product-image" 
            src={product.img} 
            alt={product.name} 
            
        />
        <div className="termek_nev">{product.name}</div>
          <p className='shopShow'> {product.price} €</p>
    </Link>
  )
}

export default Product_show