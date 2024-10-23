import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";
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
  navigation: true
};

const HeroSliderFour = ({ heroSliderData }) => {
  return (
    <div className="hero-slider">
      <div className="hero-slider__wrapper hero-slider__wrapper--style-two">
        {!!heroSliderData?.length ? (
          <Swiper options={params} navClass="hero-slider-four">
            {heroSliderData.map((single, key) => (
              <SwiperSlide
                className="hero-slider__slide hero-slider__slide--style-three bg-image overlay-bg--40"
                style={{
                  backgroundImage: `url(${single.backgroundImage})`
                }}
                key={key}
              >
                <div className="hero-slider__content-wrapper hero-slider__content-wrapper--round-space">
                  <Container>
                    <Row className="justify-content-center">
                      <Col lg={7}>
                        <div className="hero-slider__content hero-slider__content--style-three overflow-hidden text-center">
                          <h5 className="mb-3 font-weight-light bg-strip sub-title">
                            {single.subtitle}
                          </h5>
                          <h2 className="space-mb--20 title">
                            {single.title}
                          </h2>
                          <p className="text">{single.text}</p>
                          <Link href={single.url} className="btn btn-white slider-link">
                            
                              Shop Now
                            
                          </Link>
                        </div>
                      </Col>
                    </Row>
                  </Container>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : null}
      </div>
    </div>
  );
};

export default HeroSliderFour;
