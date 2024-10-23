import { useSelector } from "react-redux";
import Swiper, { SwiperSlide } from "../swiper";
import ProductGridTwo from "../ProductThumb/ProductGridTwo";
import { getDiscountPrice } from "../../lib/product";

const params = {
  loop: false,
  slidesPerView: 4,
  grabCursor: true,
  spaceBetween: 30,
  observer: true,
  observeParents: true,
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

const ProductSliderFive = ({ products }) => {
  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { compareItems } = useSelector((state) => state.compare);

  return (
    <div className="product-slider-wrap position-relative">
      {!!products?.length ? (
        <Swiper options={params} navClass="prod-slider-five">
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
  );
};

export default ProductSliderFive;
