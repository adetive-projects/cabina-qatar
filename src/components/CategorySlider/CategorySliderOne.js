import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";
import Swiper, { SwiperSlide } from "../swiper";

const params = {
  loop: false,
  slidesPerView: 2,
  grabCursor: true,
  spaceBetween: 30,
  navigation: true,
  breakpoints: {
    320: {
      slidesPerView: 2
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

const CategorySliderOne = ({ title, text, url, categorySliderData }) => {
  return (
    <div className="category-slider-area space-pb--r100">
      <Container>
        <div className="category-overlap">
          <Row className="align-items-center">
            <Col lg={3} md={4}>
              <div className="text-center text-md-start mb-4 mb-md-0">
                <h4>{title}</h4>
                <p className="mb-2">{text}</p>
                <Link href={url} className="btn btn-line-fill btn-sm">
                  View All
                </Link>
              </div>
            </Col>
            <Col lg={9} md={8}>
              {!!categorySliderData?.length ? (
                <Swiper options={params} customNav={true} navClass="category-slider-one">
                  {categorySliderData.map((single, key) => (
                    <SwiperSlide className="item" key={key}>
                      <div className="categories-box">
                        <Link href={single.url}>

                          <i className={single.iconClass} />
                          <span>{single.title}</span>

                        </Link>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : null}
              <div className="slider-nav-wrapper">
                <button
                  className="swiper-button-prev ht-swiper-button-nav prev-category-slider-one"
                >
                  <i className="icon-arrow-left" />
                </button>
                <button
                  className="swiper-button-next ht-swiper-button-nav next-category-slider-one"
                >
                  <i className="icon-arrow-right" />
                </button>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default CategorySliderOne;
