import { Container, Row, Col } from "react-bootstrap";
import Link from "next/link";
import { IoPlayCircleOutline } from "react-icons/io5";
import { Md3dRotation } from "react-icons/md";
import { useTranslation } from "react-i18next";

const BannerFour = () => {
  const { t } = useTranslation();
  return (
    <div
      className="banner-area space-pt--r100 space-pb--r100"
      style={{
        backgroundImage: `url('/img/home/section-bg.png')`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundSize: "cover",
      }}
    >
      <Container>
        <Row className="flex-column-reverse flex-md-row gx-lg-4">
          <Col md={6}>
            <div className="single-banner new-two">
              <div className="single-banner__image-inner">
                <img
                  src="/img/home/Asset 36@4x-8.png"
                  alt="furniture_banner1"
                />
                {/* <IoPlayCircleOutline className="play-icon" /> */}
                {/* <div className="fb-info">
                  <h5 className="single-bn-title-two">
                    CREATE-YOUR-OWN-VANITY
                  </h5>
                  <h3 className="single-bn-title">
                    With features designed for utmost convenience, Cabina
                    seamlessly integrates into any bathroom space
                  </h3>
                  <Link
                    href="/shop/grid-left-sidebar"
                    className="single-bn-link"
                  >
                    VISUALIZER
                  </Link>
                </div> */}
              </div>
            </div>
          </Col>
          {/* <Col md={6} className="mb-5">
            <div className="single-banner new">
              <div>
                <img
                  src="/assets/images/banner/furniture_banner2.jpg"
                  alt="furniture_banner1"
                /> 
                <div className="fb-info-two">
                  <div className="medium-divider clearfix"></div>
                  <h3 className="single-bn-title new">CREATE-YOUR-OWN-VANITY</h3>
                  <h4 className="single-bn-title-two new">With features designed for utmost convenience, Cabina
                  seamlessly integrates into any bathroom space</h4>
                  <Link
                    href=""
                    className="btn btn-fill-out rounded-0"
                  >
                    VISUALIZER <Md3dRotation className="ms-2" fontSize={18} />
                  </Link>
                  <div className="medium-divider clearfix"></div>
                </div>
              </div>
            </div>
          </Col> */}

          <Col md={6} className="mb-5 mb-md-0">
            <div
              style={{
                background: "#f5f5f5",
                borderRadius: "8px",
                height: "100%",
              }}
              className="d-lg-flex flex-lg-column justify-content-lg-center"
            >
              <div className="medium-divider d-none d-lg-block clearfix" />
              <div className="trending-text text-center text-md-start pt-5 pt-lg-0 ps-xl-5 home">
                <div className="heading-wrapper mb-3">
                  <h2 className="mb-3">{t("home.create-own-vanity.title")}</h2>
                  <span>{t("home.create-own-vanity.text")}</span>
                </div>
                {/* <h5 className="mb-4">Sale Get up to 50% Off</h5> */}
                <Link
                  href="/create-your-own-vanity"
                  className="btn btn-fill-out rounded-3"
                >
                  {t("home.create-own-vanity.url")}
                  {/* <Md3dRotation className="ms-2" fontSize={18} /> */}
                  <img
                    src="/img/home/G9u2px@4x-8.png"
                    alt="Easy Care & Maintenance"
                    className="ms-3"
                    style={{ width: "auto", maxHeight: "25px" }}
                  />
                </Link>
              </div>
              <div className="medium-divider clearfix" />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default BannerFour;
