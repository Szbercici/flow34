import { useRef } from "react";
import Scroll_container from "../components/Scroll_container";
import Video_default from "../assets/Video_default";
import newImg from "../assets/new.png";
import { Products } from "../components/Product_loader_api";
import InfiniteText from "../components/InfiniteText";
import "../components/Product_show.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import styles from "./Home.module.css";
import "swiper/css";
import "swiper/css/pagination";

const Home = () => {
  const { products } = Products();
  const dailyScoopSectionRef = useRef<HTMLDivElement | null>(null);

  const scrollToDailyScoopSection = () => {
    if (dailyScoopSectionRef.current) {
      dailyScoopSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      return;
    }

    window.scrollBy({ top: window.innerHeight * 10, behavior: "smooth" });
  };

  return (
    <>
      <Swiper
        autoplay={{
          delay: 8000, // 3000 ms = 3 másodpercenként vált
          disableOnInteraction: false, // Ha a felhasználó belenyúl (lapoz), utána is folytatja az automatikus pörgetést
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Navigation, Pagination]}
        className={styles.swiper}
        spaceBetween={80} // 500 helyett legyen 20
        slidesPerView={1}
      >
        <SwiperSlide className={styles.swiperSlide}>
          <Video_default />
        </SwiperSlide>

        <SwiperSlide className={styles.swiperSlide}>
          <img src={newImg} onClick={scrollToDailyScoopSection} alt="Slide 2" />
        </SwiperSlide>
      </Swiper>
      <div className="container">
        <h1>Taste the freshness</h1>
      </div>
      <Scroll_container
        products={products.filter(
          (product) => product.category === "Microdrink",
        )}
      />
      <InfiniteText />
      <div className="container">
        <h1>Drink form the flow.</h1>
      </div>
      <div ref={dailyScoopSectionRef}>
          <Scroll_container
        products={products.filter(
          (product) => product.category === "Water Bottles",
        )}
      />
      </div>
      <div className="container">
        <h1>DAILY SCOOP FLOWED IN</h1>
        <h2>Check out our new products</h2>
      </div>
      <Scroll_container
        products={products.filter(
          (product) => product.category === "Daily Scoop",
        )}
      />
    </>
  );
};

export default Home;
