import Link from "next/link";
import { LayoutOne } from "../layouts";
import { BreadcrumbOne } from "../components/Breadcrumb";
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebookF, FaGooglePlusG } from "react-icons/fa";
import { useEffect, useState } from "react";
import cogoToast from "@hasanm95/cogo-toast";
import { useRouter } from "next/router";
import { apiUrl } from "../data/api/api";
import { useDispatch } from "react-redux";
import { setUser } from "../store/slices/auth-slice";
import { Trans, useTranslation } from "react-i18next";

const Register = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const handleChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirm_password } = registerData;
    if (name && email && password && confirm_password) {
      if (password === confirm_password) {
        try {
          const response = await fetch(`${apiUrl}/register`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(registerData),
          });
          const data = await response.json();
          if (data.success) {
            dispatch(setUser(data.data));
            cogoToast.success("Register successfully", {
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
        cogoToast.error("Password not matched", { position: "bottom-left" });
      }
    } else {
      cogoToast.error("Please enter all fields", { position: "bottom-left" });
    }
  };

  return (
    <LayoutOne>
      {/* breadcrumb */}
      {/* <BreadcrumbOne pageTitle="Register">
        <ol className="breadcrumb justify-content-md-end">
          <li className="breadcrumb-item">
            <Link href="/">Home</Link>
          </li>
          <li className="breadcrumb-item active">Register</li>
        </ol>
      </BreadcrumbOne> */}
      <div className="login-content space-pt--r100 space-pb--r100">
        <Container>
          <Row className="justify-content-center">
            <Col xl={6} md={10}>
              <div className="login-wrap">
                <div className="heading-s1 space-mb--20">
                  <h3>{t("register.title")}</h3>
                </div>
                <div>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <input
                        type="text"
                        required
                        className="form-control"
                        name="name"
                        value={registerData.name}
                        onChange={handleChange}
                        placeholder={t("register.form.name")}
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="text"
                        required
                        className="form-control"
                        name="email"
                        value={registerData.email}
                        onChange={handleChange}
                        placeholder={t("register.form.email")}
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        className="form-control"
                        required
                        type="password"
                        name="password"
                        value={registerData.password}
                        onChange={handleChange}
                        placeholder={t("register.form.password")}
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        className="form-control"
                        required
                        type="password"
                        name="confirm_password"
                        value={registerData.confirm_password}
                        onChange={handleChange}
                        placeholder={t("register.form.confirm-password")}
                      />
                    </div>
                    {/* <div className="login-footer mb-3">
                      <div className="check-form">
                        <div className="custom-checkbox">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="accept"
                            checked={registerData.accept}
                            onChange={handleChange}
                            id="terms_policy"
                            defaultValue
                          />
                          <label
                            className="form-check-label"
                            htmlFor="terms_policy"
                          >
                            <span>I agree to terms & Policy.</span>
                          </label>
                        </div>
                      </div>
                    </div> */}
                    <div className="mb-3">
                      <button
                        type="submit"
                        className="btn btn-fill-out btn-block"
                        name="login"
                      >
                        {t("register.form.submit")}
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
                    <Trans i18nKey="register.already-have-account">
                      Already have an account? <Link href="/login">Log in</Link>
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

export default Register;
