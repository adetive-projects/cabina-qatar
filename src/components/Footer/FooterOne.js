import { Fragment } from "react";
import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";
import {
  IoLogoFacebook,
  IoLogoTwitter,
  IoLogoGoogleplus,
  IoLogoYoutube,
  IoLogoInstagram,
  IoIosPhonePortrait,
  IoIosMailOpen,
  IoIosPin,
} from "react-icons/io";
import { FaFacebookF, FaHeart } from "react-icons/fa";
import { SubscribeEmail } from "../Newsletter";
import { useTranslation } from "react-i18next";

const FooterOne = () => {
  const { t } = useTranslation();
  return (
    <Fragment>
      {/* <div className="bg--default space-pt--60 space-pb--60">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <h3 className="newsletter-title text-white mb-md-0">
                Subscribe Our Newsletter
              </h3>
            </Col>
            <Col md={6}>
              <SubscribeEmail
                mailchimpUrl="https://devitems.us11.list-manage.com/subscribe/post?u=6bbb9b6f5827bd842d9640c82&amp;id=05d85f18ef"
                alertColor="#fff"
              />
            </Col>
          </Row>
        </Container>
      </div> */}

      <footer className="footer-dark">
        <div className="footer-top">
          <Container>
            <Row className="gy-4">
              <Col lg={3} md={6} sm={12}>
                <div className="widget">
                  <div className="footer-logo">
                    <Link href="/">
                      <img
                        src="/assets/images/Cabina New Logo Dark.png"
                        alt="logo"
                      />
                    </Link>
                  </div>
                  {/* <p>
                    If you are going to use of Lorem Ipsum need to be sure there
                    isn't hidden of text
                  </p> */}
                </div>
                {/* <div className="widget">
                  <ul className="social-icons">
                    <li>
                      <a href="#">
                        <IoLogoFacebook />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <IoLogoTwitter />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <IoLogoGoogleplus />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <IoLogoYoutube />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <IoLogoInstagram />
                      </a>
                    </li>
                  </ul>
                </div> */}
              </Col>
              <Col lg={2} md={0} sm={0}>
                {/* <div className="widget">
                    <h6 className="widget-title">Useful Links</h6>
                    <ul className="widget-links">
                      <li>
                        <Link href="/other/about-us">About Us</Link>
                      </li>
                      <li>
                        <Link href="/other/faq">FAQ</Link>
                      </li>
                      <li>
                        <Link href="/">Location</Link>
                      </li>
                      <li>
                        <Link href="/">Affiliates</Link>
                      </li>
                      <li>
                        <Link href="/other/contact-us">Contact</Link>
                      </li>
                    </ul>
                  </div> */}
              </Col>
              <Col xl={3} lg={4} md={8} sm={8}>
                {/* <div className="widget">
                  <h6 className="widget-title">Category</h6>
                  <ul className="widget-links">
                    <li>
                      <Link href="/shop/grid-left-sidebar">Men</Link>
                    </li>
                    <li>
                      <Link href="/shop/grid-left-sidebar">Woman</Link>
                    </li>
                    <li>
                      <Link href="/shop/grid-left-sidebar">Kids</Link>
                    </li>
                    <li>
                      <Link href="/shop/grid-left-sidebar">Best Seller</Link>
                    </li>
                    <li>
                      <Link href="/shop/grid-left-sidebar">New Arrivals</Link>
                    </li>
                  </ul>
                </div> */}
                <div className="widget">
                  <h6 className="widget-title">{t("footer.contact.title")}</h6>
                  <ul className="contact-info contact-info-light">
                    {/* <li>
                      <IoIosPin />
                      <p>123 Street, Old Trafford, New South London , UK</p>
                    </li> */}
                    <li className="text-white border border-top-0 border-start-0 border-end-0">
                      {/* <IoIosMailOpen /> */}
                      {t("footer.contact.email")}{" "}
                      <a href="mailto:info@cabinaqatar.com">
                        info@cabinaqatar.com
                      </a>
                    </li>
                    <li className="text-white border border-top-0 border-start-0 border-end-0">
                      {/* <IoIosPhonePortrait /> */}
                      {t("footer.contact.phone")}{" "}
                      <a href="tel:+974 44337000">+974 44337000</a>
                    </li>
                  </ul>
                  <ul className="social-icons d-flex justify-content-start mt-2">
                    <li>
                      <a href="https://www.facebook.com/people/CabinaQatar/61566948988556/?sk=about">
                        <FaFacebookF size={25} className="border rounded-1" />
                      </a>
                    </li>
                    <li>
                      <a href="https://www.instagram.com/cabina.qatar/">
                        <IoLogoInstagram
                          size={25}
                          className="border rounded-1"
                        />
                      </a>
                    </li>
                  </ul>
                </div>
              </Col>
              <Col lg={3} md={4} sm={4} className="footer-top--down">
                <div className="widget">
                  {/* <h6 className="widget-title">My Account</h6> */}
                  <ul className="widget-links">
                    <li>
                      <Link
                        href="/"
                        className="border border-top-0 border-start-0 border-end-0 "
                      >
                        {t("footer.nav.one")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/shop/countertops"
                        className="border border-top-0 border-start-0 border-end-0 "
                      >
                        {t("footer.nav.two")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/shop/countertops"
                        className="border border-top-0 border-start-0 border-end-0 "
                      >
                        {t("footer.nav.three")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/create-your-own-vanity"
                        className="border border-top-0 border-start-0 border-end-0 "
                      >
                        {t("footer.nav.four")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/track-your-order"
                        className="border border-top-0 border-start-0 border-end-0 "
                      >
                        {t("footer.nav.five")}
                      </Link>
                    </li>
                  </ul>
                </div>
              </Col>
              <Col lg={0} md={0} sm={0}>
                {/* <div className="widget">
                  <h6 className="widget-title">Contact Info</h6>
                  <ul className="contact-info contact-info-light">
                    <li>
                      <IoIosPin />
                      <p>123 Street, Old Trafford, New South London , UK</p>
                    </li>
                    <li>
                      <IoIosMailOpen />
                      <a href="mailto:info@sitename.com">info@sitename.com</a>
                    </li>
                    <li>
                      <IoIosPhonePortrait />
                      <p>+ 457 789 789 65</p>
                    </li>
                  </ul>
                </div> */}
              </Col>
            </Row>
          </Container>
        </div>
        <div className="bottom-footer border-top--grey">
          <Container>
            <Row>
              <Col md={6}>
                <p className="mb-3 mb-md-0 text-center text-md-start">
                  {t("footer.copyright")} &copy;{" "}
                  {new Date().getFullYear() + " "}
                </p>
              </Col>
              <Col md={6}>
                {/* <ul className="footer-payment text-center text-lg-end">
                  <li>
                    <a href="#">
                      <img src="/assets/images/icons/visa.png" alt="visa" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img
                        src="/assets/images/icons/discover.png"
                        alt="discover"
                      />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img
                        src="/assets/images/icons/master_card.png"
                        alt="master_card"
                      />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img src="/assets/images/icons/paypal.png" alt="paypal" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img
                        src="/assets/images/icons/amarican_express.png"
                        alt="american_express"
                      />
                    </a>
                  </li>
                </ul> */}
                {/* <ul className="social-icons d-flex justify-content-center justify-content-lg-end">
                  <li>
                    <a href="#">
                      <IoLogoFacebook />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <IoLogoTwitter />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <IoLogoGoogleplus />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <IoLogoYoutube />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <IoLogoInstagram />
                    </a>
                  </li>
                </ul> */}
              </Col>
            </Row>
          </Container>
        </div>
      </footer>
    </Fragment>
  );
};

export default FooterOne;
