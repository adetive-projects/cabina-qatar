import { useState, Fragment, useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decreaseQuantity,
  deleteFromCart,
  deleteAllFromCart,
  increaseQuantity,
  addToOwnCart,
  setTotalAmount,
  addTempCartItem,
} from "../store/slices/cart-slice";
import { getDiscountPrice, cartItemStock } from "../lib/product";
import { Container, Row, Col } from "react-bootstrap";
import { LayoutOne } from "../layouts";
import { BreadcrumbOne } from "../components/Breadcrumb";
import { IoIosClose } from "react-icons/io";
import { domainUrl } from "../data/api/api";
import { useRouter } from "next/router";
import { MdEdit } from "react-icons/md";
import cogoToast from "@hasanm95/cogo-toast";
import { useTranslation } from "react-i18next";
import { changeLanguage } from "i18next";

const Cart = () => {
  const [quantityCount] = useState(1);
  const dispatch = useDispatch();
  const router = useRouter();
  const { cartItems } = useSelector((state) => state.cart);
  const { t, i18n } = useTranslation();
  const defaultLanguage = i18n.language;
  const [currentLanguage, setCurrentLanguage] = useState("");

  useEffect(() => {
    if (defaultLanguage === "ar") {
      setCurrentLanguage("arabic");
    } else {
      setCurrentLanguage("english");
    }
  }, [defaultLanguage]);

  let cartTotalPrice = cartItems.reduce(
    (total, item) => total + item.unit_price * item.quantity,
    0
  );

  const handleCheckOut = () => {
    dispatch(setTotalAmount(cartTotalPrice));
    router.push("/checkout");
  };

  const handleCartProductEdit = (cartItemId) => {
    const cartItem = cartItems.find((item) => item.cartItemId === cartItemId);
    dispatch(addTempCartItem(cartItem));
    router.push("/vanity-customizer");
  };

  return (
    <LayoutOne>
      {/* breadcrumb */}
      <BreadcrumbOne pageTitle={t("cart.breadcrumb.title")}>
        <ol className="breadcrumb justify-content-md-end align-items-center">
          <li className="breadcrumb-item">
            <Link href="/">{t("cart.breadcrumb.url")}</Link>
          </li>
          <li className="breadcrumb-item active">
            {t("cart.breadcrumb.title")}
          </li>
        </ol>
      </BreadcrumbOne>
      {/* cart content */}
      <div className="cart-content space-pt--r100 space-pb--r100">
        <Container>
          {cartItems && cartItems.length >= 1 ? (
            <Fragment>
              <Row>
                <Col lg={12}>
                  <div className="table-responsive shop-cart-table">
                    <table className="table mb-0">
                      <thead>
                        <tr>
                          <th className="product-thumbnail">&nbsp;</th>
                          <th className="product-name">
                            {t("cart.product-table.header-one")}
                          </th>
                          <th className="product-price">
                            {t("cart.product-table.header-two")}
                          </th>
                          <th className="product-quantity">
                            {t("cart.product-table.header-three")}
                          </th>
                          <th className="product-subtotal">
                            {t("cart.product-table.header-four")}
                          </th>
                          <th className="product-remove">
                            {t("cart.product-table.header-five")}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartItems.map((product, key) => {
                          // const discountedPrice = getDiscountPrice(
                          //   product.price,
                          //   product.discount
                          // ).toFixed(2);

                          // cartTotalPrice += discountedPrice * product.quantity;
                          return (
                            <tr key={key}>
                              <td className="product-thumbnail">
                                <img
                                  src={`${domainUrl}/${product.english.countertop_image}`}
                                  alt="Countertop Image"
                                />

                                {product.english.storage_id !== "no" && (
                                  <img
                                    src={`${domainUrl}/${product.english.storage_image}`}
                                    alt="Storage Image"
                                  />
                                )}
                              </td>
                              <td className="product-name" data-title="Product">
                                <div
                                  className="d-flex align-items-start flex-column"
                                  style={{ maxWidth: "300px" }}
                                >
                                  <div>
                                    {i18n.language === "ar"
                                      ? product.arabic.countertop_name
                                      : product.english.countertop_name}
                                    <br />
                                    <p className="fw-semibold product-name__color">
                                      {t("cart.product-table.color.text")}{" "}
                                      {i18n.language === "ar"
                                        ? product.arabic.color
                                        : product.english.color}
                                    </p>
                                  </div>
                                  {product.storage_id !== "no" && (
                                    <div className="mt-2">
                                      {i18n.language == "ar"
                                        ? product.arabic.storage_name
                                        : product.english.storage_name}{" "}
                                      <br />
                                      <p className="fw-semibold product-name__color">
                                        {t("cart.product-table.color.text")}{" "}
                                        {i18n.language == "ar"
                                          ? product.arabic.wooden_storage_color
                                          : product.english
                                              .wooden_storage_color}
                                      </p>
                                    </div>
                                  )}
                                </div>
                                {/* {product.selectedProductColor &&
                                product.selectedProductSize ? (
                                  <div className="cart-variation">
                                    <p>Color: {product.selectedProductColor}</p>
                                    <p>Size: {product.selectedProductSize}</p>
                                  </div>
                                ) : (
                                  ""
                                )} */}
                              </td>
                              <td
                                className="product-price text-nowrap"
                                data-title="Price"
                              >
                                QAR{" "}
                                {product.unit_price.toLocaleString("en-US", {
                                  minimumFractionDigits: 2,
                                })}
                              </td>
                              <td
                                className="product-quantity"
                                data-title="Quantity"
                              >
                                <div className="cart-plus-minus d-flex align-items-center">
                                  <button
                                    onClick={() =>
                                      dispatch(decreaseQuantity(product))
                                    }
                                    className="qtybutton"
                                  >
                                    -
                                  </button>
                                  <input
                                    className="cart-plus-minus-box"
                                    type="text"
                                    value={product.quantity}
                                    readOnly
                                  />
                                  <button
                                    onClick={() =>
                                      dispatch(increaseQuantity(product))
                                    }
                                    className="qtybutton"
                                  >
                                    +
                                  </button>
                                </div>
                              </td>
                              <td
                                className="product-subtotal text-nowrap"
                                data-title="Total"
                              >
                                QAR{" "}
                                {(
                                  product.unit_price * product.quantity
                                ).toLocaleString("en-US", {
                                  minimumFractionDigits: 2,
                                })}
                              </td>
                              <td
                                className="product-remove"
                                data-title="Modify"
                              >
                                <button
                                  onClick={() =>
                                    handleCartProductEdit(product.cartItemId)
                                  }
                                >
                                  <MdEdit size={15} />
                                </button>
                                <button
                                  onClick={() =>
                                    dispatch(deleteFromCart(product.cartItemId))
                                  }
                                >
                                  <IoIosClose />
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                      <tfoot>
                        <tr>
                          <td colSpan="6" className="px-0 pb-0">
                            <Row className="gx-0 align-items-center">
                              <Col lg={4} md={6} className="mb-3 mb-md-0">
                                {/* <div className="coupon field-form input-group">
                                  <input
                                    type="text"
                                    className="form-control form-control-sm"
                                    placeholder="Enter Coupon Code.."
                                  />
                                  <button
                                    className="input-group-text btn btn-fill-out btn-sm"
                                    type="submit"
                                  >
                                    Apply Coupon
                                  </button>
                                </div> */}
                              </Col>
                              <Col
                                lg={8}
                                md={6}
                                className="text-start text-md-end"
                              >
                                <button
                                  className="btn btn-line-fill btn-sm"
                                  type="submit"
                                  onClick={() => dispatch(deleteAllFromCart())}
                                >
                                  {t("cart.clear-cart")}
                                </button>
                              </Col>
                            </Row>
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col lg={12}>
                  <div className="divider center-icon space-mt--30 space-mb--30">
                    <i className="icon-basket-loaded" />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  {/* <div>
                    <div className="heading-s1 mb-3">
                      <h6>Calculate Shipping</h6>
                    </div>
                    <form className="field-form shipping-calculator">
                      <div className="row">
                        <div className="mb-3 col-lg-12">
                          <select className="form-control">
                            <option value>Choose a option...</option>
                            <option value="AX">Aland Islands</option>
                            <option value="AF">Afghanistan</option>
                            <option value="AL">Albania</option>
                            <option value="DZ">Algeria</option>
                            <option value="AD">Andorra</option>
                            <option value="AO">Angola</option>
                            <option value="AI">Anguilla</option>
                            <option value="AQ">Antarctica</option>
                            <option value="AG">Antigua and Barbuda</option>
                          </select>
                        </div>
                      </div>
                      <div className="row">
                        <div className="mb-3 col-lg-6">
                          <input
                            required="required"
                            placeholder="State / Country"
                            className="form-control"
                            name="name"
                            type="text"
                          />
                        </div>
                        <div className="mb-3 col-lg-6">
                          <input
                            required="required"
                            placeholder="PostCode / ZIP"
                            className="form-control"
                            name="name"
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="mb-3 col-lg-12">
                          <button className="btn btn-fill-line" type="submit">
                            Update Totals
                          </button>
                        </div>
                      </div>
                    </form>
                  </div> */}
                </Col>
                <Col md={6}>
                  <div className="border p-3 p-md-4">
                    {/* <div className="heading-s1 mb-3">
                      <h6>Cart Totals</h6>
                    </div> */}
                    <div className="table-responsive">
                      <table className="table">
                        <tbody>
                          {/* <tr> */}
                          {/* <tr>
                            <td className="cart-total-label">Shipping</td>
                            <td className="cart-total-amount">Free Shipping</td>
                          </tr> */}
                          <tr>
                            <td className="cart-total-label">
                              {t("cart.total")}
                            </td>
                            <td className="cart-total-amount">
                              <strong>
                                QAR{" "}
                                {cartTotalPrice.toLocaleString("en-US", {
                                  minimumFractionDigits: 2,
                                })}
                              </strong>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <button
                      className="btn btn-fill-out"
                      onClick={handleCheckOut}
                    >
                      {t("cart.proceed-to-checkout")}
                    </button>
                  </div>
                </Col>
              </Row>
            </Fragment>
          ) : (
            <Row>
              <Col>
                <div className="item-empty-area text-center">
                  <div className="item-empty-area__icon space-mb--30">
                    <i className="icon-basket-loaded" />
                  </div>
                  <div className="item-empty-area__text">
                    <p className="space-mb--30">{t("cart.no-item")}</p>
                    <Link href="/shop/countertops" className="btn btn-fill-out">
                      {t("cart.shop-now")}
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

export default Cart;
