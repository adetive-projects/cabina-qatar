import Link from "next/link";
import { LayoutOne } from "../layouts";
import { BreadcrumbOne } from "../components/Breadcrumb";
import { Container, Row, Col } from "react-bootstrap";

import { useEffect, useState } from "react";
import { apiUrl } from "../data/api/api";
import cogoToast from "@hasanm95/cogo-toast";
import { useTranslation } from "react-i18next";

const TrackYourOrder = () => {
  const [trackId, setTrackId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [OrderDetails, setOrderDetails] = useState(null);
  const { t } = useTranslation();

  const handleChange = (e) => {
    setTrackId(e.target.value);
  };

  const handleSubmitOrderTracking = async (e) => {
    e.preventDefault();

    if (trackId !== "") {
      try {
        setIsLoading(true);
        setOrderDetails(null);
        const response = await fetch(`${apiUrl}/order-track/${trackId}`);

        const data = await response.json();
        if (data.success) {
          setOrderDetails(data.data);
        } else {
          console.log("Error:", data.message);
          cogoToast.success(data.message || "Something Went Wrong", {
            position: "bottom-left",
          });
        }
      } catch (error) {
        console.error("Error:", error.message);
        cogoToast.error("No Order Found", {
          position: "bottom-left",
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      cogoToast.error("Please Enter Your Order ID", {
        position: "bottom-left",
      });
    }
  };

  // useEffect(() => {
  //   const addGoogleTranslate = () => {
  //     const googleTranslateScript = document.createElement("script");
  //     googleTranslateScript.type = "text/javascript";
  //     googleTranslateScript.src =
  //       "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  //     document.body.appendChild(googleTranslateScript);

  //     window.googleTranslateElementInit = () => {
  //       new window.google.translate.TranslateElement(
  //         {
  //           pageLanguage: "en",
  //           includedLanguages: "en,ar",
  //           layout:
  //             window.google.translate.TranslateElement.InlineLayout.SIMPLE,
  //         },
  //         "google_translate_element"
  //       );
  //     };
  //   };

  //   addGoogleTranslate();
  // }, []);

  return (
    <LayoutOne>
      {/* <div className="flex-grow-1"> */}
      {/* breadcrumb */}
      <BreadcrumbOne pageTitle={t("track.breadcrumb.title")}>
        <ol className="breadcrumb justify-content-md-end align-items-center">
          <li className="breadcrumb-item">
            <Link href="/">{t("track.breadcrumb.link")}</Link>
          </li>
          <li className="breadcrumb-item active">
            {t("track.breadcrumb.title")}
          </li>
        </ol>
      </BreadcrumbOne>
      <div className="contact-content space-pt--r100 space-pb--r100">
        <Container>
          <div className="d-flex justify-content-center">
            <form
              className="newsletter-form-wrapper w-100"
              onSubmit={handleSubmitOrderTracking}
              style={{ maxWidth: "800px" }}
            >
              <div className="newsletter-form position-relative">
                <input
                  className="form-control rounded-0 border border-dark"
                  type="text"
                  value={trackId}
                  onChange={handleChange}
                  placeholder={t("track.form.input-placeholder")}
                />
                <button
                  className={`btn rounded-0 btn-dark h-100`}
                  type="submit"
                >
                  {isLoading ? "Loading..." : t("track.form.submit")}
                </button>
              </div>
            </form>
          </div>
          <div className="contact-content space-pt--r100 space-pb--r100">
            {OrderDetails && !isLoading && (
              <Container>
                <p className="text-end">
                  {t("track.result.order-no")} {OrderDetails?.order_no}
                </p>
                <Row className="border space-pb--20 space-pt--20 mx-0">
                  <Col md={4} lg={3} className="text-md-start">
                    <p className="fw-semibold mb-2">
                      {t("track.result.header-one")}
                    </p>
                    <p className="mb-1">{OrderDetails?.address || "-"}</p>
                  </Col>
                  <Col md={4} lg={3} className="text-md-start">
                    <p className="fw-semibold mb-2">
                      {t("track.result.header-two")}
                    </p>
                    <p className="mb-1">
                      {OrderDetails.payment_method === "cod"
                        ? "Cash On Delivery"
                        : OrderDetails?.payment_method === "credit_card"
                        ? "Credit Card"
                        : OrderDetails?.payment_method === "debit_card"
                        ? "Debit Card"
                        : "-"}
                    </p>
                  </Col>
                  <Col md={4} lg={3} className="text-md-start">
                    <p className="fw-semibold mb-2">
                      {t("track.result.header-three")}
                    </p>
                    <p className="mb-1">
                      {t("track.result.point-one")}{" "}
                      {OrderDetails?.customer_name || "-"}
                    </p>
                    <p className="mb-1">
                      {t("track.result.point-two")}{" "}
                      {OrderDetails?.customer_phone || "-"}
                    </p>
                    {/* <p className="mb-1">
                      Email: {OrderDetails?.customer_email || "-"}
                    </p> */}
                  </Col>
                  <Col md={4} lg={3} className="text-md-start">
                    <p className="fw-semibold mb-2">
                      {t("track.result.header-four")}
                    </p>
                    <p className="mb-1">
                      {t("track.result.point-three")}{" "}
                      <span className="text-capitalize">
                        {OrderDetails?.payment_status || "-"}
                      </span>
                    </p>
                    <p className="mb-1">
                      {t("track.result.point-four")}{" "}
                      <span className="text-capitalize">
                        {OrderDetails?.order_status || "-"}
                      </span>
                    </p>
                    <p className="mb-1">
                      {t("track.result.point-five")}{" "}
                      <span className="text-capitalize">
                        {OrderDetails?.order_date || "-"}
                      </span>
                    </p>
                    <p className="mb-1">
                      {t("track.result.point-six")} {OrderDetails?.total || "-"}
                    </p>
                  </Col>
                </Row>
                {/* <div className="space-pt--20 space-mt--30 ">
                  <h5 className="mb-3">Order Items: </h5>
                  {OrderDetails?.items?.map((item, index) => (
                    <Row key={index} className="mx-0 border py-3 mb-4">
                      <Col>
                        <p className="mb-1 row">
                          <span className="fw-semibold col-md-4 col-lg-3">
                            Countertop:{" "}
                          </span>
                          <span className="col-md-8 col-lg-9">
                            {item?.countertop_name || "-"}
                          </span>
                        </p>
                        <p className="mb-1 row">
                          <span className="fw-semibold col-md-4 col-lg-3">
                            Countertop Color:{" "}
                          </span>
                          <span className="col-md-8 col-lg-9">
                            {item?.countertop_color_name || "-"}
                          </span>
                        </p>
                        <p className="mb-1 row">
                          <span className="fw-semibold col-md-4 col-lg-3">
                            Storage:{" "}
                          </span>
                          <span class="col-md-8 col-lg-9">
                            {item?.storage_name || "-"}
                          </span>
                        </p>
                        <p className="mb-1 row">
                          <span className="fw-semibold col-md-4 col-lg-3">
                            Storage Color:{" "}
                          </span>
                          <span class="col-md-8 col-lg-9">
                            {item?.storage_color_name || "-"}
                          </span>
                        </p>
                        <p className="mb-1 row">
                          <span className="fw-semibold col-md-4 col-lg-3">
                            Quantity:{" "}
                          </span>
                          <span class="col-md-8 col-lg-9">
                            {item?.quantity || "-"}
                          </span>
                        </p>
                        <p className="mb-1 row">
                          <span className="fw-semibold col-md-4 col-lg-3">
                            Unit Price:{" "}
                          </span>
                          <span class="col-md-8 col-lg-9">
                            QAR {item?.unit_price || "-"}
                          </span>
                        </p>
                        <p className="mb-1 row">
                          <span className="fw-semibold col-md-4 col-lg-3">
                            Sub Total:{" "}
                          </span>
                          <span class="col-md-8 col-lg-9">
                            QAR {item?.sub_total || "-"}
                          </span>
                        </p>
                        <p className="mb-1 row">
                          <span className="fw-semibold col-md-4 col-lg-3">
                            Additional Request:{" "}
                          </span>
                          <span class="col-md-8 col-lg-9">
                            {item?.additional_request || "-"}
                          </span>
                        </p>
                      </Col>
                    </Row>
                  ))}
                </div> */}
              </Container>
            )}

            {!OrderDetails && isLoading && (
              <div className="d-flex justify-content-center">
                <div className="spinner-grow" role="status"></div>
              </div>
            )}

            {/* {!OrderDetails && !isLoading && (
              <div className="d-flex justify-content-center">
                <p>No Order Found</p>
              </div>
            )} */}
          </div>
        </Container>
      </div>
      {/* </div> */}
    </LayoutOne>
  );
};

export default TrackYourOrder;
