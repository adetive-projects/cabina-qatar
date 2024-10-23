import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, FreeMode, Navigation, Thumbs } from "swiper";
import "swiper/swiper-bundle.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { apiUrl, domainUrl } from "../../data/api/api";
import { useTranslation } from "react-i18next";

const BannerTwo = () => {
  const [allcollections, setAllCollections] = useState([]);
  const [collections, setCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const swiperRef = useRef(null);
  const { i18n, t } = useTranslation();
  const currentLanguage = i18n.language;

  const thumbnailSwiperParams = {
    spaceBetween: 0,
    loop: true,
    modules: [EffectFade, Thumbs, FreeMode, Navigation],
    breakpoints: {
      768: {
        spaceBetween: 30,
        slidesPerView: 2,
      },
    },
  };

  const getCollection = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${apiUrl}/sliders`);
      const data = await response.json();
      setAllCollections(data.data);
      setCollections(
        currentLanguage === "ar"
          ? data.data.arabic_sliders
          : data.data.english_sliders
      );
    } catch (error) {
      console.error("Error:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCollection();
  }, []);

  useEffect(() => {
    setCollections(
      currentLanguage === "ar"
        ? allcollections.arabic_sliders
        : allcollections.english_sliders
    );
  }, [currentLanguage, allcollections]);

  return (
    <div
      className="banner-area space-pt--r100 space-pb--r100"
      style={{ background: "#f5f5f5" }}
    >
      <Container>
        <div className="section-title section-title--style-three text-center space-mb--40">
          <h2>{t("home.collection.title")}</h2>
        </div>

        <div className="position-relative px-4 px-md-0">
          <Swiper
            {...thumbnailSwiperParams}
            navigation={false}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            className="collection-swiper__wrapper"
          >
            {collections?.length > 0 &&
              !isLoading &&
              collections.map((collection, index) => (
                <SwiperSlide key={index}>
                  <div className="single-banner">
                    <img
                      src={`${domainUrl}/${collection.image}`}
                      alt="shop_banner_img1"
                    />
                    <div className="single-banner__info">
                      <Link
                        className="collection-link"
                        href={`${collection.url.split(".com").pop()}`}
                      >
                        <h3 className="title">{collection.name}</h3>
                      </Link>
                    </div>
                  </div>
                </SwiperSlide>
              ))}

            {isLoading && (
              <div className="d=flex align-items-center justify-content-center">
                <div className="spinner-border" role="status"></div>
              </div>
            )}
          </Swiper>

          <div className="collection-swiper__button">
            <IoIosArrowBack
              className="collection-swiper__button-back"
              onClick={() => swiperRef.current?.slidePrev()}
            />
            <IoIosArrowForward
              className="collection-swiper__button-forward"
              onClick={() => swiperRef.current?.slideNext()}
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default BannerTwo;
