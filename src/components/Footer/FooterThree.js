import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";
import {
  IoIosPhonePortrait,
  IoIosMailOpen,
  IoIosPin
} from "react-icons/io";
import {
  FaFacebookF,
  FaTwitter,
  FaGooglePlusG,
  FaYoutube,
  FaInstagram,
  FaHeart
} from "react-icons/fa";
import { SubscribeEmailTwo } from "../Newsletter";

const FooterThree = () => {
  return (
    <footer className="footer-dark">
      <div className="footer-top">
        <Container>
          <Row>
            <Col lg={4} md={6} sm={12}>
              <div className="widget">
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
              </div>
              <div className="widget">
                <ul className="social-icons mb-3 mb-lg-0">
                  <li>
                    <a href="#" className="sc_facebook">
                      <FaFacebookF />
                    </a>
                  </li>
                  <li>
                    <a href="#" className="sc_twitter">
                      <FaTwitter />
                    </a>
                  </li>
                  <li>
                    <a href="#" className="sc_google">
                      <FaGooglePlusG />
                    </a>
                  </li>
                  <li>
                    <a href="#" className="sc_youtube">
                      <FaYoutube />
                    </a>
                  </li>
                  <li>
                    <a href="#" className="sc_instagram">
                      <FaInstagram />
                    </a>
                  </li>
                </ul>
              </div>
            </Col>
            <Col lg={2} md={3} sm={6}>
              <div className="widget">
                <h6 className="widget-title">Useful Links</h6>
                <ul className="widget-links">
                  <li>
                    <Link href="/other/about-us">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/other/faq">
                      FAQ
                    </Link>
                  </li>
                  <li>
                    <Link href="/">
                      Location
                    </Link>
                  </li>
                  <li>
                    <Link href="/">
                      Affiliates
                    </Link>
                  </li>
                  <li>
                    <Link href="/other/contact-us">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
            </Col>
            <Col lg={2} md={3} sm={6}>
              <div className="widget">
                <h6 className="widget-title">My Account</h6>
                <ul className="widget-links">
                  <li>
                    <Link href="/other/my-account">
                      My Account
                    </Link>
                  </li>
                  <li>
                    <Link href="/">
                      Discount
                    </Link>
                  </li>
                  <li>
                    <Link href="/">
                      Returns
                    </Link>
                  </li>
                  <li>
                    <Link href="/">
                      Orders History
                    </Link>
                  </li>
                  <li>
                    <Link href="/">
                      Order Tracking
                    </Link>
                  </li>
                </ul>
              </div>
            </Col>
            <Col lg={4} md={12} sm={12}>
              <div className="widget">
                <h6 className="widget-title">Subscribe Our Newsletter</h6>
                <p>
                  If you want to get an email from us every time we have a new
                  special offer, then sign up here!
                </p>
                <SubscribeEmailTwo
                  mailchimpUrl="https://devitems.us11.list-manage.com/subscribe/post?u=6bbb9b6f5827bd842d9640c82&amp;id=05d85f18ef"
                  alertColor="#fff"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="bottom-footer border-top--grey">
        <Container>
          <Row>
            <Col md={6}>
              <p className="mb-3 mb-md-0 text-center text-md-start">
                Copyright &copy; {new Date().getFullYear() + " "}. Built with{" "}
                <FaHeart /> by{" "}
                <a href="https://www.hasthemes.com" target="_blank">
                  HasThemes
                </a>
              </p>
            </Col>
            <Col md={6}>
              <ul className="footer-payment text-center text-lg-end">
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
              </ul>
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  );
};

export default FooterThree;
