import { Row, Col } from "react-bootstrap";
import ProductSliderEight from "./ProductSliderEight";

const ProductSliderEightWrapper = ({
  featuredTitle,
  bestSellerTitle,
  saleTitle,
  featuredProducts,
  bestSellerProducts,
  saleProducts
}) => {
  return (
    <div className="product-slider-area space-pb--r70">
      <div className="custom-container">
        <Row>
          <Col lg={4}>
            {/* product slider */}
            <ProductSliderEight
              title={featuredTitle}
              products={featuredProducts}
              navClass="prod-slider-eight-1"
            />
          </Col>
          <Col lg={4}>
            {/* product slider */}
            <ProductSliderEight
              title={bestSellerTitle}
              products={bestSellerProducts}
              navClass="prod-slider-eight-2"
            />
          </Col>
          <Col lg={4}>
            {/* product slider */}
            <ProductSliderEight 
              title={saleTitle} 
              products={saleProducts} 
              navClass="prod-slider-eight-3"
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ProductSliderEightWrapper;
