import { Row, Col } from "react-bootstrap";
import Link from "next/link";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import { ProductSliderTen } from "../ProductSlider";

const ProductTabThree = ({
  title,
  bannerImage,
  newProducts,
  bestSellerProducts,
  featuredProducts,
  saleProducts
}) => {
  return (
    <div className="product-tab-area space-pb--r100">
      <div className="custom-container">
        <Row>
          <Col xl={3} lg={4}>
            <div className="sale-banner px-0 mb-0 mb-3 mb-lg-0">
              <Link href="/shop/grid-left-sidebar" className="hover-effect">
                <img src={bannerImage} alt="shop_banner_img3" />
              </Link>
            </div>
          </Col>
          <Col xl={9} lg={8}>
            <Tab.Container defaultActiveKey="new">
              <div className="section-title section-title--style-two heading-s1 space-mb--30 d-flex flex-column flex-lg-row justify-content-between">
                <h4>{title}</h4>
                <Nav
                  variant="pills"
                  className="product-tab-navigation product-tab-navigation--style-two"
                >
                  <Nav.Item>
                    <Nav.Link eventKey="new">New Arrival</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="bestSellers">Best Sellers</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="featured">Featured</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="sale">Special Offer</Nav.Link>
                  </Nav.Item>
                </Nav>
              </div>
              <Tab.Content>
                <Tab.Pane eventKey="new">
                  <ProductSliderTen products={newProducts} />
                </Tab.Pane>
                <Tab.Pane eventKey="bestSellers">
                  <ProductSliderTen products={bestSellerProducts} />
                </Tab.Pane>
                <Tab.Pane eventKey="featured">
                  <ProductSliderTen products={featuredProducts} />
                </Tab.Pane>
                <Tab.Pane eventKey="sale">
                  <ProductSliderTen products={saleProducts} />
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ProductTabThree;
