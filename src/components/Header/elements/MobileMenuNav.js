import { useEffect } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

const MobileMenuNav = ({ getActiveStatus }) => {
  useEffect(() => {
    const offCanvasNav = document.querySelector(
      "#offcanvas-mobile-menu__navigation"
    );
    const offCanvasNavSubMenu =
      offCanvasNav.querySelectorAll(".mobile-sub-menu");
    const anchorLinks = offCanvasNav.querySelectorAll("a");

    for (let i = 0; i < offCanvasNavSubMenu.length; i++) {
      offCanvasNavSubMenu[i].insertAdjacentHTML(
        "beforebegin",
        "<span class='menu-expand'><i></i></span>"
      );
    }

    const menuExpand = offCanvasNav.querySelectorAll(".menu-expand");
    const numMenuExpand = menuExpand.length;

    for (let i = 0; i < numMenuExpand; i++) {
      menuExpand[i].addEventListener("click", (e) => {
        sideMenuExpand(e);
      });
    }

    for (let i = 0; i < anchorLinks.length; i++) {
      anchorLinks[i].addEventListener("click", () => {
        getActiveStatus(false);
      });
    }
  });

  const sideMenuExpand = (e) => {
    e.currentTarget.parentElement.classList.toggle("active");
  };

  const { t } = useTranslation();
  return (
    <nav
      className="offcanvas-mobile-menu__navigation space-mb--30"
      id="offcanvas-mobile-menu__navigation"
    >
      <ul>
        <li className="menu-item-has-children">
          <Link href="/">{t("header.nav.one")}</Link>
          {/* <ul className="mobile-sub-menu">
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

        <li className="menu-item-has-children">
          <Link href="/shop/countertops">{t("header.nav.two")}</Link>
          {/* <ul className="mobile-sub-menu">
            <li className="menu-item-has-children">
              <Link href="/shop/grid-left-sidebar">
                Shop Page Layout
              </Link>
              <ul className="mobile-sub-menu">
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
            <li className="menu-item-has-children">
              <Link href="/shop/grid-left-sidebar">
                Other Pages
              </Link>
              <ul className="mobile-sub-menu">
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
            <li className="menu-item-has-children">
              <Link href="/shop/grid-left-sidebar">
                Product Pages
              </Link>
              <ul className="mobile-sub-menu">
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
          </ul> */}
        </li>

        <li className="menu-item-has-children">
          <Link href="/shop/countertops">{t("header.nav.three")}</Link>
        </li>
        <li className="menu-item-has-children">
          <Link href="/create-your-own-vanity">{t("header.nav.four")}</Link>
        </li>
        <li className="menu-item-has-children">
          <Link href="/contact-us">{t("header.nav.five")}</Link>
        </li>
        <li className="menu-item-has-children">
          <Link href="/track-your-order">{t("header.nav.six")}</Link>
        </li>

        {/* <li className="menu-item-has-children">
          <Link href="/shop/grid-left-sidebar">
            Products
          </Link>
          <ul className="mobile-sub-menu">
            <li className="menu-item-has-children">
              <Link href="/shop/grid-left-sidebar">
                Shop Page Layout
              </Link>
              <ul className="mobile-sub-menu">
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
            <li className="menu-item-has-children">
              <Link href="/shop/grid-left-sidebar">
                Other Pages
              </Link>
              <ul className="mobile-sub-menu">
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
            <li className="menu-item-has-children">
              <Link href="/shop/grid-left-sidebar">
                Product Pages
              </Link>
              <ul className="mobile-sub-menu">
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
            <li className="menu-item-has-children">
              <Link href="/shop/grid-left-sidebar">
                Product Pages
              </Link>
              <ul className="mobile-sub-menu">
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
          </ul>
        </li>

        <li className="menu-item-has-children">
          <Link href="/">
            Pages
          </Link>
          <ul className="mobile-sub-menu">
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
        </li>

        <li className="menu-item-has-children">
          <Link href="/blog/grid-four-columns">
            Blog
          </Link>
          <ul className="mobile-sub-menu">
            <li className="menu-item-has-children">
              <Link href="/blog/grid-four-columns">
                Grids
              </Link>
              <ul className="mobile-sub-menu">
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
            <li className="menu-item-has-children">
              <Link href="/blog/grid-four-columns">
                Lists
              </Link>
              <ul className="mobile-sub-menu">
                <li>
                  <Link href="/blog/list-left-sidebar">
                    Left Sidebar
                  </Link>
                </li>
                <li>
                  <Link href="/blog/grid-right-sidebar">
                    Right Sidebar
                  </Link>
                </li>
              </ul>
            </li>
            <li className="menu-item-has-children">
              <Link href="/blog/post-left-sidebar">
                Single Post
              </Link>
              <ul className="mobile-sub-menu">
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
        </li>

        <li>
          <Link href="/other/contact-us">
            Contact Us
          </Link>
        </li> */}
      </ul>
    </nav>
  );
};

export default MobileMenuNav;
