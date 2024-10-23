import { Fragment, useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { EffectFade, Thumbs, FreeMode, Navigation } from "swiper";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Swiper, { SwiperSlide } from "../swiper";
import { domainUrl } from "../../data/api/api";
import { useRef } from "react";
import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoMdArrowDropleftCircle,
  IoMdArrowDroprightCircle,
} from "react-icons/io";
import "swiper/css/navigation";

const ImageGalleryLeftThumb = ({ product }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [index, setIndex] = useState(-1);

  const swiperRef = useRef(null);
  const productImageArray = [
    `${domainUrl}/${product.main_image}`,
    `${domainUrl}/${product.sub_image}`,
  ];
  if (product.gallery_images && product.gallery_images.length > 0) {
    productImageArray.push(
      ...product.gallery_images.map((img) => `${domainUrl}/${img}`)
    );
  }

  const slides = productImageArray?.map((img, i) => ({
    src: img,
    key: i,
  }));

  // swiper slider settings
  const gallerySwiperParams = {
    spaceBetween: 10,
    loop: true,
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },

    thumbs: { swiper: thumbsSwiper },
    modules: [EffectFade, Thumbs, FreeMode, Navigation],
    onSwiper: (swiper) => {
      swiperRef.current = swiper; // save swiper instance to ref
    },
  };

  const thumbnailSwiperParams = {
    onSwiper: setThumbsSwiper,
    spaceBetween: 10,
    slidesPerView: 5,
    touchRatio: 0.2,
    loop: true,
    slideToClickedSlide: true,
    freeMode: true,
    watchSlidesProgress: true,
    direction: "vertical",
    breakpoints: {
      320: {
        slidesPerView: 4,
        direction: "horizontal",
      },
      640: {
        slidesPerView: 4,
        direction: "horizontal",
      },
      768: {
        slidesPerView: 4,
        direction: "horizontal",
      },
      992: {
        slidesPerView: 4,
        direction: "horizontal",
      },
      1200: {
        slidesPerView: 5,
        direction: "vertical",
      },
    },
  };

  const [transformOrigin, setTransformOrigin] = useState("center center");

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setTransformOrigin(`${x}% ${y}%`);
  };

  return (
    <Fragment>
      <Row className="image-gallery-side-thumb-wrapper">
        <Col xl={10} className="order-1 order-xl-2">
          <div className="product-large-image-wrapper">
            {!!productImageArray.length && (
              <Swiper options={gallerySwiperParams} navigation={true}>
                {productImageArray.map((image, i) => (
                  <SwiperSlide key={i}>
                    {/* <button
                      className="enlarge-icon"
                      onClick={() => setIndex(i)}
                    >
                      <i className="icon-magnifier-add" />
                    </button> */}
                    <div className="single-image h-100 ratio ratio-1x1">
                      <img
                        src={image}
                        className="img-fluid zoom"
                        alt=""
                        style={{
                          transformOrigin: transformOrigin,
                        }}
                        onMouseMove={handleMouseMove}
                      />
                    </div>
                  </SwiperSlide>
                ))}
                <div
                  className="own-swiper-left-button"
                  onClick={() => swiperRef.current?.slidePrev()}
                >
                  <IoIosArrowBack size={50} />
                </div>
                <div
                  className="own-swiper-right-button"
                  onClick={() => swiperRef.current?.slideNext()}
                >
                  <IoIosArrowForward size={50} type="button" />
                </div>
              </Swiper>
            )}
            <Lightbox
              open={index >= 0}
              index={index}
              close={() => setIndex(-1)}
              slides={slides}
              plugins={[Thumbnails, Zoom, Fullscreen]}
            />
          </div>
        </Col>
        <Col xl={2} className="order-2 order-xl-1">
          <div className="product-small-image-wrapper product-small-image-wrapper--side-thumb">
            {!!productImageArray.length && (
              <Swiper options={thumbnailSwiperParams}>
                {productImageArray.map((image, i) => (
                  <SwiperSlide key={i}>
                    <div className="single-image">
                      <img src={image} className="img-fluid" alt="" />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>
        </Col>
      </Row>
    </Fragment>
  );
};

export default ImageGalleryLeftThumb;
