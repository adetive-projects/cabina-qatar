import Link from "next/link";
import { Container, Row, Col, Form } from "react-bootstrap";
import {
  IoIosPhonePortrait,
  IoIosShuffle,
  IoIosHeartEmpty,
  IoIosMail,
  IoIosMegaphone,
  IoIosCall,
} from "react-icons/io";
import { AiOutlineUser } from "react-icons/ai";
import { useSelector } from "react-redux";
import { IoCallOutline, IoMailOutline } from "react-icons/io5";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import i18n from "../../../utils/i18n/i18n";

const HeaderTop = () => {
  const { user } = useSelector((state) => state.auth);
  const { t } = useTranslation();

  const defaultLanguage = localStorage.getItem("defaultLanguage");
  const handleLanguageChange = (e) => {
    const language = e.target.value;
    if (language) {
      localStorage.setItem("defaultLanguage", language);
      i18n.changeLanguage(language);
    }
  };

  const setFontFamily = (language) => {
    const root = document.documentElement;
    if (language === "en") {
      root.style.setProperty("--ff-roboto", '"Gotham", sans-serif');
      root.style.setProperty("--ff-poppins", '"Gotham", sans-serif');
    } else {
      root.style.setProperty("--ff-roboto", '"GE Thameen Book", serif');
      root.style.setProperty("--ff-poppins", '"GE Thameen Book", serif');
    }
  };

  useEffect(() => {
    setFontFamily(defaultLanguage);
  }, [defaultLanguage]);

  return (
    <div className="top-header d-none d-lg-block bg--dark text-white">
      <Container>
        <Row className="align-items-center">
          <Col md={6}>
            <div className="d-flex align-items-center justify-content-center justify-content-md-start">
              {/* <Form.Control
                as="select"
                name="languages"
                className="me-2 border-0"
              >
                <option value="en">English</option>
                <option value="fn">France</option>
              </Form.Control> */}

              {/* <Form.Control as="select" name="countries" className="me-3">
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBR">GBR</option>
              </Form.Control> */}

              <ul className="contact-detail text-center text-lg-start">
                <li>
                  <IoMailOutline />
                  <Link
                    href="mailto:info@cabinaqatar.com"
                    className="text-white"
                  >
                    info@cabinaqatar.com
                  </Link>
                </li>
                <li>
                  <IoCallOutline />
                  <Link href="tel:+974 44337000" className="text-white">
                    +974 44337000
                  </Link>
                </li>
              </ul>
            </div>
          </Col>
          <Col md={6}>
            <div className=" d-flex align-items-center justify-content-center justify-content-md-end">
              <ul className="header-list">
                {/* <li>
                  <Link href="/other/compare">

                    <IoIosShuffle />
                    <span>Compare</span>

                  </Link>
                </li> */}
                {/* <li>
                  <Link href="/other/wishlist">

                    <IoIosHeartEmpty />
                    <span>Wishlist</span>

                  </Link>
                </li> */}
                {user ? (
                  <li>
                    <Link
                      href="/my-account"
                      className="d-flex align-items-center"
                    >
                      <AiOutlineUser />
                      <span>{user.name}</span>
                    </Link>
                  </li>
                ) : (
                  <li>
                    <Link href="/login" className="d-flex align-items-center">
                      <AiOutlineUser />
                      <span>{t("header.top.login")}</span>
                    </Link>
                  </li>
                )}
              </ul>
              <Form.Control
                as="select"
                name="languages"
                onChange={handleLanguageChange}
                defaultValue={defaultLanguage}
                className="ms-5 px-3 rounded-0 border bg-dark text-white"
              >
                <option value="en">{t("language.en")}</option>
                <option value="ar">{t("language.ar")}</option>
              </Form.Control>
              {/* <div
                id="google_translate_element"
                style={{ margin: "10px" }}
              ></div> */}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HeaderTop;
