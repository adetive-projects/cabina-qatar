import React, { useState } from "react";
import Logo from "../../assets/logo.jpeg";
import Menu from "../../assets/xbox-menu.png";
import "./header.css";

import { FaBars } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";

const Header = () => {
  const [isHeaderOpen, setIsHeaderOpen] = useState(false);

  return (
    <header>
      <div className="header-fluid-container">
        <div className="header-container">
          <div className="logo">
            <a href="index.html">
              <img src={Logo} alt="Cabina Logo" />
            </a>
          </div>

          <nav className={`header-nav ${isHeaderOpen ? "active" : ""}`}>
            <div onClick={() => setIsHeaderOpen(false)}>
              <IoIosCloseCircle className="header-close" />
            </div>
            <ul className="nav-lists">
              <li>
                <a href="icon-pack-3.html" className="animated_link">
                  Home
                </a>
              </li>
            </ul>
          </nav>

          <div
            className="header-menu-bar"
            onClick={() => setIsHeaderOpen(true)}
          >
            <FaBars className="header-menu" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
