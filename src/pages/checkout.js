import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getDiscountPrice } from "../lib/product";
import { IoMdArrowForward, IoMdCash } from "react-icons/io";
import { LayoutOne } from "../layouts";
import { BreadcrumbOne } from "../components/Breadcrumb";
import { useEffect, useState } from "react";
import cogoToast from "@hasanm95/cogo-toast";
import { apiUrl } from "../data/api/api";
import { useRouter } from "next/router";
import { deleteAllFromCart } from "../store/slices/cart-slice";
import { FaPlus } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const Checkout = () => {
  const { cartItems, totalAmount } = useSelector((state) => state.cart);
  let cartTotalPrice = 0;
  const { t, i18n } = useTranslation();
  const defaultLanguage = i18n.language;

  const { user } = useSelector((state) => state.auth);
  const router = useRouter();
  const [isAddressNew, setIsAddressNew] = useState(false);
  const [currentData, seteCurrentData] = useState([]);

  const [customerDetails, setCustomerDetails] = useState({
    customer_name: user && user.name ? user.name : "",
    customer_phone: user && user.phone ? user.phone : "",
    customer_email: user && user.email ? user.email : "",
    customer_address: user && user.address ? user.address : "",
    additional_request: "",
    payment_method: "online_payment",
  });

  const dispatch = useDispatch();
  const handleCustomerDetailsChange = (e) => {
    setCustomerDetails({ ...customerDetails, [e.target.name]: e.target.value });
  };

  const handleCheckOut = async (e) => {
    e.preventDefault();
    if (customerDetails.customer_phone.length !== 8) {
      return cogoToast.error("Please Enter Qatar Based Mobile Number", {
        position: "bottom-left",
      });
    }
    if (customerDetails.customer_name && customerDetails.customer_address) {
      const requestData = {
        customer_name: customerDetails.customer_name,
        customer_phone: "+974" + customerDetails.customer_phone,
        customer_email: customerDetails.customer_email,
        customer_address: customerDetails.customer_address,
        user_id: user && user.id ? user.id : "",
        total: totalAmount,
        payment_method: customerDetails.payment_method,

        countertop_id: cartItems.map((item) => item.english.countertop_id),
        storage_id: cartItems.map((item) =>
          item.english.storage_id === "no" ? "" : item.english.storage_id
        ),
        quantity: cartItems.map((item) => item.quantity),

        countertop_color_id: cartItems.map(
          (item) => item.english.countertop_color_id
        ),
        storage_color_id: cartItems.map((item) =>
          item.english.wooden_storage_color_id
            ? item.english.wooden_storage_color_id
            : ""
        ),

        unit_price: cartItems.map((item) => item.unit_price),

        additional_request: customerDetails.additional_request,
      };

      console.log(requestData);

      try {
        const response = await fetch(`${apiUrl}/order`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        });

        const data = await response.json();

        if (data.success) {
          if (customerDetails.payment_method === "online_payment") {
            window.location.href = data.route;
          } else if (customerDetails.payment_method === "cod") {
            cogoToast.success("Order Placed Successfully", {
              position: "bottom-left",
            });
            router.push(`/order-completed?order_id=${data.data.id}`);
            dispatch(deleteAllFromCart());
          }

          console.log(data.route);
        } else {
          cogoToast.error(data.message || "Something went wrong", {
            position: "bottom-left",
          });
        }
      } catch (error) {
        cogoToast.error(error.message || "Something went wrong", {
          position: "bottom-left",
        });
      }
    } else {
      cogoToast.error("Name / Address Required", {
        position: "bottom-left",
      });
    }
  };

  return (
    <LayoutOne>
      {/* breadcrumb */}
      <BreadcrumbOne pageTitle={t("checkout.breadcrumb.title")}>
        <ol className="breadcrumb justify-content-md-end align-items-center">
          <li className="breadcrumb-item">
            <Link href="/">{t("checkout.breadcrumb.url")}</Link>
          </li>
          <li className="breadcrumb-item active">
            {t("checkout.breadcrumb.title")}
          </li>
        </ol>
      </BreadcrumbOne>
      <div className="checkout-content space-pt--r100 space-pb--r100">
        <Container>
          {cartItems && cartItems.length >= 1 ? (
            <Row>
              <Col md={6}>
                <div className="heading-s1 space-mb--20">
                  <h4>{t("checkout.billing.title")}</h4>
                </div>
                <form>
                  <div className="mb-3">
                    <input
                      type="text"
                      required
                      className="form-control"
                      onChange={handleCustomerDetailsChange}
                      name="customer_name"
                      placeholder={t("checkout.billing.form.name")}
                      value={customerDetails.customer_name}
                    />
                  </div>
                  {/* <div className="mb-3">
                    <input
                      type="text"
                      required
                      className="form-control"
                      name="lname"
                      placeholder="Last name *"
                    />
                  </div> */}
                  {/* <div className="mb-3">
                    <input
                      className="form-control"
                      required
                      type="text"
                      name="cname"
                      placeholder="Company Name"
                    />
                  </div> */}
                  {/* <div className="mb-3">
                    <div className="custom_select">
                      <select className="form-control">
                        <option value="">Select an option...</option>
                        <option value="AX">Aland Islands</option>
                        <option value="AF">Afghanistan</option>
                        <option value="AL">Albania</option>
                        <option value="DZ">Algeria</option>
                        <option value="AD">Andorra</option>
                        <option value="AO">Angola</option>
                        <option value="AI">Anguilla</option>
                        <option value="AQ">Antarctica</option>
                      </select>
                    </div>
                  </div> */}
                  {/* <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      name="billing_address"
                      required=""
                      placeholder="Address *"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      name="billing_address2"
                      required=""
                      placeholder="Address line2"
                    />
                  </div> */}
                  {/* <div className="mb-3">
                    <input
                      className="form-control"
                      required
                      type="text"
                      name="city"
                      placeholder="City / Town *"
                    />
                  </div> */}
                  {/* <div className="mb-3">
                    <input
                      className="form-control"
                      required
                      type="text"
                      name="zipcode"
                      placeholder="Postcode / ZIP *"
                    />
                  </div> */}
                  <div className="mb-3">
                    <div className="row">
                      <div className="col-3 col-sm-2 col-md-3 col-lg-2 pe-0">
                        <input
                          className="form-control"
                          required
                          type="text"
                          value="+974"
                          disabled
                        />
                      </div>
                      <div className="col-9 col-sm-10 col-md-9 col-lg-10">
                        <input
                          className="form-control"
                          required
                          type="number"
                          name="customer_phone"
                          placeholder={t("checkout.billing.form.phone")}
                          onChange={handleCustomerDetailsChange}
                          value={customerDetails.customer_phone}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <input
                      className="form-control"
                      required={false}
                      type="email"
                      name="customer_email"
                      onChange={handleCustomerDetailsChange}
                      placeholder={t("checkout.billing.form.email")}
                      value={customerDetails.customer_email}
                    />
                  </div>
                  {/* {user?.address && (
                    <div className="custom-radio space-mb--20 border p-3">
                      <input
                        className="form-check-input"
                        required
                        type="radio"
                        name="choose_address"
                        id="existing_address"
                        defaultValue="existing_address"
                        onChange={() => setIsAddressNew(false)}
                        defaultChecked={!isAddressNew}
                      />
                      <label
                        className="form-check-label w-100"
                        htmlFor="existing_address"
                      >
                        Select an existing Address
                      </label>
                    </div>
                  )} */}
                  {/* <div className="custom-radio space-mb--20 border p-3">
                    <input
                      className="form-check-input"
                      required
                      type="radio"
                      name="choose_address"
                      id="new_address"
                      defaultValue="new_address"
                      onChange={() => setIsAddressNew(true)}
                      defaultChecked={isAddressNew}
                    />
                    <label
                      className="form-check-label w-100"
                      htmlFor="new_address"
                    >
                      Select an New Address
                    </label>
                  </div> */}

                  <div className="mb-3">
                    <input
                      className="form-control"
                      required
                      type="text"
                      name="customer_address"
                      onChange={handleCustomerDetailsChange}
                      placeholder={t("checkout.billing.form.address")}
                      value={customerDetails.customer_address}
                    />
                  </div>

                  {/* {isAddressNew && (
                    <div className="mb-3">
                      <input
                        className="form-control"
                        required
                        type="text"
                        name="customer_address"
                        onChange={handleCustomerDetailsChange}
                        placeholder="Address *"
                        value={customerDetails.customer_address}
                      />
                    </div>
                  )} */}
                  <div className="heading-s1 space-mb--20">
                    <h4>{t("checkout.billing.form.additional-request")}</h4>
                  </div>
                  <div className="mb-3 mb-0">
                    <textarea
                      rows="5"
                      className="form-control"
                      name="additional_request"
                      onChange={handleCustomerDetailsChange}
                      placeholder={t(
                        "checkout.billing.form.additional-request"
                      )}
                    ></textarea>
                  </div>
                </form>
              </Col>
              <Col md={6}>
                <div className="order-review space-mt-mobile-only--40">
                  <div className="heading-s1 space-mb--20">
                    <h4>{t("checkout.order.title")}</h4>
                  </div>
                  <div className="table-responsive order_table">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>{t("checkout.order.header-one")}</th>
                          <th>{t("checkout.order.header-two")}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartItems.map((product, i) => {
                          // const discountedPrice = getDiscountPrice(
                          //   product.price,
                          //   product.discount
                          // ).toFixed(2);

                          // cartTotalPrice += discountedPrice * product.quantity;
                          return (
                            <tr key={i}>
                              <td>
                                <p className="mb-0 order-review__product-name">
                                  {defaultLanguage === "ar"
                                    ? product.arabic.countertop_name
                                    : product.english.countertop_name}
                                </p>
                                <p className="order-review__product-name">
                                  {defaultLanguage === "ar"
                                    ? product.arabic.storage_name
                                    : product.english.storage_name}
                                </p>
                                <p className="mb-0 order-review__product-name">
                                  {t("checkout.order.countertop-color")}{" "}
                                  {defaultLanguage === "ar"
                                    ? product.arabic.color
                                    : product.english.color}
                                </p>
                                <p className="order-review__product-name">
                                  {t("checkout.order.storage-color")}{" "}
                                  {defaultLanguage === "ar"
                                    ? product.arabic.wooden_storage_color
                                    : product.english.wooden_storage_color}
                                </p>
                                <span className="product-qty">
                                  x {product.quantity}
                                </span>
                              </td>
                              <td>
                                QAR{" "}
                                {(
                                  product.unit_price * product.quantity
                                ).toLocaleString("en-US", {
                                  minimumFractionDigits: 2,
                                })}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                      <tfoot>
                        {/* <tr>
                          <th>SubTotal</th>
                          <td className="product-subtotal">
                            ${product.total.toFixed(2)}
                          </td>
                        </tr> */}
                        {/* <tr>
                          <th>Shipping</th>
                          <td>Free Shipping</td>
                        </tr> */}
                        <tr>
                          <th>{t("checkout.order.total")}</th>
                          <td className="product-subtotal text-nowrap">
                            QAR{" "}
                            {Number(totalAmount).toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                            })}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                  <div className="payment-method">
                    <div className="heading-s1 space-mb--20">
                      <h4>{t("checkout.payment.title")}</h4>
                    </div>
                    <div className="payment-option space-mb--20">
                      <div className="custom-radio space-mb--20">
                        <input
                          className="form-check-input"
                          required
                          type="radio"
                          name="payment_method"
                          id="online_payment"
                          defaultValue="online_payment"
                          onChange={handleCustomerDetailsChange}
                          defaultChecked={
                            customerDetails.payment_method === "online_payment"
                          }
                        />
                        <label
                          className="form-check-label"
                          htmlFor="online_payment"
                        >
                          {t("checkout.payment.credit-card")}
                        </label>
                        {/* <p data-method="credit-card" className="payment-text">
                          There are many variations of passages of Lorem Ipsum
                          available, but the majority have suffered alteration.{" "}
                        </p> */}
                      </div>
                      {/* <div className="custom-radio space-mb--20">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="payment_method"
                          id="debit_card"
                          defaultValue="debit_card"
                          onChange={handleCustomerDetailsChange}
                          defaultChecked={
                            customerDetails.payment_method === "debit_card"
                          }
                        />
                        <label
                          className="form-check-label"
                          htmlFor="debit_card"
                        >
                          {t("checkout.payment.debit-card")}
                        </label>
                        <p data-method="option4" className="payment-text">
                          Please send your cheque to Store Name, Store Street,
                          Store Town, Store State / County, Store Postcode.
                        </p> 
                      </div> */}
                      <div className="custom-radio space-mb--20">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="payment_method"
                          id="cod"
                          defaultValue="cod"
                          onChange={handleCustomerDetailsChange}
                          defaultChecked={
                            customerDetails.payment_method === "cod"
                          }
                        />
                        <label className="form-check-label" htmlFor="cod">
                          {t("checkout.payment.cash-payment")}
                        </label>
                        {/* <p data-method="option5" className="payment-text">
                          Pay via PayPal; you can pay with your credit card if
                          you don't have a PayPal account.
                        </p> */}
                      </div>
                    </div>
                  </div>
                  <div className="d-flex gap-2 justify-content-between align-items-center">
                    <button
                      className="btn btn-fill-out btn-block"
                      onClick={(e) => handleCheckOut(e)}
                    >
                      {t("checkout.payment.place-order")}
                    </button>
                    <button
                      className="btn btn-fill-out btn-block"
                      onClick={() => router.push("/cart")}
                    >
                      {t("checkout.payment.add-more")}
                    </button>
                  </div>
                </div>
              </Col>
            </Row>
          ) : (
            <Row>
              <Col>
                <div className="item-empty-area text-center">
                  <div className="item-empty-area__icon space-mb--30">
                    <IoMdCash />
                  </div>
                  <div className="item-empty-area__text">
                    <p className="space-mb--30">{t("checkout.no-item")}</p>
                    <Link href="/shop/countertops" className="btn btn-fill-out">
                      {t("checkout.shop-now")}
                    </Link>
                  </div>
                </div>
              </Col>
            </Row>
          )}
        </Container>
      </div>
    </LayoutOne>
  );
};

export default Checkout;
