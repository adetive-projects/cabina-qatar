import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";
import Swiper, { SwiperSlide } from "../swiper";

const params = {
  loop: false,
  slidesPerView: 2,
  grabCursor: true,
  spaceBetween: 30,
  breakpoints: {
    576: {
      slidesPerView: 3
    },
    768: {
      slidesPerView: 5
    },
    1024: {
      slidesPerView: 7
    }
  }
};

const CategorySliderTwo = ({ categorySliderData }) => {
  return (
    <div className="category-slider-area space-pb--r100">
      <Container>
        <Row className="justify-content-center">
          <Col lg={6} md={8}>
            <div className="section-title text-center space-mb--25">
              <h2>Top Categories</h2>
            </div>
            <p className="leads text-center">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore.
            </p>
          </Col>
        </Row>
        {!!categorySliderData?.length ? (
          <Swiper options={params}>
            {categorySliderData.map((single, key) => (
              <SwiperSlide className="item" key={key}>
                <div className="categories-box categories-box--style-two">
                  <Link href={single.url}>
                    <img src={single.image} alt="" />
                    <span>{single.title}</span>
                  </Link>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : null}
      </Container>
    </div>
  );
};

export default CategorySliderTwo;
