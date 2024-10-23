import Link from "next/link";
import { LayoutOne } from "../layouts";
// import { BreadcrumbOne } from "../components/Breadcrumb";
import { Container, Row, Col } from "react-bootstrap";
import { IoIosCheckmarkCircle } from "react-icons/io";
// import { useRouter } from "next/router";
// import { domainUrl } from "../data/api/api";

import { useTranslation } from "react-i18next";

const OrderCompleted = () => {
  // const router = useRouter();
  // const { query } = router;
  // const { order_id } = query;
  const { t } = useTranslation();

  return (
    <LayoutOne>
      {/* breadcrumb */}
      {/* <BreadcrumbOne pageTitle="Order Completed">
        <ol className="breadcrumb justify-content-md-end">
          <li className="breadcrumb-item">
            <Link href="/">
              Home
            </Link>
          </li>
          <li className="breadcrumb-item active">Order Completed</li>
        </ol>
      </BreadcrumbOne> */}
      <div className="order-content space-pt--r100 space-pb--r100">
        <Container>
          <Row className="justify-content-center">
            <Col md={8}>
              <div className="text-center order-complete">
                <IoIosCheckmarkCircle />
                <div className="heading-s1-new fw-bold space-mb--40">
                  <h3>{t("order-failed.text-big")}</h3>
                </div>
                <p className="space-mb--40">{t("order-failed.text-small")}</p>
                <Link href="/shop/countertops" className="btn btn-fill-out">
                  {t("order-completed.continue-shopping")}
                </Link>
                {/* {order_id !== undefined && (
                  <Link
                    href={`${domainUrl}/customer-order-details-download/${order_id}`}
                    className="btn btn-fill-out"
                  >
                    {t("order-completed.download-receipt")}
                  </Link>
                )} */}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </LayoutOne>
  );
};

export default OrderCompleted;
