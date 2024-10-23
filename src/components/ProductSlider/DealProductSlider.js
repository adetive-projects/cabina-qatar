import { Fragment } from "react";
import Link from "next/link";
import { Countdown } from "../Countdown";
import Swiper, { SwiperSlide } from "../swiper";
import { getDiscountPrice } from "../../lib/product";

const params = {
  loop: false,
  slidesPerView: 1,
  grabCursor: true,
  spaceBetween: 30,
  navigation: true,
  breakpoints: {
    320: {
      slidesPerView: 1
    },
    768: {
      slidesPerView: 2
    }
  }
};

const DealProductSlider = ({ title, products }) => {
  return (
    <div className="deal-product-area  space-pb--r100">
      <div className="custom-container">
        <div className="position-relative">
          <div className="section-title section-title--style-two heading-s1 space-mb--30">
            <h4>{title}</h4>
          </div>
          <div className="header-slider-nav">
            <button
              className="swiper-button-prev ht-swiper-button-nav prev-deal-slider"
            >
              <i className="icon-arrow-left" />
            </button>
            <button
              className="swiper-button-next ht-swiper-button-nav next-deal-slider"
            >
              <i className="icon-arrow-right" />
            </button>
          </div>
        </div>
        <div className="deal-product-wrapper">
          {!!products?.length ? (
            <Swiper options={params} customNav={true} navClass="deal-slider">
              {products.map((product, key) => {
                  const discountedPrice = getDiscountPrice(
                    product.price,
                    product.discount
                  ).toFixed(2);
                  const productPrice = product.price.toFixed(2);
                  return (
                    <SwiperSlide className="deal-product" key={key}>
                      <div className="deal-product__image">
                        <Link href={"/shop/product-basic/" + product.slug}>
                          <img
                            src={product.thumbImage[0]}
                            alt="product_img1"
                          />
                        </Link>
                      </div>
                      <div className="deal-product__info">
                        <h5 className="product-title">
                          <Link href={"/shop/product-basic/" + product.slug}>
                            {product.name}
                          </Link>
                        </h5>
                        <div className="product-price">
                          {product.discount ? (
                            <Fragment>
                              <span className="price">
                                ${discountedPrice}
                              </span>
                              <del>${productPrice}</del>
                            </Fragment>
                          ) : (
                            <span className="price">${productPrice}</span>
                          )}
                        </div>
                        <Countdown
                          date={product.dealEnd}
                          className="countdown-two countdown-two--style-two space-mt--20"
                        />
                      </div>
                    </SwiperSlide>
                  );
                })}
            </Swiper>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default DealProductSlider;
