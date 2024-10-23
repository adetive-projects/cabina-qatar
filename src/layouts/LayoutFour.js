import { Fragment } from "react";
import { HeaderThree } from "../components/Header";
import { FooterFour } from "../components/Footer";
import ScrollToTop from "../components/scroll-to-top";

const LayoutFour = ({ children, navPositionClass }) => {
  return (
    <Fragment>
      <HeaderThree navPositionClass={navPositionClass} />
      {children}
      <FooterFour />
      <ScrollToTop />
    </Fragment>
  );
};

export default LayoutFour;
