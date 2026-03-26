import React from "react";
import type { Product } from "./Product_loader_api";
import Product_show from "./Product_show";

// Swiper komponensek és stílusok importálása
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Scrollbar } from "swiper/modules";

// Alapértelmezett Swiper stílusok (ezek kellenek a működéshez!)
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";

// A saját CSS-edet megtarthatod a finomhangoláshoz
import "./Scroll_container.css";

interface ScrollContainerProps {
  products: Product[];
}

const Scroll_container: React.FC<ScrollContainerProps> = ({ products }) => {
  if (!products || products.length === 0) return null;

  return (
    <div className="flow-scroll-container" style={{ padding: "20px" }}>
      <Swiper
        modules={[FreeMode, Scrollbar]}
        slidesPerView={"auto"}
        freeMode={false}
        centeredSlides={true}
        centeredSlidesBounds={true}
        slideToClickedSlide={true}
        grabCursor={true}
        scrollbar={{ draggable: true, hide: false }}
        // ALAPBEÁLLÍTÁS (Mobil: 0px+)
        spaceBetween={10}
        slidesOffsetBefore={20}
        slidesOffsetAfter={20}
        // BREAKPOINT (Asztali gép: 1024px+)
        breakpoints={{
          1024: {
            spaceBetween: 110,
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0,
          },
        }}
      >
        {products.map((product: Product) => (
          <SwiperSlide
            key={product.id}
            style={{ width: "auto" }} // Hogy a Product_show mérete érvényesüljön
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
