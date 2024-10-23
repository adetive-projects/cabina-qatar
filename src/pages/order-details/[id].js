import Link from "next/link";
import { LayoutOne } from "../../layouts";
import { BreadcrumbOne } from "../../components/Breadcrumb";
import { Container, Row, Col, Accordion } from "react-bootstrap";
import { FaRegMap, FaRegEnvelopeOpen, FaMobileAlt } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { useEffect, useState } from "react";
import { apiUrl } from "../../data/api/api";
import cogoToast from "@hasanm95/cogo-toast";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

const OrderDetails = () => {
  const [OrderDetails, setOrderDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { query } = router;
  const { id } = query;
  const { t } = useTranslation();

  const { user, orders } = useSelector((state) => state.auth);
  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) return null;

  const getSingleOrder = () => {
    setIsLoading(true);

    setOrderDetails(orders?.find(({ id: orderId }) => orderId === Number(id)));
    setIsLoading(false);
  };

  useEffect(() => {
    getSingleOrder();
  }, [id, orders]);

  return (
    <LayoutOne>
      {/* <div className="flex-grow-1"> */}
      {/* breadcrumb */}
      <BreadcrumbOne pageTitle={t("single-order.breadcrumb.title")}>
        <ol className="breadcrumb justify-content-md-end align-items-center">
          <li className="breadcrumb-item">
            <Link href="/">{t("single-order.breadcrumb.title")}</Link>
          </li>
          <li className="breadcrumb-item active">
            {t("single-order.breadcrumb.url")}
          </li>
        </ol>
      </BreadcrumbOne>
      <div className="contact-content space-pt--r100 space-pb--r100">
        {OrderDetails && !isLoading ? (
          <Container>
            <p className="text-end">
              {t("single-order.order-no")} {OrderDetails?.order_no}
            </p>
            <Row className="border space-pb--20 space-pt--20 mx-0">
              <Col md={4} lg={3} className="text-md-start">
                <p className="fw-semibold mb-2">
                  {t("single-order.header-one")}
                </p>
                <p className="mb-1">{OrderDetails?.shipping_address || "-"}</p>
              </Col>
              <Col md={4} lg={3} className="text-md-start">
                <p className="fw-semibold mb-2">
                  {t("single-order.header-two")}
                </p>
                <p className="mb-1">
                  {OrderDetails.payment_method === "cod"
                    ? t("single-order.text-two.one")
                    : OrderDetails?.payment_method === "credit_card"
                    ? t("single-order.text-two.two")
                    : OrderDetails?.payment_method === "debit_card"
                    ? t("single-order.text-two.three")
                    : "-"}
                </p>
              </Col>
              <Col md={4} lg={3} className="text-md-start">
                <p className="fw-semibold mb-2">
                  {t("single-order.header-three")}
                </p>
                <p className="mb-1">
                  {t("single-order.text-three.one")}
                  {OrderDetails?.customer_name || "-"}
                </p>
                <p className="mb-1">
                  {t("single-order.text-three.two")}
                  {OrderDetails?.customer_phone || "-"}
                </p>
                <p className="mb-1">
                  {t("single-order.text-three.three")}
                  {OrderDetails?.customer_email || "-"}
                </p>
              </Col>
              <Col md={4} lg={3} className="text-md-start">
                <p className="fw-semibold mb-2">
                  {t("single-order.header-four")}
                </p>
                <p className="mb-1">
                  {t("single-order.text-four.one")}
                  <span className="text-capitalize">
                    {OrderDetails?.payment_status || "-"}
                  </span>
                </p>
                <p className="mb-1">
                  {t("single-order.text-four.two")}
                  <span className="text-capitalize">
                    {OrderDetails?.order_status || "-"}
                  </span>
                </p>
                <p className="mb-1">
                  {t("single-order.text-four.three")}
                  <span className="text-capitalize">
                    {OrderDetails?.order_date || "-"}
                  </span>
                </p>
                <p className="mb-1">
                  {t("single-order.text-four.four")}
                  {Number(OrderDetails?.total).toLocaleString("en-US") || "-"}
                </p>
              </Col>
            </Row>
            <div className="space-pt--20 space-mt--30 ">
              <h5 className="mb-3">{t("single-order.order-items.title")}</h5>
              {OrderDetails?.items?.map((item, index) => (
                <Row key={index} className="mx-0 border py-3 mb-4">
                  <Col>
                    <p className="mb-1 row">
                      <span className="fw-semibold col-md-4 col-lg-3">
                        {t("single-order.order-items.one")}
                      </span>
                      <span className="col-md-8 col-lg-9">
                        {item?.countertop_name || "-"}
                      </span>
                    </p>
                    <p className="mb-1 row">
                      <span className="fw-semibold col-md-4 col-lg-3">
                        {t("single-order.order-items.two")}
                      </span>
                      <span className="col-md-8 col-lg-9">
                        {item?.countertop_color_name || "-"}
                      </span>
                    </p>
                    <p className="mb-1 row">
                      <span className="fw-semibold col-md-4 col-lg-3">
                        {t("single-order.order-items.three")}
                      </span>
                      <span className="col-md-8 col-lg-9">
                        {item?.storage_name || "-"}
                      </span>
                    </p>
                    <p className="mb-1 row">
                      <span className="fw-semibold col-md-4 col-lg-3">
                        {t("single-order.order-items.four")}
                      </span>
                      <span className="col-md-8 col-lg-9">
                        {item?.storage_color_name || "-"}
                      </span>
                    </p>
                    <p className="mb-1 row">
                      <span className="fw-semibold col-md-4 col-lg-3">
                        {t("single-order.order-items.five")}
                      </span>
                      <span className="col-md-8 col-lg-9">
                        {item?.quantity || "-"}
                      </span>
                    </p>
                    <p className="mb-1 row">
                      <span className="fw-semibold col-md-4 col-lg-3">
                        {t("single-order.order-items.six")}
                      </span>
                      <span className="col-md-8 col-lg-9">
                        QAR {item?.unit_price.toLocaleString("en-US") || "-"}
                      </span>
                    </p>
                    <p className="mb-1 row">
                      <span className="fw-semibold col-md-4 col-lg-3">
                        {t("single-order.order-items.seven")}
                      </span>
                      <span className="col-md-8 col-lg-9">
                        QAR {item?.sub_total.toLocaleString("en-US") || "-"}
                      </span>
                    </p>
                    <p className="mb-1 row">
                      <span className="fw-semibold col-md-4 col-lg-3">
                        {t("single-order.order-items.eight")}
                      </span>
                      <span className="col-md-8 col-lg-9">
                        {item?.additional_request || "-"}
                      </span>
                    </p>
                  </Col>
                </Row>
              ))}
            </div>
          </Container>
        ) : !OrderDetails && isLoading ? (
          <div className="spinner-grow" role="status"></div>
        ) : (
          <></>
        )}
      </div>
      {/* </div> */}
    </LayoutOne>
  );
};

export default OrderDetails;

// export async function getStaticPaths() {
//   try {
//     const res = await fetch(`${apiUrl}/orders/9`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer 79|7q2o0sdxc0yQBNkpjluHTgMe5iOhZ0Db2QHptujN15be7f68`,
//       },
//     });
//     const orders = await res.json();
//     const paths = orders?.data?.english_orders?.map((product) => ({
//       params: { id: product?.id?.toString() || "" },
//     }));

//     return {
//       paths,
//       fallback: false,
//     };
//   } catch (error) {
//     console.error("Error:", error.message);
//     return {
//       paths: [],
//       fallback: false,
//     };
//   }
// }

// export async function getStaticProps({ params }) {
//   try {
//     const res = await fetch(`${apiUrl}/orders/9`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer 79|7q2o0sdxc0yQBNkpjluHTgMe5iOhZ0Db2QHptujN15be7f68`,
//       },
//     });
//     const orders = await res.json();

//     const product = orders?.data?.english_orders?.find(
//       ({ id: orderId }) => orderId === Number(params.id)
//     );

//     return {
//       props: { product },
//     };
//   } catch (error) {
//     console.log(error);
//     return {
//       props: {},
//     };
//   }
// }
