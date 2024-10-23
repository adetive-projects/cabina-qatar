import { Fragment } from "react";
import { HeaderSix } from "../components/Header";
import { FooterSix } from "../components/Footer";
import ScrollToTop from "../components/scroll-to-top";

const LayoutSix = ({ children, navPositionClass }) => {
  return (
    <Fragment>
      <HeaderSix navPositionClass={navPositionClass} />
      {children}
      <FooterSix />
      <ScrollToTop />
    </Fragment>
  );
};

export default LayoutSix;
