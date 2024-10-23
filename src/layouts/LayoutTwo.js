import { Fragment } from "react";
import { HeaderTwo } from "../components/Header";
import { FooterTwo } from "../components/Footer";
import ScrollToTop from "../components/scroll-to-top";

const LayoutTwo = ({ children, navPositionClass }) => {
  return (
    <Fragment>
      <HeaderTwo navPositionClass={navPositionClass} />
      {children}
      <FooterTwo />
      <ScrollToTop />
    </Fragment>
  );
};

export default LayoutTwo;
