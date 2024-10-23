import { useState, useEffect } from "react";
import Link from "next/link";
import { Container } from "react-bootstrap";
import { IoIosSearch, IoIosMenu } from "react-icons/io";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useSelector } from "react-redux";
import clsx from "clsx";
import HeaderTop from "./elements/HeaderTop";
import Navigation from "./elements/Navigation";
import SearchOverlay from "./elements/SearchOverlay";
import MobileMenu from "./elements/MobileMenu";
import MiniCart from "./elements/MiniCart";

const HeaderOne = ({ navPositionClass, logoBig }) => {
  const [scroll, setScroll] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [offCanvasSearchActive, setOffCanvasSearchActive] = useState(false);
  const [offCanvasMobileMenuActive, setOffCanvasMobileMenuActive] =
    useState(false);
  const { cartItems } = useSelector((state) => state.cart);

  // useEffect(() => {
  //   const header = document.querySelector(".header-wrap");
  //   setHeaderHeight(header.offsetHeight);
  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  // const handleScroll = () => {
  //   setScroll(window.scrollY);
  // };

  return (
    <header
      className={clsx(
        "header-wrap header-with-topbar",
        scroll > headerHeight && "is-sticky"
      )}
    >
      {/* header top */}
      <HeaderTop />

      <div className="bottom-header dark-skin">
        <Container>
          <div className="bottom-header-container d-flex justify-content-between align-items-center position-relative">
            {/* logo */}
            <Link href="/" className="navbar-brand">
              <img
                className={`logo-light cabina ${logoBig ? "logo-big" : ""}`}
                src="/assets/images/Cabina New Logo.png"
                alt="logo"
              />
              <img
                className={`logo-dark cabina ${logoBig ? "logo-big" : ""}`}
                src="/assets/images/Cabina New Logo.png"
                alt="logo"
              />
              {/* <div className="logo-decoration"></div> */}
            </Link>

            {/* navigation */}
            <Navigation positionClass={navPositionClass} />

            {/* icons */}
            <ul className="header-icons d-flex gap-2">
              <li className="d-none d-lg-block">
                <button
                  className="nav-link search-trigger"
                  onClick={() => {
                    setOffCanvasSearchActive(true);
                  }}
                >
                  <IoIosSearch />
                </button>
              </li>

              <li className="d-none d-lg-block position-relative">
                <Link
                  href="/cart"
                  className="nav-link mini-cart-trigger pe-3 pe-lg-0"
                >
                  <AiOutlineShoppingCart />
                  {cartItems.length > 0 ? (
                    <span className="cart-count">{cartItems.length}</span>
                  ) : (
                    ""
                  )}
                </Link>
                {/* mini cart */}
                {/* <MiniCart cartItems={cartItems} /> */}
              </li>

              <li className="d-block d-lg-none position-relative">
                <Link
                  href="/cart"
                  className="nav-link mini-cart-trigger pe-3 pe-lg-0"
                >
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
        </Container>
      </div>

      {/* search overlay */}
      <SearchOverlay
        activeStatus={offCanvasSearchActive}
        getActiveStatus={setOffCanvasSearchActive}
      />

      {/* mobile menu */}
      <MobileMenu
        activeStatus={offCanvasMobileMenuActive}
        getActiveStatus={setOffCanvasMobileMenuActive}
      />
    </header>
  );
};

export default HeaderOne;
