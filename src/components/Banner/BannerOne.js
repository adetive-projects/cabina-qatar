import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";
import { Trans, useTranslation } from "react-i18next";

import { IoPlayCircleOutline } from "react-icons/io5";

const BannerOne = () => {
  const { t } = useTranslation();
  return (
    <div
      className="banner-area bg--blue-two space-pt--r100 space-pb--r100"
      style={{ background: "#f5f5f5" }}
    >
      <Container>
        <Row className="align-items-center flex-row-reverse trending-banner mx-0">
          <Col md={5}>
            <div className="medium-divider d-none d-md-block clearfix" />
            <div className="trending-text text-center text-md-start">
              <div className="heading-wrapper mb-3">
                <h2 className="mb-3">
                  <Trans i18nKey="home.made-in-qatar.title">
                    CABINA IS <br className="d-md-none d-lg-block" /> MADE IN
                    QATAR
                  </Trans>
                </h2>
                <span>{t("home.made-in-qatar.text")}</span>
              </div>
              {/* <h5 className="mb-4">Sale Get up to 50% Off</h5> */}
              <Link
                href="/shop/countertops"
                className="btn btn-fill-out rounded-pill"
              >
                {t("home.made-in-qatar.url")}
              </Link>
            </div>
            <div className="medium-divider clearfix" />
          </Col>
          <Col md={7} className="ps-md-0 trending-banner__image">
            <div className="text-center trending-img">
              {/* <img src="/img/home/hero-slider-one.jpg" alt="trending_img" />
              <IoPlayCircleOutline className="play-icon" /> */}

              <video width="100%" height="100%" autoPlay loop muted>
                <source
                  src="/videos/Cabina is Made in Qatar.mp4"
                  type="video/mp4"
                />
              </video>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default BannerOne;
