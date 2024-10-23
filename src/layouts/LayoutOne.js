import { Fragment } from "react";
import { HeaderOne } from "../components/Header";
import { FooterOne } from "../components/Footer";
import ScrollToTop from "../components/scroll-to-top";

const LayoutOne = ({
  children,
  navPositionClass = "justify-content-center",
  showFooter = true,
  logoBig = false,
}) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <HeaderOne navPositionClass={navPositionClass} logoBig={logoBig} />
      {children}
      {showFooter && <FooterOne />}
      <ScrollToTop />
    </div>
  );
};

export default LayoutOne;
