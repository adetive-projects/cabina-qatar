import Link from "next/link";
import { Col } from "react-bootstrap";
import clsx from "clsx";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { useTranslation } from "react-i18next";

const Navigation = ({ positionClass }) => {
  const { t } = useTranslation();
  return (
    <nav className="navigation d-none d-lg-block">
      <ul
        className={clsx(
          "d-flex",
          positionClass ? positionClass : "justify-content-end"
        )}
      >
        <li>
          <Link href="/" className="nav-link">
            <span className="nav-link__span">{t("header.nav.one")}</span>
            {/* <IoIosArrowDown /> */}
          </Link>

          {/* <ul className="sub-menu sub-menu--one-column">
            <li>
              <Link href="/home/fashion-one">
                Fashion Home One
              </Link>
            </li>
            <li>
              <Link href="/home/fashion-two">
                Fashion Home Two
              </Link>
            </li>
            <li>
              <Link href="/home/furniture-one">
                Furniture Home One
              </Link>
            </li>
            <li>
              <Link href="/home/furniture-two">
                Furniture Home Two
              </Link>
            </li>
            <li>
              <Link href="/home/electronics-one">
                Electronics Home One
              </Link>
            </li>
            <li>
              <Link href="/home/electronics-two">
                Electronics Home Two
              </Link>
            </li>
          </ul> */}
        </li>
        {/* <li className="has-children-mega">
          <Link href="/shop/countertops" className="nav-link">
            SHOP
            <IoIosArrowDown /> 
          </Link>
          <ul className="sub-menu sub-menu--mega">
            <li className="sub-menu--mega__column">
              <h3 className="sub-menu--mega__title">SHOP PAGE LAYOUT</h3>
              <ul className="sub-menu--mega__list">
                <li>
                  <Link href="/shop/grid-left-sidebar">
                    Grid Left Sidebar
                  </Link>
                </li>
                <li>
                  <Link href="/shop/grid-right-sidebar">
                    Grid Right Sidebar
                  </Link>
                </li>
                <li>
                  <Link href="/shop/list-left-sidebar">
                    List Left Sidebar
                  </Link>
                </li>
                <li>
                  <Link href="/shop/list-right-sidebar">
                    List Right Sidebar
                  </Link>
                </li>
                <li>
                  <Link href="/shop/list-no-sidebar">
                    List No Sidebar
                  </Link>
                </li>
              </ul>
            </li>
            <li className="sub-menu--mega__column">
              <h3 className="sub-menu--mega__title">OTHER PAGES</h3>
              <ul className="sub-menu--mega__list">
                <li>
                  <Link href="/other/cart">
                    Cart
                  </Link>
                </li>
                <li>
                  <Link href="/other/checkout">
                    Checkout
                  </Link>
                </li>
                <li>
                  <Link href="/other/my-account">
                    My Account
                  </Link>
                </li>
                <li>
                  <Link href="/other/wishlist">
                    Wishlist
                  </Link>
                </li>
                <li>
                  <Link href="/other/compare">
                    Compare
                  </Link>
                </li>
                <li>
                  <Link href="/other/order-completed">
                    Order Completed
                  </Link>
                </li>
              </ul>
            </li>
            <li className="sub-menu--mega__column">
              <h3 className="sub-menu--mega__title">PRODUCT PAGES</h3>
              <ul className="sub-menu--mega__list">
                <li>
                  <Link href="/shop/product-basic/lorem-ipsum-fashion-eight">
                    Default
                  </Link>
                </li>
                <li>
                  <Link href="/shop/product-left-sidebar/lorem-ipsum-fashion-eight">
                    Left Sidebar
                  </Link>
                </li>
                <li>
                  <Link href="/shop/product-right-sidebar/lorem-ipsum-fashion-eight">
                    Right Sidebar
                  </Link>
                </li>
                <li>
                  <Link href="/shop/product-thumb-left/lorem-ipsum-fashion-eight">
                    Thumb Left
                  </Link>
                </li>
              </ul>
            </li>
            <li className="sub-menu--mega__column">
              <div className="header-banner">
                <div className="header-banner__content">
                  <div className="shop-banner">
                    <div className="banner-img overlay-bg--40">
                      <img
                        src="/assets/images/banner/shop_banner.jpg"
                        alt="shop_banner"
                      />
                    </div>
                    <div className="shop-bn-content">
                      <h5 className="text-uppercase shop-subtitle">
                        New Collection
                      </h5>
                      <h3 className="text-uppercase shop-title">
                        Sale 30% Off
                      </h3>
                      <Link
                        href="/shop/grid-left-sidebar"
                        className="btn btn-white rounded-0 btn-sm text-uppercase">
                        
                          Shop Now
                        
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </li> */}
        <li className="has-children-mega">
          <Link href="/shop/countertops" className="nav-link">
            <span className="nav-link__span">{t("header.nav.two")}</span>
          </Link>
        </li>
        <li className="has-children-mega">
          <Link href="/shop/countertops" className="nav-link">
            <span className="nav-link__span">{t("header.nav.three")}</span>
          </Link>
        </li>
        <li className="has-children-mega">
          <Link href="/create-your-own-vanity" className="nav-link">
            <span className="nav-link__span">{t("header.nav.four")}</span>
          </Link>
        </li>
        <li className="has-children-mega">
          <Link href="/contact-us" className="nav-link">
            <span className="nav-link__span">{t("header.nav.five")}</span>
          </Link>
        </li>
        <li className="has-children-mega">
          <Link href="/track-your-order" className="nav-link">
            <span className="nav-link__span">{t("header.nav.six")}</span>
          </Link>
        </li>
        {/* <li className="has-children-mega">
          <Link href="/" className="nav-link">
            PRODUCTS<IoIosArrowDown />

          </Link>
          <ul className="sub-menu sub-menu--mega sub-menu--mega--with-banner">
            <li className="sub-menu--mega__column">
              <h3 className="sub-menu--mega__title">SHOP PAGE LAYOUT</h3>
              <ul className="sub-menu--mega__list">
                <li>
                  <Link href="/shop/grid-left-sidebar">
                    Grid Left Sidebar
                  </Link>
                </li>
                <li>
                  <Link href="/shop/grid-right-sidebar">
                    Grid Right Sidebar
                  </Link>
                </li>
                <li>
                  <Link href="/shop/list-left-sidebar">
                    List Left Sidebar
                  </Link>
                </li>
                <li>
                  <Link href="/shop/list-right-sidebar">
                    List Right Sidebar
                  </Link>
                </li>
                <li>
                  <Link href="/shop/list-no-sidebar">
                    List No Sidebar
                  </Link>
                </li>
              </ul>
            </li>
            <li className="sub-menu--mega__column">
              <h3 className="sub-menu--mega__title">OTHER PAGES</h3>
              <ul className="sub-menu--mega__list">
                <li>
                  <Link href="/other/cart">
                    Cart
                  </Link>
                </li>
                <li>
                  <Link href="/other/checkout">
                    Checkout
                  </Link>
                </li>
                <li>
                  <Link href="/other/my-account">
                    My Account
                  </Link>
                </li>
                <li>
                  <Link href="/other/wishlist">
                    Wishlist
                  </Link>
                </li>
                <li>
                  <Link href="/other/compare">
                    Compare
                  </Link>
                </li>
                <li>
                  <Link href="/other/order-completed">
                    Order Completed
                  </Link>
                </li>
              </ul>
            </li>
            <li className="sub-menu--mega__column">
              <h3 className="sub-menu--mega__title">PRODUCT PAGES</h3>
              <ul className="sub-menu--mega__list">
                <li>
                  <Link href="/shop/product-basic/lorem-ipsum-fashion-eight">
                    Default
                  </Link>
                </li>
                <li>
                  <Link href="/shop/product-left-sidebar/lorem-ipsum-fashion-eight">
                    Left Sidebar
                  </Link>
                </li>
                <li>
                  <Link href="/shop/product-right-sidebar/lorem-ipsum-fashion-eight">
                    Right Sidebar
                  </Link>
                </li>
                <li>
                  <Link href="/shop/product-thumb-left/lorem-ipsum-fashion-eight">
                    Thumb Left
                  </Link>
                </li>
              </ul>
            </li>
            <li className="sub-menu--mega__column">
              <h3 className="sub-menu--mega__title">PRODUCT PAGES</h3>
              <ul className="sub-menu--mega__list">
                <li>
                  <Link href="/shop/product-basic/lorem-ipsum-fashion-eight">
                    Default
                  </Link>
                </li>
                <li>
                  <Link href="/shop/product-left-sidebar/lorem-ipsum-fashion-eight">
                    Left Sidebar
                  </Link>
                </li>
                <li>
                  <Link href="/shop/product-right-sidebar/lorem-ipsum-fashion-eight">
                    Right Sidebar
                  </Link>
                </li>
                <li>
                  <Link href="/shop/product-thumb-left/lorem-ipsum-fashion-eight">
                    Thumb Left
                  </Link>
                </li>
              </ul>
            </li>
            <li className="d-lg-flex sub-menu--mega__column--banners">
              <Col lg={4}>
                <div className="header-banner p-0">
                  <img
                    src="/assets/images/banner/menu_banner1.jpg"
                    alt="menu_banner1"
                  />
                  <div className="banner-info">
                    <h6>10% Off</h6>
                    <h4>New Arrival</h4>
                    <Link href="/shop/grid-left-sidebar">
                      Shop now
                    </Link>
                  </div>
                </div>
              </Col>
              <Col lg={4}>
                <div className="header-banner p-0">
                  <img
                    src="/assets/images/banner/menu_banner2.jpg"
                    alt="menu_banner1"
                  />
                  <div className="banner-info">
                    <h6>10% Off</h6>
                    <h4>New Arrival</h4>
                    <Link href="/shop/grid-left-sidebar">
                      Shop now
                    </Link>
                  </div>
                </div>
              </Col>
              <Col lg={4}>
                <div className="header-banner p-0">
                  <img
                    src="/assets/images/banner/menu_banner3.jpg"
                    alt="menu_banner1"
                  />
                  <div className="banner-info">
                    <h6>10% Off</h6>
                    <h4>New Arrival</h4>
                    <Link href="/shop/grid-left-sidebar">
                      Shop now
                    </Link>
                  </div>
                </div>
              </Col>
            </li>
          </ul>
        </li> */}
        {/* <li>
          <Link href="/" className="nav-link">
            PAGES<IoIosArrowDown />

          </Link>
          <ul className="sub-menu sub-menu--one-column">
            <li>
              <Link href="/other/about-us">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/other/contact-us">
                Contact Us
              </Link>
            </li>
            <li>
              <Link href="/other/faq">
                F.A.Q
              </Link>
            </li>
            <li>
              <Link href="/other/not-found">
                404 Error Page
              </Link>
            </li>
            <li>
              <Link href="/other/login">
                Login
              </Link>
            </li>
            <li>
              <Link href="/other/register">
                Register
              </Link>
            </li>
            <li>
              <Link href="/other/terms">
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </li> */}
        {/* <li>
          <Link href="/" className="nav-link">
            BLOG<IoIosArrowDown />

          </Link>
          <ul className="sub-menu sub-menu--one-column sub-menu--one-column--has-children sub-menu--one-column--reverse">
            <li>
              <Link href="/blog/grid-four-columns">
                Grids<IoIosArrowForward />

              </Link>
              <ul className="sub-menu sub-menu--one-column sub-menu--one-column--child-menu">
                <li>
                  <Link href="/blog/grid-three-columns">
                    Three Columns
                  </Link>
                </li>
                <li>
                  <Link href="/blog/grid-four-columns">
                    Four Columns
                  </Link>
                </li>
                <li>
                  <Link href="/blog/grid-left-sidebar">
                    Left Sidebar
                  </Link>
                </li>
                <li>
                  <Link href="/blog/grid-right-sidebar">
                    Right Sidebar
                  </Link>
                </li>
                <li>
                  <Link href="/blog/grid-standard-left-sidebar">
                    Standard Left Sidebar
                  </Link>
                </li>
                <li>
                  <Link href="/blog/grid-standard-right-sidebar">
                    Standard Right Sidebar
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link href="/blog/list-left-sidebar">
                Lists<IoIosArrowForward />

              </Link>
              <ul className="sub-menu sub-menu--one-column sub-menu--one-column--child-menu">
                <li>
                  <Link href="/blog/list-left-sidebar">
                    Left Sidebar
                  </Link>
                </li>
                <li>
                  <Link href="/blog/list-right-sidebar">
                    Right Sidebar
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link href="/blog/post-left-sidebar">
                Single Post<IoIosArrowForward />

              </Link>
              <ul className="sub-menu sub-menu--one-column sub-menu--one-column--child-menu">
                <li>
                  <Link href="/blog/post-left-sidebar">
                    Left Sidebar
                  </Link>
                </li>
                <li>
                  <Link href="/blog/post-right-sidebar">
                    Right Sidebar
                  </Link>
                </li>
                <li>
                  <Link href="/blog/post-slider">
                    Slider Post
                  </Link>
                </li>
                <li>
                  <Link href="/blog/post-audio">
                    Audio Post
                  </Link>
                </li>
                <li>
                  <Link href="/blog/post-video">
                    Video Post
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </li> */}
        {/* <li>
          <Link href="/other/contact-us" className="nav-link">
            CONTACT US
          </Link>
        </li> */}
      </ul>
    </nav>
  );
};

export default Navigation;
