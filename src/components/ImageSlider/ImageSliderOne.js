import { FaInstagram } from "react-icons/fa";
import Swiper, { SwiperSlide } from "../swiper";

const params = {
  loop: true,
  slidesPerView: 1,
  grabCursor: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false
  },
  breakpoints: {
    320: {
      slidesPerView: 1
    },
    576: {
      slidesPerView: 2
    },
    768: {
      slidesPerView: 4
    },
    1024: {
      slidesPerView: 6
    }
  }
};

const ImageSliderOne = ({ imageSliderData }) => {
  return (
    <div className="image-slider-area space-mb--r100 position-relative">
      <div className="follow-box">
        <FaInstagram />
        <h3>instagram</h3>
        <span>@cabina</span>
      </div>
      {!!imageSliderData?.length ? (
        <Swiper options={params}>
          {imageSliderData.map((single, key) => (
            <SwiperSlide className="item" key={key}>
              <div className="instafeed-box">
                <a href={single.url}>
                  <img src={single.image} alt="insta_image" />
                </a>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : null}
    </div>
  );
};

export default ImageSliderOne;
