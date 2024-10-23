import { Container, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const IconBoxOne = () => {
  const { t } = useTranslation();
  return (
    <div
      className="icon-box-area space-pt--r100"
      style={{ background: "#f5f5f5" }}
    >
      <Container>
        <div className="section-title section-title--style-three text-center space-mb--40">
          <h2>{t("home.features.title")}</h2>
        </div>
        <Row className="gx-lg-4">
          <Col
            md={6}
            lg={3}
            className="d-flex justify-content-center d-lg-block"
          >
            <div className="icon-box icon-box--style1">
              <div className="icon-box__icon">
                {/* <i className="flaticon-shipped" /> */}
                <img
                  src="/img/home/Asset 25@4x-8.png"
                  alt="Easy Care & Maintenance"
                />
              </div>
              <div className="icon-box__content">
                <h5>{t("home.features.box1.title")}</h5>
                <p>{t("home.features.box1.text")}</p>
              </div>
            </div>
          </Col>
          <Col
            md={6}
            lg={3}
            className="d-flex justify-content-center d-lg-block"
          >
            <div className="icon-box icon-box--style1">
              <div className="icon-box__icon">
                {/* <i className="flaticon-money-back" /> */}
                <img
                  src="/img/home/Asset 28@4x-8.png"
                  alt="Easy Care & Maintenance"
                />
              </div>
              <div className="icon-box__content">
                <h5>{t("home.features.box2.title")}</h5>
                <p>{t("home.features.box2.text")}</p>
              </div>
            </div>
          </Col>
          <Col
            md={6}
            lg={3}
            className="d-flex justify-content-center d-lg-block"
          >
            <div className="icon-box icon-box--style1">
              <div className="icon-box__icon">
                {/* <i className="flaticon-support" /> */}
                <img
                  src="/img/home/Asset 24@4x-8.png"
                  alt="Easy Care & Maintenance"
                />
              </div>
              <div className="icon-box__content">
                <h5>{t("home.features.box3.title")}</h5>
                <p>{t("home.features.box3.text")}</p>
              </div>
            </div>
          </Col>
          <Col
            md={6}
            lg={3}
            className="d-flex justify-content-center d-lg-block"
          >
            <div className="icon-box icon-box--style1 end">
              <div className="icon-box__icon">
                {/* <i className="flaticon-support" /> */}
                <img
                  src="/img/home/Asset 21@4x-8.png"
                  alt="Easy Care & Maintenance"
                />
              </div>
              <div className="icon-box__content">
                <h5>{t("home.features.box4.title")}</h5>
                <p>{t("home.features.box4.text")}</p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default IconBoxOne;
