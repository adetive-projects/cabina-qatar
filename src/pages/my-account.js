import Link from "next/link";
import { LayoutOne } from "../layouts";
import { BreadcrumbOne } from "../components/Breadcrumb";
import { Container, Row, Col } from "react-bootstrap";
import {
  FaCloudDownloadAlt,
  FaDownload,
  FaEye,
  FaRegEdit,
} from "react-icons/fa";
import { IoIosList, IoIosClipboard, IoIosPerson } from "react-icons/io";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import Card from "react-bootstrap/Card";
import { useDispatch, useSelector } from "react-redux";
import {
  clearOrders,
  removeUser,
  setOrders,
  setUser,
} from "../store/slices/auth-slice";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import cogoToast from "@hasanm95/cogo-toast";
import { apiUrl, domainUrl } from "../data/api/api";
import { useTranslation } from "react-i18next";

const MyAccount = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user, orders } = useSelector((state) => state.auth);

  const { t } = useTranslation();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  const [userOrder, setUserOrder] = useState([]);
  const [userOrdersLoading, setUserOrdersLoading] = useState(false);
  const [inputData, setInputData] = useState({
    id: user?.id,
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    password: "",
    repeat_password: "",
  });

  const handleLogout = () => {
    dispatch(removeUser());
    dispatch(clearOrders());
    router.push("/login");
  };

  const handleChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const handleGetUserOrders = async () => {
    try {
      setUserOrdersLoading(true);
      const response = await fetch(`${apiUrl}/orders/${user.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      });
      const data = await response.json();
      dispatch(setOrders(data.data.english_orders));
    } catch (error) {
      console.error("Error fetching user orders:", error);
    } finally {
      setUserOrdersLoading(false);
    }
  };

  useEffect(() => {
    handleGetUserOrders();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (inputData.password !== inputData.repeat_password) {
      return cogoToast.error("Passwords do not match", {
        position: "bottom-left",
      });
    }

    try {
      const response = await fetch(`${apiUrl}/user-update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify(inputData),
      });

      const data = await response.json();
      if (data.success) {
        dispatch(setUser({ ...user, ...data.data }));
        setInputData({
          ...inputData,
          password: "",
          repeat_password: "",
        });
        cogoToast.success("Account details updated successfully", {
          position: "bottom-left",
        });
      } else {
        cogoToast.error(data.message || "Something went wrong", {
          position: "bottom-left",
        });
      }
    } catch (error) {
      console.error("Error updating account:", error);
    }
  };

  const handleInvoiceDownload = async (e, customer_id) => {
    e.preventDefault();

    try {
      await fetch(`${apiUrl}/customer-order-details-download/${customer_id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/pdf",
          Authorization: `Bearer ${user?.token}`,
        },
      });
    } catch (error) {
      console.error("Error downloading invoice:", error);
    }
  };

  if (!user) return null;

  return (
    <LayoutOne>
      {/* Breadcrumb */}
      <BreadcrumbOne pageTitle={t("account.breadcrumb.title")}>
        <ol className="breadcrumb justify-content-md-end align-items-center">
          <li className="breadcrumb-item">
            <Link href="/">{t("account.breadcrumb.url")}</Link>
          </li>
          <li className="breadcrumb-item active">
            {t("account.breadcrumb.title")}
          </li>
        </ol>
      </BreadcrumbOne>

      <div className="my-account-content space-pt--r100 space-pb--r100">
        <Container>
          <Tab.Container defaultActiveKey="dashboard">
            <Row>
              <Col lg={3} md={4}>
                <Nav
                  variant="pills"
                  className="flex-column my-account-content__navigation space-mb--r60"
                >
                  <Nav.Item>
                    <Nav.Link eventKey="dashboard">
                      <IoIosList /> {t("account.tab.button-one")}
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="orders">
                      <IoIosClipboard /> {t("account.tab.button-two")}
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="accountDetails">
                      <IoIosPerson /> {t("account.tab.button-three")}
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>

              <Col lg={9} md={8}>
                <Tab.Content>
                  {/* Dashboard */}
                  <Tab.Pane eventKey="dashboard">
                    <Card className="my-account-content__content">
                      <Card.Header>
                        <h3>{t("account.dashboard.title")}</h3>
                      </Card.Header>
                      <Card.Body>
                        <div className="welcome">
                          <p>
                            {t("account.dashboard.text-one")}{" "}
                            <strong>{user.name}</strong>!{" "}
                            <span className="logout" onClick={handleLogout}>
                              {t("account.dashboard.text-two")}
                            </span>
                          </p>
                        </div>
                        {/* <p>
                          From your account dashboard, you can easily check
                          &amp; view your recent orders, and edit your password
                          and account details.
                        </p> */}
                      </Card.Body>
                    </Card>
                  </Tab.Pane>

                  {/* Orders */}
                  <Tab.Pane eventKey="orders">
                    <Card className="my-account-content__content">
                      <Card.Header>
                        <h3>{t("account.order.title")}</h3>
                      </Card.Header>
                      <Card.Body>
                        <div className="myaccount-table table-responsive text-center">
                          <table className="table">
                            <thead>
                              <tr>
                                <th>{t("account.order.header-one")}</th>
                                <th>{t("account.order.header-two")}</th>
                                <th>{t("account.order.header-three")}</th>
                                <th>{t("account.order.header-four")}</th>
                                <th>{t("account.order.header-five")}</th>
                                <th>{t("account.order.header-six")}</th>
                              </tr>
                            </thead>
                            <tbody>
                              {orders?.length > 0 ? (
                                orders.map((order) => (
                                  <tr key={order.id}>
                                    <td>{order.order_no}</td>
                                    <td>{order.order_date}</td>
                                    <td className="text-capitalize">
                                      {order.payment_status}
                                    </td>
                                    <td className="text-capitalize">
                                      {order.order_status}
                                    </td>
                                    <td>
                                      QAR{" "}
                                      {Number(order.total).toLocaleString(
                                        "en-US"
                                      )}
                                    </td>
                                    <td className="d-flex align-items-center gap-3 justify-content-center">
                                      <Link href={`/order-details/${order.id}`}>
                                        <FaEye />
                                      </Link>
                                      <Link
                                        href={`${domainUrl}/customer-order-details-download/${order.id}`}
                                      >
                                        <FaDownload
                                          // onClick={(e) =>
                                          //   handleInvoiceDownload(
                                          //     e,
                                          //     order.customer_id
                                          //   )
                                          // }
                                          title="Download Invoice"
                                          style={{ cursor: "pointer" }}
                                        />
                                      </Link>
                                    </td>
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td colSpan="5">{t("account.no-order")}</td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </Card.Body>
                    </Card>
                  </Tab.Pane>

                  {/* Account Details */}
                  <Tab.Pane eventKey="accountDetails">
                    <Card className="my-account-content__content">
                      <Card.Header>
                        <h3>{t("account.details.title")}</h3>
                      </Card.Header>
                      <Card.Body>
                        <div className="account-details-form">
                          <form onSubmit={handleUpdate}>
                            <Row>
                              <Col className="mb-3" md={12}>
                                <label>
                                  {t("account.details.form.full-name")}{" "}
                                  <span className="required">*</span>
                                </label>
                                <input
                                  required
                                  className="form-control"
                                  name="name"
                                  value={inputData.name}
                                  onChange={handleChange}
                                  type="text"
                                />
                              </Col>

                              <Col className="mb-3" md={12}>
                                <label>
                                  {t("account.details.form.email")}{" "}
                                  <span className="required">*</span>
                                </label>
                                <input
                                  required
                                  className="form-control"
                                  name="email"
                                  value={inputData.email}
                                  onChange={handleChange}
                                  type="email"
                                />
                              </Col>
                              {/* <Col className="mb-3" md={12}>
                                <label>
                                  Phone Number{" "}
                                  <span className="required">*</span>
                                </label>
                                <input
                                  required
                                  className="form-control"
                                  name="phone"
                                  value={inputData.phone}
                                  onChange={handleChange}
                                  type="phone"
                                />
                              </Col> */}

                              <Col className="mb-3" md={12}>
                                <label>
                                  {t("account.details.form.new-password")}{" "}
                                  <span className="required">*</span>
                                </label>
                                <input
                                  className="form-control"
                                  name="password"
                                  type="password"
                                  onChange={handleChange}
                                  value={inputData.password}
                                />
                              </Col>

                              <Col className="mb-3" md={12}>
                                <label>
                                  {t("account.details.form.repeat-password")}{" "}
                                  <span className="required">*</span>
                                </label>
                                <input
                                  className="form-control"
                                  name="repeat_password"
                                  type="password"
                                  onChange={handleChange}
                                  value={inputData.repeat_password}
                                />
                              </Col>

                              <Col md={12}>
                                <button
                                  type="submit"
                                  className="btn btn-fill-out"
                                  name="submit"
                                  value="Submit"
                                >
                                  {t("account.details.form.submit")}
                                </button>
                              </Col>
                            </Row>
                          </form>
                        </div>
                      </Card.Body>
                    </Card>
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Container>
      </div>
    </LayoutOne>
  );
};

export default MyAccount;
