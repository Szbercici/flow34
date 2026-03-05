import React from 'react';
import { useState } from 'react';
import Product_show from "../components/Product_show";
import Scroll_container from "../components/Scroll_container"; 
import Video_default from "../assets/Video_default";
import { Products } from "../components/Product_loader_api";
import InfiniteText from "../components/Infinitetext";
import "../components/Product_show.css";
 import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs,Autoplay, Navigation, Pagination } from 'swiper/modules';
import styles from "./Home.module.css"
import "swiper/css";
import 'swiper/css/pagination';

const Home = () => {
  const { products} = Products();
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

return (
  <>
        
    <Swiper

      autoplay={{
       delay: 8000,                // 3000 ms = 3 másodpercenként vált
       disableOnInteraction: false, // Ha a felhasználó belenyúl (lapoz), utána is folytatja az automatikus pörgetést
      }}

      pagination={{
       clickable: true
      }}

      modules={[Autoplay, Navigation, Pagination]}
      className={styles.swiper}
      spaceBetween={20}         // 500 helyett legyen 20
      slidesPerView={1}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
      
    
    >
      <SwiperSlide className={styles.swiperSlide}> 
         <Video_default/>
      </SwiperSlide>

      <SwiperSlide className={styles.swiperSlide}>
          <img src="https://placehold.co/600x400" alt="Slide 2" />
      </SwiperSlide>
    </Swiper>
  <div className="container">
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
