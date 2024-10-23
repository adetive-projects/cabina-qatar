import { Fragment } from "react";
import Link from "next/link";
import Swiper, { SwiperSlide } from "../swiper";
import { getDiscountPrice } from "../../lib/product";
import { ProductRating } from "../Product";

const params = {
  loop: false,
  slidesPerView: 1,
  grabCursor: true,
  spaceBetween: 30,
  navigation: true
};

const ProductSliderEight = ({ title, products, navClass }) => {
  var chunkArr = [];
  while (products.length > 0) {
    var chunk = products.splice(0, 3);
    chunkArr.push(chunk);
  }

  return (
    <Fragment>
      <div className="section-title section-title--style-two heading-s1 d-flex justify-content-between align-items-center space-mb--30">
        <h4>{title}</h4>
        <Link href="/shop/grid-left-sidebar" className="text-default">
          View All
        </Link>
      </div>
      <div className="product-slider-wrap product-slider-eight">
        {!!chunkArr?.length ? (
          <Swiper options={params} navClass={navClass}>
            {chunkArr.map((chunk, key) => (
              <SwiperSlide className="product-chunk" key={key}>
                {chunk.map((product, key) => {
                  const discountedPrice = getDiscountPrice(
                    product.price,
                    product.discount
                  ).toFixed(2);
                  const productPrice = product.price.toFixed(2);
                  return (
                    <div className="widget-product" key={key}>
                      <div className="widget-product__image">
                        <Link href={"/shop/product-basic/" + product.slug}>

                          <img src={product.thumbImage[0]} alt="" />
                          <img
                            className="product-hover-image"
                            src={product.thumbImage[1]}
                            alt=""
                          />

                        </Link>
                      </div>
                      <div className="widget-product__content">
                        <h6 className="product-title">
                          <Link href={"/shop/product-basic/" + product.slug}>
                            {product.name}
                          </Link>
                        </h6>
                        <div className="product-price">
                          {product.discount ? (
                            <Fragment>
                              <span className="price">${discountedPrice}</span>
                              <del>${productPrice}</del>
                              <span className="on-sale">
                                {product.discount}% Off
                              </span>
                            </Fragment>
                          ) : (
                            <span className="price">${productPrice}</span>
                          )}
                        </div>
                        <div className="rating-wrap">
                          <ProductRating ratingValue={product.rating} />
                          <span className="rating-num">
                            ({product.ratingCount})
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </SwiperSlide>
            ))}
          </Swiper>
        ) : null}
      </div>
    </Fragment>
  );
};

export default ProductSliderEight;
