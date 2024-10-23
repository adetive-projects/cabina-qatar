import { Fragment } from "react";
import { HeaderFive } from "../components/Header";
import { FooterFive } from "../components/Footer";
import ScrollToTop from "../components/scroll-to-top";

const LayoutFive = ({ children, navPositionClass }) => {
  return (
    <Fragment>
      <HeaderFive navPositionClass={navPositionClass} />
      {children}
      <FooterFive />
      <ScrollToTop />
    </Fragment>
  );
};

export default LayoutFive;
