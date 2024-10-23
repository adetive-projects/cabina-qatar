import Link from "next/link";
import { LayoutOne } from "../layouts";
import { BreadcrumbOne } from "../components/Breadcrumb";
import { Container, Row, Col } from "react-bootstrap";
import { IoIosSearch } from "react-icons/io";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const NotFound = () => {
  const { t } = useTranslation();
  return (
    <LayoutOne>
      {/* breadcrumb */}
      {/* <BreadcrumbOne pageTitle="Not Found">
        <ol className="breadcrumb justify-content-md-end">
          <li className="breadcrumb-item">
            <Link href="/">Home</Link>
          </li>
          <li className="breadcrumb-item active">Not Found</li>
        </ol>
      </BreadcrumbOne> */}
      <div className="not-found-content space-pt--r100 space-pb--r100">
        <Container>
          <Row className="align-items-center justify-content-center">
            <Col lg={6} md={10}>
              <div className="text-center">
                <div className="error-txt">404</div>
                <h5 className="mb-2 mb-sm-3">{t("404.text-big")}</h5>
                <p>{t("404.text-small")}</p>
                {/* <div className="search-form pb-3 pb-md-4">
                  <form method="post">
                    <input
                      name="text"
                      id="text"
                      type="text"
                      placeholder="Search"
                      className="form-control"
                    />
                    <button type="submit" className="btn icon-search">
                      <IoIosSearch />
                    </button>
                  </form>
                </div> */}
                <Link href="/" className="btn btn-fill-out">
                  {t("404.button")}
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </LayoutOne>
  );
};

export default NotFound;
