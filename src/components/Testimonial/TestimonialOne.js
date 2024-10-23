import { Container, Row, Col } from "react-bootstrap";
import Swiper, { SwiperSlide } from "../swiper";

const params = {
  loop: true,
  slidesPerView: 1,
  spaceBetween: 60,
  navigation: true
};

const TestimonialOne = ({ testimonialData }) => {
  return (
    // <div className="testimonial-area bg--redon space-pt--r100 space-pb--r100 space-mb--r100">
    <div className="testimonial-area bg--redon space-pt--r100 space-pb--r100">
      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <div className="section-title text-center space-mb--25">
              <h2>Our Client Say!</h2>
            </div>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col lg={9}>
            <div className="testimonial-wrap">
              {!!testimonialData?.length ? (
                <Swiper options={params} navClass="testimonial-one">
                  {testimonialData.map((single, key) => (
                    <SwiperSlide className="testimonial-box text-center" key={key}>
                      <div className="testimonial-desc space-mb--25">
                        <p>{single.content}</p>
                      </div>
                      {/* <div className="author-wrap text-start">
                        <div className="author-img">
                          <img src={single.image} alt="user_img1" />
                        </div>
                        <div className="author-name">
                          <h6>{single.name}</h6>
                          <span>{single.designation}</span>
                        </div>
                      </div> */}
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : null}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TestimonialOne;
