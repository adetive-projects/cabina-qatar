import { useEffect } from "react";
import Link from "next/link";

const MobileCategoryMenuNavTwo = ({ getActiveStatus }) => {
  useEffect(() => {
    const offCanvasNav = document.querySelector(
      "#offcanvas-mobile-category-menu__navigation"
    );
    const offCanvasNavSubMenu = offCanvasNav.querySelectorAll(
      ".mobile-sub-menu"
    );
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
  return (
    <nav
      className="offcanvas-mobile-menu__navigation space-mb--30"
      id="offcanvas-mobile-category-menu__navigation"
    >
      <ul>
        <li className="menu-item-has-children">
          <Link href="/shop/grid-left-sidebar">
            Computer
          </Link>
          <ul className="mobile-sub-menu">
            <li className="menu-item-has-children">
              <Link href="/shop/grid-left-sidebar">
                Featured Item
              </Link>
              <ul className="mobile-sub-menu">
                <li>
                  <Link href="/shop/grid-left-sidebar">
                    Vestibulum sed
                  </Link>
                </li>
                <li>
                  <Link href="/shop/grid-left-sidebar">
                    Donec porttitor
                  </Link>
                </li>
                <li>
                  <Link href="/shop/grid-left-sidebar">
                    Donec vitae facilisis
                  </Link>
                </li>
                <li>
                  <Link href="/shop/grid-left-sidebar">
                    Curabitur tempus
                  </Link>
                </li>
                <li>
                  <Link href="/shop/grid-left-sidebar">
                    Vivamus in tortor
                  </Link>
                </li>
                <li>
                  <Link href="/shop/grid-left-sidebar">
                    Donec vitae ante ante
                  </Link>
                </li>
                <li>
                  <Link href="/shop/grid-left-sidebar">
                    Etiam ac rutrum
                  </Link>
                </li>
                <li>
                  <Link href="/shop/grid-left-sidebar">
                    Quisque condimentum
                  </Link>
                </li>
              </ul>
            </li>
            <li className="menu-item-has-children">
              <Link href="/shop/grid-left-sidebar">
                Popular Item
              </Link>
              <ul className="mobile-sub-menu">
                <li>
                  <Link href="/shop/grid-left-sidebar">
                    Curabitur tempus
                  </Link>
                </li>
                <li>
                  <Link href="/shop/grid-left-sidebar">
                    Vivamus in tortor
                  </Link>
                </li>
                <li>
                  <Link href="/shop/grid-left-sidebar">
                    Donec vitae ante ante
                  </Link>
                </li>
                <li>
                  <Link href="/shop/grid-left-sidebar">
                    Etiam ac rutrum
                  </Link>
                </li>
                <li>
                  <Link href="/shop/grid-left-sidebar">
                    Vestibulum sed
                  </Link>
                </li>
                <li>
                  <Link href="/shop/grid-left-sidebar">
                    Donec porttitor
                  </Link>
                </li>
                <li>
                  <Link href="/shop/grid-left-sidebar">
                    Donec vitae facilisis
                  </Link>
                </li>
                <li>
                  <Link href="/shop/grid-left-sidebar">
                    Quisque condimentum
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li className="menu-item-has-children">
          <Link href="/shop/grid-left-sidebar">
            Mobile & Tablet
          </Link>
          <ul className="mobile-sub-menu">
            <li className="menu-item-has-children">
              <Link href="/shop/grid-left-sidebar">
                Featured Item
              </Link>
              <ul className="mobile-sub-menu">
                <li>
                  <Link href="/shop/grid-left-sidebar">
                    Vestibulum sed
                  </Link>
                </li>
                <li>
                  <Link href="/shop/grid-left-sidebar">
                    Donec porttitor
                  </Link>
                </li>
                <li>
                  <Link href="/shop/grid-left-sidebar">
                    Donec vitae facilisis
                  </Link>
                </li>
                <li>
                  <Link href="/shop/grid-left-sidebar">
                    Curabitur tempus
                  </Link>
                </li>
                <li>
                  <Link href="/shop/grid-left-sidebar">
                    Vivamus in tortor
                  </Link>
                </li>
                <li>
                  <Link href="/shop/grid-left-sidebar">
                    Donec vitae ante ante
                  </Link>
                </li>
                <li>
                  <Link href="/shop/grid-left-sidebar">
                    Etiam ac rutrum
                  </Link>
                </li>
                <li>
                  <Link href="/shop/grid-left-sidebar">
                    Quisque condimentum
                  </Link>
                </li>
              </ul>
            </li>
            <li className="menu-item-has-children">
              <Link href="/shop/grid-left-sidebar">
                Popular Item
              </Link>
              <ul className="mobile-sub-menu">
                <li>
                  <Link href="/shop/grid-left-sidebar">
                    Curabitur tempus
                  </Link>
                </li>
                <li>
                  <Link href="/shop/grid-left-sidebar">
                    Vivamus in tortor
                  </Link>
                </li>
                <li>
                  <Link href="/shop/grid-left-sidebar">
                    Donec vitae ante ante
                  </Link>
                </li>
                <li>
                  <Link href="/shop/grid-left-sidebar">
                    Etiam ac rutrum
                  </Link>
                </li>
                <li>
                  <Link href="/shop/grid-left-sidebar">
                    Vestibulum sed
                  </Link>
                </li>
                <li>
                  <Link href="/shop/grid-left-sidebar">
                    Donec porttitor
                  </Link>
                </li>
                <li>
                  <Link href="/shop/grid-left-sidebar">
                    Donec vitae facilisis
                  </Link>
                </li>
                <li>
                  <Link href="/shop/grid-left-sidebar">
                    Quisque condimentum
                  </Link>
                </li>
              </ul>
            </li>
            <li className="menu-item-has-children">
              <Link href="/shop/grid-left-sidebar">
                New Item
              </Link>
              <ul className="mobile-sub-menu">
                <li>
                  <Link href="/shop/grid-left-sidebar">
                    Curabitur tempus
                  </Link>
                </li>
                <li>
                  <Link href="/shop/grid-left-sidebar">
                    Vivamus in tortor
                  </Link>
                </li>
                <li>
                  <Link href="/shop/grid-left-sidebar">
                    Donec vitae ante ante
                  </Link>
                </li>
                <li>
                  <Link href="/shop/grid-left-sidebar">
                    Etiam ac rutrum
                  </Link>
                </li>
                <li>
                  <Link href="/shop/grid-left-sidebar">
                    Vestibulum sed
                  </Link>
                </li>
                <li>
                  <Link href="/shop/grid-left-sidebar">
                    Donec porttitor
                  </Link>
                </li>
                <li>
                  <Link href="/shop/grid-left-sidebar">
                    Donec vitae facilisis
                  </Link>
                </li>
                <li>
                  <Link href="/shop/grid-left-sidebar">
                    Quisque condimentum
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li className="menu-item-has-children">
          <Link href="/shop/grid-left-sidebar">
            Camera
          </Link>
          <ul className="mobile-sub-menu">
            <li className="menu-item-has-children">
              <Link href="/shop/grid-left-sidebar">
                Featured Item
              </Link>
              <ul className="mobile-sub-menu">
                <li>
                  <Link href="/shop/grid-left-sidebar">
                    Vestibulum sed
                  </Link>
                </li>
                <li>
                  <Link href="/shop/grid-left-sidebar">
                    Donec porttitor
                  </Link>
                </li>
                <li>
                  <Link href="/shop/grid-left-sidebar">
                    Donec vitae facilisis
                  </Link>
                </li>
                <li>
                  <Link href="/shop/grid-left-sidebar">
                    Curabitur tempus
                  </Link>
                </li>
                <li>
                  <Link href="/shop/grid-left-sidebar">
                    Vivamus in tortor
                  </Link>
                </li>
                <li>
                  <Link href="/shop/grid-left-sidebar">
                    Donec vitae ante ante
                  </Link>
                </li>
                <li>
                  <Link href="/shop/grid-left-sidebar">
                    Etiam ac rutrum
                  </Link>
                </li>
                <li>
                  <Link href="/shop/grid-left-sidebar">
                    Quisque condimentum
                  </Link>
                </li>
              </ul>
            </li>
            <li className="menu-item-has-children">
              <Link href="/shop/grid-left-sidebar">
                Popular Item
              </Link>
              <ul className="mobile-sub-menu">
                <li>
                  <Link href="/shop/grid-left-sidebar">
                    Curabitur tempus
                  </Link>
                </li>
                <li>
                  <Link href="/shop/grid-left-sidebar">
                    Vivamus in tortor
                  </Link>
                </li>
                <li>
                  <Link href="/shop/grid-left-sidebar">
                    Donec vitae ante ante
                  </Link>
                </li>
                <li>
                  <Link href="/shop/grid-left-sidebar">
                    Etiam ac rutrum
                  </Link>
                </li>
                <li>
                  <Link href="/shop/grid-left-sidebar">
                    Vestibulum sed
                  </Link>
                </li>
                <li>
                  <Link href="/shop/grid-left-sidebar">
                    Donec porttitor
                  </Link>
                </li>
                <li>
                  <Link href="/shop/grid-left-sidebar">
                    Donec vitae facilisis
                  </Link>
                </li>
                <li>
                  <Link href="/shop/grid-left-sidebar">
                    Quisque condimentum
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </li>

        <li>
          <Link href="/shop/grid-left-sidebar">
            Accessories
          </Link>
        </li>
        <li>
          <Link href="/shop/grid-left-sidebar">
            Clothing
          </Link>
        </li>
        <li>
          <Link href="/shop/grid-left-sidebar">
            Shoes
          </Link>
        </li>
        <li>
          <Link href="/shop/grid-left-sidebar">
            Watches
          </Link>
        </li>
        <li>
          <Link href="/shop/grid-left-sidebar">
            Headphones
          </Link>
        </li>
        <li>
          <Link href="/shop/grid-left-sidebar">
            Gaming
          </Link>
        </li>
        <li>
          <Link href="/shop/grid-left-sidebar">
            Sports
          </Link>
        </li>
        <li>
          <Link href="/shop/grid-left-sidebar">
            Watches
          </Link>
        </li>
        <li>
          <Link href="/shop/grid-left-sidebar">
            Home Audio & Theater
          </Link>
        </li>
        <li>
          <Link href="/shop/grid-left-sidebar">
            TV & Smart Box
          </Link>
        </li>
        <li>
          <Link href="/shop/grid-left-sidebar">
            Printer
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default MobileCategoryMenuNavTwo;
