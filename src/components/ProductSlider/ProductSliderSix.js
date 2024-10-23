import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io"
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

const ProductSliderSix = ({ title, products }) => {
  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { compareItems } = useSelector((state) => state.compare);

  return (
    <div className="product-slider-area space-pb--r100">
      <Container>
        <div className="section-title section-title--style-three position-relative text-center space-mb--40">
          <h2>{title}</h2>
          <div className="header-slider-nav header-slider-nav--style-two">
            <button
              className="swiper-button-prev ht-swiper-button-nav prev-prod-slider-six"
            >
              <IoIosArrowRoundBack />
            </button>
            <button
              className="swiper-button-next ht-swiper-button-nav next-prod-slider-six"
            >
              <IoIosArrowRoundForward />
            </button>
          </div>
        </div>
        <div className="product-slider-wrap">
          {!!products?.length ? (
            <Swiper options={params} customNav={true} navClass="prod-slider-six">
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
        </div>
      </Container>
    </div>
  );
};

export default ProductSliderSix;
