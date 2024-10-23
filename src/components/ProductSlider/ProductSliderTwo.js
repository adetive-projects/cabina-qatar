import { Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getDiscountPrice } from "../../lib/product";
import Swiper, { SwiperSlide } from "../swiper";
import ProductGridTwo from "../ProductThumb/ProductGridTwo";

const ProductSliderTwo = ({ title, products, items }) => {
  const params = {
    loop: false,
    spaceBetween: 30,
    pagination: true,
    breakpoints: {
      320: {
        slidesPerView: 1
      },
      576: {
        slidesPerView: 2
      },
      768: {
        slidesPerView: 2
      },
      1024: {
        slidesPerView: items ? items : 4
      }
    }
  };
  
  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { compareItems } = useSelector((state) => state.compare);

  return (
    <div className="product-slider-area space-pt--50">
      <Row>
        <Col md={6}>
          <div className="section-title space-mb--25">
            <h2>{title}</h2>
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <div className="product-slider-wrap">
            <Swiper options={params} navClass="prod-slider-two">
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
                      bottomSpace="space-mb--30"
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ProductSliderTwo;
