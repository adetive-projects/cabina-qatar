import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import Swiper, { SwiperSlide } from "../swiper";
import ProductGridThree from "../ProductThumb/ProductGridThree";
import { getDiscountPrice } from "../../lib/product";

const params = {
  loop: false,
  slidesPerView: 4,
  grabCursor: true,
  spaceBetween: 30,
  navigation: true,
  breakpoints: {
    1024: {
      slidesPerView: 4
    },
    769: {
      slidesPerView: 3
    },
    576: {
      slidesPerView: 2
    },
    320: {
      slidesPerView: 1
    }
  }
};

const ProductSliderSeven = ({ title, text, products }) => {
  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { compareItems } = useSelector((state) => state.compare);

  return (
    <div className="product-slider-area space-pb--r100">
      <Container>
        <Row className="justify-content-center">
          <Col lg={6} md={8}>
            <div className="section-title text-center space-mb--25">
              <h2>{title}</h2>
            </div>
            <p className="leads text-center">{text}</p>
          </Col>
        </Row>
        <div className="product-slider-wrap position-relative">
          {!!products?.length ? (
            <Swiper options={params} customNav={true} navClass="prod-slider-seven">
              {products.map((product) => {
                const discountedPrice = getDiscountPrice(
                  product.price,
                  product.discount
                ).toFixed(2);
                const productPrice = product.price.toFixed(2);
                const cartItem = cartItems.find(
                  (cartItem) => cartItem.id === product.id
                );
                const wishlistItem = wishlistItems.find(
                  (wishlistItem) => wishlistItem.id === product.id
                );
                const compareItem = compareItems.find(
                  (compareItem) => compareItem.id === product.id
                );

                return (
                  <SwiperSlide key={product.id}>
                    <ProductGridThree
                      product={product}
                      discountedPrice={discountedPrice}
                      productPrice={productPrice}
                      cartItem={cartItem}
                      wishlistItem={wishlistItem}
                      compareItem={compareItem}
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          ) : null}
          <div className="slider-nav-wrapper">
            <button
              className="swiper-button-prev ht-swiper-button-nav ht-swiper-button-nav--style-two prev-prod-slider-seven"
            >
              <i className="icon-arrow-left" />
            </button>
            <button
              className="swiper-button-next ht-swiper-button-nav ht-swiper-button-nav--style-two next-prod-slider-seven"
            >
              <i className="icon-arrow-right" />
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ProductSliderSeven;
