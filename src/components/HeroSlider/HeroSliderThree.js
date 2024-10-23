import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";
import { EffectFade } from "swiper";
import Swiper, { SwiperSlide } from "../swiper";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { domainUrl } from "../../data/api/api";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const params = {
  effect: "fade",
  fadeEffect: {
    crossFade: true,
  },
  modules: [EffectFade],
  loop: true,
  speed: 1000,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  pagination: true,
};

const HeroSliderThree = ({ heroSliderData }) => {
  const { t } = useTranslation();
  return (
    <div
      className="hero-slider__bg"
      style={{
        backgroundImage: `url(img/home/Hero-bg.png)`,
        backgroundSize: "contain",
        backgroundPosition: "bottom center",
      }}
    >
      <Container className="space-pb--r100">
        <div className="hero-slider">
          <div className="hero-slider__wrapper hero-slider__wrapper--style-two rounded">
            {!!heroSliderData?.length ? (
              <Swiper options={params} navClass="hero-slider-three">
                {heroSliderData.map((single, key) => (
                  <SwiperSlide
                    className="hero-slider__slide hero-slider__slide--style-two bg-image"
                    style={{
                      backgroundImage: `url(${domainUrl}/${single.image})`,
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                    }}
                    key={key}
                  >
                    <div className="hero-slider__content-wrapper hero-slider__content-wrapper--round-space">
                      <Container>
                        <Row>
                          <Col lg={6}>
                            <div className="hero-slider__content hero-slider__content--style-two overflow-hidden">
                              {/* <h5 className="mb-3 font-weight-light sub-title">
                                {single.subtitle}
                              </h5> */}
                              <h2 className="space-mb--20 title">
                                {single.title}
                              </h2>
                              <p className="text">{single.details}</p>
                              <Link
                                href={`${single.url.split(".com").pop()}`}
                                className="btn btn-line-fill btn-radius staggered-animation text-uppercase slider-link"
                              >
                                {t("home.hero.button")}
                              </Link>
                            </div>
                          </Col>
                          <div className="hero-slider__newSocial home">
                            <div className="d-flex flex-column gap-1 gap-lg-2 inner-home-slider">
                              <Link href="https://www.instagram.com/cabina.qatar/">
                                <FaInstagram size={20} />
                              </Link>
                              <Link href="https://www.facebook.com/people/CabinaQatar/61566948988556/?sk=about">
                                <FaFacebook size={20} />
                              </Link>
                            </div>
                          </div>
                        </Row>
                      </Container>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : null}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default HeroSliderThree;
