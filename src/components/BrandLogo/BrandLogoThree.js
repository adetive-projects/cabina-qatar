import { Row, Col } from "react-bootstrap";
import Swiper, { SwiperSlide } from "../swiper";

const params = {
  loop: false,
  grabCursor: true,
  spaceBetween: 30,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false
  },
  navigation: true,
  breakpoints: {
    320: {
      slidesPerView: 2
    },
    576: {
      slidesPerView: 3
    },
    768: {
      slidesPerView: 5
    },
    1024: {
      slidesPerView: 6
    }
  }
};

const BrandLogoThree = ({ title, brandLogoData }) => {
  return (
    <div className="brand-logo-area space-pb--r100">
      <div className="custom-container position-relative">
        <div className="section-title section-title--style-two heading-s1 space-mb--30">
          <h4>{title}</h4>
        </div>
        <div className="header-slider-nav">
          <button
            className="swiper-button-prev ht-swiper-button-nav prev-brand-slider-three"
          >
            <i className="icon-arrow-left" />
          </button>
          <button
            className="swiper-button-next ht-swiper-button-nav next-brand-slider-three"
          >
            <i className="icon-arrow-right" />
          </button>
        </div>
        {!!brandLogoData?.length ? (
          <Swiper options={params} customNav={true} navClass="brand-slider-three">
            {brandLogoData.map((single, key) => (
              <SwiperSlide className="item" key={key}>
                <div className="cl-logo">
                  <img src={single.image} alt="cl_logo" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : null}
      </div>
    </div>
  );
};

export default BrandLogoThree;
