import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import Swiper, { SwiperSlide } from "../swiper";
import ProductGridTwo from "../ProductThumb/ProductGridTwo";
import { getDiscountPrice } from "../../lib/product";

const params = {
  loop: false,
  slidesPerView: 4,
  grabCursor: true,
  spaceBetween: 30,
  navigation: true,
  breakpoints: {
    320: {
      slidesPerView: 1
    },
    576: {
      slidesPerView: 2
    },
    768: {
      slidesPerView: 3
    },
    1024: {
      slidesPerView: 4
    }
  }
};

const ProductSliderOne = ({ title, products }) => {
  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { compareItems } = useSelector((state) => state.compare);

  return (
    <div className="product-slider-area position-relative space-pt--r100 space-pb--r100">
      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <div className="section-title text-center space-mb--25">
              <h2>{title}</h2>
            </div>
          </Col>
        </Row>
        <div className="product-slider-wrap">
          {!!products?.length ? (
            <Swiper options={params} navClass="prod-slider-one">
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
                      <ProductGridTwo
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
        </div>
      </Container>
    </div>
  );
};

export default ProductSliderOne;
