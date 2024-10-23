import Link from "next/link";
import { LayoutOne } from "../layouts";
import { BreadcrumbOne } from "../components/Breadcrumb";
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebookF, FaGooglePlusG } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { apiUrl } from "../data/api/api";
import { setUser } from "../store/slices/auth-slice";
import cogoToast from "@hasanm95/cogo-toast";
import { Trans, useTranslation } from "react-i18next";

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = loginData;
    if (email && password) {
      try {
        const response = await fetch(`${apiUrl}/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        });
        const data = await response.json();
        if (data.success) {
          dispatch(setUser(data.data));
          cogoToast.success("Login successfully", {
            position: "bottom-left",
          });
          router.push("/my-account");
        } else {
          console.log(data.message);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      cogoToast.error("Please enter all fields", { position: "bottom-left" });
    }
  };

  return (
    <LayoutOne>
      {/* breadcrumb */}
      {/* <BreadcrumbOne pageTitle="Login">
        <ol className="breadcrumb justify-content-md-end">
          <li className="breadcrumb-item">
            <Link href="/">Home</Link>
          </li>
          <li className="breadcrumb-item active">Login</li>
        </ol>
      </BreadcrumbOne> */}
      <div className="login-content space-pt--r100 space-pb--r100">
        <Container>
          <Row className="justify-content-center">
            <Col xl={6} md={10}>
              <div className="login-wrap">
                <div className="heading-s1 space-mb--20">
                  <h3>{t("login.title")}</h3>
                </div>
                <div>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <input
                        type="text"
                        required
                        className="form-control"
                        name="email"
                        value={loginData.email}
                        onChange={handleChange}
                        placeholder={t("login.form.email")}
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        className="form-control"
                        required
                        type="password"
                        name="password"
                        value={loginData.password}
                        onChange={handleChange}
                        placeholder={t("login.form.password")}
                      />
                    </div>
                    <div className="login-footer mb-3">
                      <div className="check-form">
                        {/* <div className="custom-checkbox">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="checkbox"
                            id="exampleCheckbox1"
                            defaultValue
                          />
                          <label
                            className="form-check-label"
                            htmlFor="exampleCheckbox1"
                          >
                            <span>Remember me</span>
                          </label>
                        </div> */}
                      </div>
                      <a href="#">{t("login.form.forgot-password")}</a>
                    </div>
                    <div className="mb-3">
                      <button
                        type="submit"
                        className="btn btn-fill-out btn-block"
                        name="login"
                      >
                        {t("login.form.submit")}
                      </button>
                    </div>
                  </form>
                  {/* <div className="different-login">
                    <span> or</span>
                  </div>
                  <ul className="btn-login text-center">
                    <li>
                      <a href="#" className="btn btn-facebook">
                        <FaFacebookF />
                        Facebook
                      </a>
                    </li>
                    <li>
                      <a href="#" className="btn btn-google">
                        <FaGooglePlusG />
                        Google
                      </a>
                    </li>
                  </ul> */}
                  <div className="form-note text-center space-mt--20">
                    <Trans i18nKey="login.no-account">
                      Don't Have an Account?
                      <Link href="/register">Sign up now</Link>
                    </Trans>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </LayoutOne>
  );
};

export default Login;
