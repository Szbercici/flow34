import React from "react";
import Product_show from "../components/Product_show";
import Scroll_container from "../components/Scroll_container"; 
import Video_default from "../assets/Video_default";
import { Products } from "../components/Product_loader_api";
import InfiniteText from "../components/Infinitetext";


const Home = () => {
  const { products} = Products();
return (
  <>
    
    <div className="container">

      <Video_default/>
       <h1>Taste the freshness</h1>
    </div>


    <Scroll_container products={products.filter(product => product.category === "Microdrink")} />
    <InfiniteText />
      <div className="container">

    <h1>Drink form the flow.</h1>
    </div>
        <Scroll_container products={products.filter(product => product.category === "Water Bottles")} />
    </>
  );
};

export default Home;
