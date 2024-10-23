import Link from "next/link";
import { LayoutOne } from "../layouts";
import { BreadcrumbOne } from "../components/Breadcrumb";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { useRouter } from "next/router";
import { domainUrl } from "../data/api/api";
import { use, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { deleteAllFromCart } from "../store/slices/cart-slice";

const OrderCompleted = () => {
  const router = useRouter();
  const { query } = router;
  const { order_id } = query;
  const { t } = useTranslation();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(deleteAllFromCart());
  }, []);

  const [isDownloading, setIsDownloading] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleDownloadReceipt = () => {
    if (order_id !== undefined) {
      setIsDownloading(true);
      setIsButtonDisabled(true);

      const downloadLink = document.createElement("a");
      downloadLink.href = `${domainUrl}/customer-order-details-download/${order_id}`;
      downloadLink.setAttribute("download", true);
      downloadLink.click();

      setTimeout(() => {
        setIsDownloading(false);
        setIsButtonDisabled(false);
      }, 20000);
    }
  };

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
                  <h3>{t("order-completed.text-big")}</h3>
                </div>
                <p className="space-mb--40">
                  {t("order-completed.text-small")}
                </p>
                <Link href="/shop/countertops" className="btn btn-fill-out">
                  {t("order-completed.continue-shopping")}
                </Link>
                {order_id !== undefined && (
                  <button
                    className="btn btn-fill-out"
                    onClick={handleDownloadReceipt}
                    disabled={isButtonDisabled}
                  >
                    {isDownloading ? (
                      <>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />
                        {` ${t("order-completed.download-receipt")}`}
                      </>
                    ) : (
                      t("order-completed.download-receipt")
                    )}
                  </button>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </LayoutOne>
  );
};

export default OrderCompleted;
