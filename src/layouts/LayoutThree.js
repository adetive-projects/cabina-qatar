import { Fragment } from "react";
import { HeaderOne } from "../components/Header";
import { FooterThree } from "../components/Footer";
import ScrollToTop from "../components/scroll-to-top";

const LayoutThree = ({ children, navPositionClass }) => {
  return (
    <Fragment>
      <HeaderOne navPositionClass={navPositionClass} />
      {children}
      <FooterThree />
      <ScrollToTop />
    </Fragment>
  );
};

export default LayoutThree;
