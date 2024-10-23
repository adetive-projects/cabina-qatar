import Link from "next/link";
import { Row, Col } from "react-bootstrap";
import { EffectFade } from "swiper";
import Swiper, { SwiperSlide } from "../swiper";

const params = {
  effect: "fade",
  fadeEffect: {
    crossFade: true
  },
  modules: [EffectFade],
  loop: true,
  speed: 1000,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false
  },
  pagination: true
};

const HeroSliderFive = ({ heroSliderData }) => {
  return (
    <div className="hero-slider space-pb--r100 space-pt--25">
      <div className="custom-container">
        <Row>
          <Col xl={7} lg={9} className="offset-lg-3">
            <div className="hero-slider__wrapper hero-slider__wrapper--style-three mb-4 mb-xl-0">
              {!!heroSliderData?.length ? (
                <Swiper options={params} navClass="hero-slider-five">
                  {heroSliderData.map((single, key) => (
                    <SwiperSlide
                      className="hero-slider__slide bg-image"
                      style={{
                        backgroundImage: `url(${single.backgroundImage})`
                      }}
                      key={key}
                    >
                      <div className="hero-slider__content-wrapper hero-slider__content-wrapper--round-space">
                        <Col lg={8}>
                          <div className="hero-slider__content hero-slider__content--style-four overflow-hidden">
                            <h5 className="mb-3 font-weight-light sub-title">
                              {single.subtitle}
                            </h5>
                            <h2 className="space-mb--20 title">
                              {single.title}
                            </h2>
                            <Link
                              href={single.url}
                              className="btn btn-fill-out btn-radius text-uppercase slider-link">
                              
                                Shop Now
                              
                            </Link>
                          </div>
                        </Col>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : null}
            </div>
          </Col>
          <Col xl={2} lg={12}>
            <Row>
              <Col xl={12} lg={6}>
                <div className="sale-banner sale-banner--style-two px-0">
                  <Link href="/shop/grid-left-sidebar" className="hover-effect">

                    <div className="el-title text-white">
                      <h6>Tphone Collection</h6>
                      <span>25% off</span>
                    </div>
                    <div className="el-img">
                      <img
                        src="/assets/images/banner/shop_banner_img6.png"
                        alt="shop_banner_img6"
                      />
                    </div>

                  </Link>
                </div>
              </Col>
              <Col xl={12} lg={6}>
                <div className="sale-banner sale-banner--style-two bg--blue-three px-0 mb-0">
                  <Link href="/shop/grid-left-sidebar" className="hover-effect">

                    <div className="el-title-two text-white text-end w-100">
                      <h6>JAC Computer</h6>
                      <span>
                        <u>Shop Now</u>
                      </span>
                    </div>
                    <div className="el-img">
                      <img
                        src="/assets/images/banner/shop_banner_img7.png"
                        alt="shop_banner_img7"
                      />
                    </div>

                  </Link>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default HeroSliderFive;
