import { Fragment } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Link from "next/link";
import Swiper, { SwiperSlide } from "../swiper";
import { getDiscountPrice } from "../../lib/product";
import { ProductRating } from "../../components/Product";

const params = {
  loop: false,
  slidesPerView: 3,
  grabCursor: true,
  spaceBetween: 30,
  navigation: true,
  breakpoints: {
    320: {
      slidesPerView: 1
    },
    576: {
      slidesPerView: 1
    },
    768: {
      slidesPerView: 2
    },
    1024: {
      slidesPerView: 3
    }
  }
};

const ProductSliderFour = ({ title, products }) => {
  var chunkArr = [];
  while (products.length > 0) {
    var chunk = products.splice(0, 3);
    chunkArr.push(chunk);
  }

  return (
    <div className="product-slider-area space-pb--r70">
      <Container>
        <div className="section-title section-title--style-two space-mb--25">
          <h2>{title}</h2>
        </div>
        <div className="product-slider-wrap product-slider-wrap--style-two">
          {!!chunkArr?.length ? (
            <Swiper options={params} navClass="prod-slider-four">
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
                                <span className="price">
                                  ${discountedPrice}
                                </span>
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
      </Container>
    </div>
  );
};

export default ProductSliderFour;
