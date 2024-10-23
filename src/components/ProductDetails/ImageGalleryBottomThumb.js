import { Fragment, useState } from "react";
import { EffectFade, Thumbs, FreeMode } from 'swiper';
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Swiper, { SwiperSlide } from "../swiper";

const ImageGalleryBottomThumb = ({ product }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [index, setIndex] = useState(-1);

  const slides = product?.image.map((img, i) => ({
    src: img,
    key: i,
  }));

  // swiper slider settings
  const gallerySwiperParams = {
    spaceBetween: 10,
    loop: true,
    effect: "fade",
    fadeEffect: {
      crossFade: true
    },
    thumbs: { swiper: thumbsSwiper },
    modules: [EffectFade, Thumbs, FreeMode],
  };

  const thumbnailSwiperParams = {
    onSwiper: setThumbsSwiper,
    spaceBetween: 10,
    slidesPerView: 4,
    touchRatio: 0.2,
    loop: true,
    slideToClickedSlide: true,
    freeMode: true,
    watchSlidesProgress: true
  };

  return (
    <Fragment>
      <div className="product-large-image-wrapper">
        {!!product.image.length && (
          <Swiper options={gallerySwiperParams}>
              {product.image.map((image, i) => (
                <SwiperSlide key={i}>
                  <button className="enlarge-icon" onClick={() => setIndex(key)}>
                    <i className="icon-magnifier-add" />
                  </button>
                  <div className="single-image">
                    <img src={image} className="img-fluid" alt="" />
                  </div>
                </SwiperSlide>
              ))}
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
      <div className="product-small-image-wrapper">
        {!!product.image.length && (
          <Swiper options={thumbnailSwiperParams}>
            {product.image.map((image, i) => (
              <SwiperSlide key={i}>
                <div className="single-image">
                  <img src={image} className="img-fluid" alt="" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </Fragment>
  );
};

export default ImageGalleryBottomThumb;
