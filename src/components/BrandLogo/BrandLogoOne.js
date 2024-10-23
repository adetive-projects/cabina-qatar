import { Container, Row, Col } from "react-bootstrap";
import Swiper, { SwiperSlide } from "../swiper";

const params = {
  loop: false,
  slidesPerView: 5,
  grabCursor: true,
  spaceBetween: 30,
  navigation: true,
  breakpoints: {
    320: {
      slidesPerView: 2
    },
    576: {
      slidesPerView: 3
    },
    768: {
      slidesPerView: 4
    },
    1024: {
      slidesPerView: 5
    }
  }
};

const BrandLogoOne = ({ title, brandLogoData }) => {
  return (
    <div className="brand-logo-area position-relative space-pb--r100">
      <Container className="position-relative">
        <div className="section-title section-title--style-two space-mb--25">
          <h2>{title}</h2>
        </div>
        <div className="header-slider-nav">
          <button className="swiper-button-prev ht-swiper-button-nav prev-brand-slider-one">
            <i className="icon-arrow-left" />
          </button>
          <button className="swiper-button-next ht-swiper-button-nav next-brand-slider-one">
            <i className="icon-arrow-right" />
          </button>
        </div>
        {!!brandLogoData?.length ? (
          <Swiper options={params} customNav={true} navClass="brand-slider-one">
            {brandLogoData.map((single, key) => (
              <SwiperSlide className="item" key={key}>
                <div className="cl-logo">
                  <img src={single.image} alt="cl_logo" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : null}
      </Container>
    </div>
  );
};

export default BrandLogoOne;
