import { Fragment, useEffect, useState } from "react";
import Head from "next/head";
import Script from "next/script"; // Import Script from next/script
import { Roboto, Poppins } from "@next/font/google";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { wrapper } from "../store";
import Preloader from "../components/Preloader";

import "react-slidedown/lib/slidedown.css";
import "animate.css";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "swiper/swiper-bundle.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/scss/style.scss";
import "./index.css";
import "../assets/css/bottom-wizard/bottom-wizard.css";
import "../assets/css/3d-visualizer/visualizer3d.css";

import "../utils/i18n/i18n";
import i18next from "i18next";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

const MyApp = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <Fragment>
      <Head>
        <title>CABINA</title>
        <meta
          name="description"
          content="Cabina is an exclusive bathroom collection meticulously crafted from a seamless blend of solid surface and wood materials. Engineered and locally manufactured in Qatar, each piece embodies sophistication and durability. With features designed for utmost convenience, Cabina seamlessly integrates into any bathroom space. Experience the perfect union of functionality and elegance with Cabina – the trusted choice for exceptional bathroom solutions in Qatar."
        />
      </Head>

      <Provider store={store}>
        <PersistGate persistor={store.__persistor} loading={<Preloader />}>
          <Component {...props.pageProps} />
        </PersistGate>
      </Provider>
    </Fragment>
  );
};

export default MyApp;
