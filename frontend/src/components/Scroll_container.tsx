import React from 'react';
import type { Product } from './Product_loader_api';
import Product_show from './Product_show';

// Swiper komponensek és stílusok importálása
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Scrollbar } from 'swiper/modules';

// Alapértelmezett Swiper stílusok (ezek kellenek a működéshez!)
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/scrollbar';

// A saját CSS-edet megtarthatod a finomhangoláshoz
import './Scroll_container.css';

interface ScrollContainerProps {
  products: Product[];
}

const Scroll_container: React.FC<ScrollContainerProps> = ({ products }) => {
  if (!products || products.length === 0) return null;

  return (
    <div className="flow-scroll-container" style={{ padding: '20px 0' }}>
      <Swiper
        // Modulok aktiválása
        modules={[FreeMode, Scrollbar]}
        
        // Beállítások a "húzogatós" élményhez
        spaceBetween={110}      // Távolság a termékek között
        slidesPerView={"auto"}  // Fontos: így a CSS-ben megadott szélességet használja
        freeMode={false}         // Ne ugorjon kártyáról kártyára, hanem szabadon csússzon
        grabCursor={true}       // Mutassa a "megfogható" kurzort
        scrollbar={{ draggable: true, hide: false }} // Megjelenít egy húzható csíkot alul
        className="mySwiper"
      >
        {products.map((product: Product) => (
          <SwiperSlide 
            key={product.id} 
            style={{ width: 'auto' }} // Hogy a Product_show mérete érvényesüljön
          >
            <div className="flow-product-wrapper">
              <Product_show product={product} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Scroll_container;