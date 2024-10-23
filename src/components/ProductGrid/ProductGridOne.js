import { Container } from "react-bootstrap";
import { ProductGridWrapperFour } from "../ProductThumb";

const ProductGridOne = ({ title, products }) => {
  return (
    <div className="product-grid-area space-pb--r70">
      <Container>
        <div className="section-title section-title--style-three text-center space-mb--40">
          <h2>{title}</h2>
        </div>
        <ProductGridWrapperFour
          products={products}
          bottomSpace="space-mb--30"
        />
      </Container>
    </div>
  );
};

export default ProductGridOne;
