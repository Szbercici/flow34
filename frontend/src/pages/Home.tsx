import React from "react";
import  {products} from "../components/Products_loader";
import Product_show from "../components/Product_show";
import Scroll_container from "../components/Scroll_container"; 
import Video_default from "../assets/Video_default";


const Home = () => {
return (
  <>
    
    <div className="container">

      <Video_default/>
       <h1>Taste the freshness</h1>
    </div>


    <Scroll_container products={products.filter(product => product.category === "Microdrink")} />

      <div className="container">
      <h1>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur quod assumenda temporibus eaque non praesentium architecto, ut asperiores sit nemo qui. Debitis enim quasi magnam dolorum odit quas sunt nemo?</h1> 
    </div>

    <h1>Drink the flow form the flow.</h1>
        <Scroll_container products={products.filter(product => product.category === "Water Bottles")} />
    </>
  );
};

export default Home;
