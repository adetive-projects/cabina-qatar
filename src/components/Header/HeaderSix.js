import { useState, useEffect } from "react";
import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { IoIosMenu } from "react-icons/io";
import { AiOutlineShoppingCart, AiOutlineHeart } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";
import { FiPhoneCall } from "react-icons/fi";
import clsx from "clsx";
import HeaderTopThree from "./elements/HeaderTopThree";
import Navigation from "./elements/Navigation";
import MobileMenu from "./elements/MobileMenu";
import MobileCategoryMenuTwo from "./elements/MobileCategoryMenuTwo";
import MiniCart from "./elements/MiniCart";
import CategoryMenuThree from "./elements/CategoryMenuThree";

const HeaderSix = ({ navPositionClass }) => {
  const [scroll, setScroll] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [offCanvasMobileMenuActive, setOffCanvasMobileMenuActive] = useState(
    false
  );
  const [
    offCanvasMobileCategoryMenuActive,
    setOffCanvasMobileCategoryMenuActive
  ] = useState(false);
  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);

  useEffect(() => {
    const header = document.querySelector(".header-wrap");
    setHeaderHeight(header.offsetHeight);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    setScroll(window.scrollY);
  };

  return (
    <header className={clsx("header-wrap header-with-topbar", scroll > headerHeight && "is-sticky")}>
      {/* header top */}
      <HeaderTopThree containerClass="container" />

      {/* middle header */}
      <div className="middle-header dark-skin space-pt--20 space-pb--20">
        <Container>
          <div className="d-flex justify-content-between align-items-center">
            {/* logo */}
            <Link href="/" className="navbar-brand pt-0 pb-0">

              <img
                className="logo-light"
                src="/assets/images/logo_light.png"
                alt="logo"
              />
              <img
                className="logo-dark"
                src="/assets/images/logo_dark.png"
                alt="logo"
              />

            </Link>
            <div className="product-search-form product-search-form--style-three d-none d-lg-block">
              <form>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <div className="custom-select-wrapper">
                      <select className="first-null">
                        <option value>All Category</option>
                        <option value="Dresses">Dresses</option>
                        <option value="Shirt-Tops">Shirt &amp; Tops</option>
                        <option value="T-Shirt">T-Shirt</option>
                        <option value="Pants">Pants</option>
                        <option value="Jeans">Jeans</option>
                      </select>
                    </div>
                  </div>
                  <input
                    className="form-control"
                    placeholder="Search Product..."
                    required
                    type="text"
                  />
                  <button type="submit" className="search-btn-two">
                    Search
                  </button>
                </div>
              </form>
            </div>
            <div className="contact-phone">
              <FiPhoneCall />
              <span>123-456-7689</span>
            </div>
          </div>
        </Container>
      </div>
      {/* bottom header */}
      <div className="bottom-header dark-skin border-top border-bottom">
        <Container>
          <Row className="align-items-center">
            <Col lg={3} xs={6}>
              <div className="mobile-category d-block d-lg-none">
                <button
                  className="nav-link mobile-category-menu-trigger"
                  onClick={() => {
                    setOffCanvasMobileCategoryMenuActive(true);
                  }}
                >
                  <IoIosMenu />
                </button>
              </div>
              <div className="d-none d-lg-block">
                {/* category menu */}
                <CategoryMenuThree categoryMenuStyle="category-menu-trigger--style-two" />
              </div>
            </Col>
            <Col lg={9} xs={6}>
              <div className="d-flex align-items-center justify-content-end position-relative">
                {/* navigation */}
                <Navigation positionClass={navPositionClass} />
                {/* icons */}
                <ul className="header-icons d-flex justify-content-end">
                  <li>
                    <Link href="/other/my-account" className="nav-link pe-3">

                      <BsPerson />

                    </Link>
                  </li>

                  <li className="position-relative">
                    <Link href="/other/wishlist" className="nav-link mini-cart-trigger pe-3">

                      <AiOutlineHeart />
                      {wishlistItems.length > 0 ? (
                        <span className="cart-count cart-count--mobile">
                          {wishlistItems.length}
                        </span>
                      ) : (
                        ""
                      )}

                    </Link>
                  </li>

                  <li className="d-none d-lg-block position-relative">
                    <Link href="/other/cart" className="nav-link mini-cart-trigger pe-3 pe-lg-0">

                      <AiOutlineShoppingCart />
                      {cartItems.length > 0 ? (
                        <span className="cart-count">{cartItems.length}</span>
                      ) : (
                        ""
                      )}

                    </Link>
                    {/* mini cart */}
                    <MiniCart cartItems={cartItems} />
                  </li>

                  <li className="d-block d-lg-none position-relative">
                    <Link href="/other/cart" className="nav-link mini-cart-trigger pe-3 pe-lg-0">

                      <AiOutlineShoppingCart />
                      {cartItems.length > 0 ? (
                        <span className="cart-count cart-count--mobile">
                          {cartItems.length}
                        </span>
                      ) : (
                        ""
                      )}

                    </Link>
                  </li>

                  <li className="d-block d-lg-none">
                    <button
                      className="nav-link mobile-menu-trigger pe-0"
                      onClick={() => {
                        setOffCanvasMobileMenuActive(true);
                      }}
                    >
                      <IoIosMenu />
                    </button>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* mobile navigation menu */}
      <MobileMenu
        activeStatus={offCanvasMobileMenuActive}
        getActiveStatus={setOffCanvasMobileMenuActive}
      />
      {/* mobile category navigation menu */}
      <MobileCategoryMenuTwo
        activeStatus={offCanvasMobileCategoryMenuActive}
        getActiveStatus={setOffCanvasMobileCategoryMenuActive}
      />
    </header>
  );
};

export default HeaderSix;
