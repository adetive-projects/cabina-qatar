import { Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import clsx from "clsx"
import { getDiscountPrice } from "../../lib/product";
import ProductGridOne from "./ProductGridOne";

const ProductGridWrapperOne = ({ products, bottomSpace }) => {
  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { compareItems } = useSelector((state) => state.compare);

  return (
    <Row>
      {products &&
        products.map((product) => {
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
            <Col lg={3} sm={6} key={product.id}>
              <ProductGridOne
                product={product}
                discountedPrice={discountedPrice}
                productPrice={productPrice}
                cartItem={cartItem}
                wishlistItem={wishlistItem}
                compareItem={compareItem}
                bottomSpace={bottomSpace}
              />
            </Col>
          );
        })}
    </Row>
  );
};

export default ProductGridWrapperOne;
