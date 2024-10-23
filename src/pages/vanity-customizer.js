// import Header from "./component/header/Header";
import Visualizer3D from "../components/3d-visualizer/Visualizer3D";

import {
  counterTopColorPrice,
  CTColors,
  CTFinishes,
  SColor,
} from "../data/colors/colors";

import { useEffect, useState } from "react";
import { FaCheckCircle, FaChevronDown } from "react-icons/fa";
import BottomWizard from "../components/bottom-wizard/BottomWizard";
import { LayoutOne } from "../layouts";
import { useDispatch, useSelector } from "react-redux";
import { apiUrl, domainUrl } from "../data/api/api";
import { setColors } from "../store/slices/product-slice";
import {
  addTempCartItem,
  addToCart,
  addToOwnCart,
  setTempCartQty,
  updateToOwnCart,
} from "../store/slices/cart-slice";
import { useRouter } from "next/router";
import { useRef } from "react";
import html2canvas from "html2canvas";
import { useThree } from "@react-three/fiber";
import { Accordion } from "react-bootstrap";
import { MdEdit } from "react-icons/md";
import { CgLoadbar } from "react-icons/cg";
import cogoToast from "@hasanm95/cogo-toast";
import { sortColors } from "../lib/product";
import { useTranslation } from "react-i18next";

function VanityCustomizer() {
  const { tempCartItem } = useSelector((state) => state.cart);
  const { colors } = useSelector((state) => state.product);
  const [isLoading, setIsLoading] = useState(true);
  const [additionalRequest, setAdditionalRequest] = useState("");
  const [currentColor, setCurrentColor] = useState({});
  const [currentTempCart, setCurrentTempCart] = useState({});
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const [counterTopData, setCounterTopData] = useState({
    counterTopColors: [],
    storageColors: [],
    selectedCTColor: null,
    selectedStorageColor: null,
  });

  const validArticleNos = [
    "3C.0.0.80",
    "3C.0.0.100",
    "3C.0.0.120",
    "3C.0.0.180",
  ];

  const dispatch = useDispatch();
  const router = useRouter();

  const fetchColors = async () => {
    try {
      const response = await fetch(`${apiUrl}/colors`);
      const data = await response.json();

      if (response.ok) {
        dispatch(setColors(data.data));
        const c =
          currentLanguage === "ar"
            ? data.data.arabic_colors
            : data.data.english_colors;
        setCurrentColor(c);
        setIsLoading(false);
      } else {
        console.error("Error:", data.message);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error:", error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const c =
      currentLanguage === "ar" ? colors.arabic_colors : colors.english_colors;
    setCurrentColor(c);

    const t =
      currentLanguage === "ar" ? tempCartItem.arabic : tempCartItem.english;

    setCurrentTempCart(t);
  }, [currentLanguage, colors]);

  useEffect(() => {
    fetchColors();
  }, []);

  useEffect(() => {
    if (currentColor?.countertop_colors) {
      const sortedCountertopColors = sortColors([
        ...currentColor.countertop_colors,
      ]);

      setCounterTopData({
        counterTopColors: sortedCountertopColors,
        storageColors: currentColor.storage_colors,
        selectedCTColor: tempCartItem?.english.countertop_color_id
          ? sortedCountertopColors.find(
              (color) => color.id === tempCartItem?.english.countertop_color_id
            )
          : "",
        selectedStorageColor: tempCartItem?.english.wooden_storage_color_id
          ? currentColor.storage_colors.find(
              (color) =>
                color.id === tempCartItem?.english.wooden_storage_color_id
            )
          : "",
      });
    }
  }, [currentColor]);

  const [priceData, setPriceData] = useState({
    totalQuantity: tempCartItem?.quantity,
    counterTopPrice:
      tempCartItem?.english?.countertop_price ||
      tempCartItem?.arabic?.countertop_price,
    storagePrice:
      tempCartItem?.english?.storage_price ||
      tempCartItem?.arabic?.storage_price,
  });

  const [totalPrice, setTotalPrice] = useState(0);

  const incrementQuantity = () => {
    setPriceData({
      ...priceData,
      totalQuantity: formatNumber(priceData.totalQuantity + 1),
    });
  };

  const decrementQuantity = () => {
    setPriceData({
      ...priceData,
      totalQuantity: formatNumber(priceData.totalQuantity - 1),
    });
  };

  function formatNumber(num) {
    if (num < 1) {
      num = 1;
    }

    return Number(
      num.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      })
    );
  }

  useEffect(() => {
    const priceCalculation = () => {
      let counterTopPrice = priceData.counterTopPrice;
      let storagePrice = priceData.storagePrice;

      if (
        counterTopData &&
        counterTopData.selectedCTColor &&
        (counterTopData.selectedCTColor.price_type === "supreme" ||
          counterTopData.selectedStorageColor.price_type === "supreme")
      ) {
        counterTopPrice = parseFloat(
          tempCartItem.english.countertop_supreme_price ||
            tempCartItem.arabic.countertop_supreme_price
        );
        storagePrice = parseFloat(
          tempCartItem.english.storage_supreme_price ||
            tempCartItem.arabic.storage_supreme_price
        );
      }

      const totalPriceTemp =
        priceData.totalQuantity * (counterTopPrice + storagePrice);
      // console.log("counterTopPrice", counterTopPrice);
      // console.log("storagePrice", storagePrice);
      // console.log("totalPriceTemp", totalPriceTemp);
      setTotalPrice(totalPriceTemp);
    };

    priceCalculation();
  }, [priceData, counterTopData]);

  const handleAddToRealCart = async (e) => {
    e.preventDefault();

    if (
      !counterTopData?.selectedCTColor ||
      (tempCartItem?.english.storage_id !== "no" &&
        !counterTopData?.selectedStorageColor)
    ) {
      return cogoToast.warn('Please select "Countertop & Storage Color"', {
        position: "bottom-left",
      });
    }

    console.log(
      colors.english_colors.countertop_colors.find(
        (c) => c.id === counterTopData.selectedCTColor.id
      )?.color
    );

    dispatch(
      addToOwnCart({
        ...tempCartItem,
        english: {
          ...tempCartItem.english,
          color:
            colors.english_colors.countertop_colors.find(
              (c) => c.id === counterTopData.selectedCTColor.id
            )?.color || counterTopData.selectedCTColor.color,

          wooden_storage_color:
            colors.english_colors.storage_colors.find(
              (c) => c.id === counterTopData.selectedStorageColor.id
            )?.color || counterTopData.selectedStorageColor.color,

          countertop_color_id: counterTopData.selectedCTColor.id,
          wooden_storage_color_id: counterTopData.selectedStorageColor.id,
        },

        arabic: {
          ...tempCartItem.arabic,
          color:
            colors.arabic_colors.countertop_colors.find(
              (c) => c.id === counterTopData.selectedCTColor.id
            )?.color || counterTopData.selectedCTColor.color,

          wooden_storage_color:
            colors.arabic_colors.storage_colors.find(
              (c) => c.id === counterTopData.selectedStorageColor.id
            )?.color || counterTopData.selectedStorageColor.color,

          countertop_color_id: counterTopData.selectedCTColor.id,
          wooden_storage_color_id: counterTopData.selectedStorageColor.id,
        },
        unit_price:
          (counterTopData.selectedCTColor.price_type === "supreme"
            ? tempCartItem.english.countertop_supreme_price
            : tempCartItem.english.countertop_price) +
          tempCartItem.english.storage_price,
        quantity: priceData.totalQuantity,
        // color: counterTopData.selectedCTColor.color,
        // wooden_storage_color: counterTopData.selectedStorageColor.color,
        // countertop_color_id: counterTopData.selectedCTColor.id,
        // wooden_storage_color_id: counterTopData.selectedStorageColor.id,
        // additional_request: additionalRequest,
      })
    );

    router.push("/cart");
  };

  const handleUpdateToRealCart = async (e) => {
    router.push("/cart");

    console.log(
      colors.english_colors.countertop_colors.find(
        (c) => c.id === counterTopData.selectedCTColor.id
      )?.color
    );
    dispatch(
      updateToOwnCart({
        ...tempCartItem,

        // color: counterTopData.selectedCTColor.color,
        // wooden_storage_color: counterTopData.selectedStorageColor.color,
        // countertop_color_id: counterTopData.selectedCTColor.id,
        // wooden_storage_color_id: counterTopData.selectedStorageColor.id,
        // additional_request: additionalRequest,

        english: {
          ...tempCartItem.english,
          color:
            colors.english_colors.countertop_colors.find(
              (c) => c.id === counterTopData.selectedCTColor.id
            )?.color || counterTopData.selectedCTColor.color,

          wooden_storage_color:
            colors.english_colors.storage_colors.find(
              (c) => c.id === counterTopData.selectedStorageColor.id
            )?.color || counterTopData.selectedStorageColor.color,

          countertop_color_id: counterTopData.selectedCTColor.id,
          wooden_storage_color_id: counterTopData.selectedStorageColor.id,
        },

        arabic: {
          ...tempCartItem.arabic,
          color:
            colors.arabic_colors.countertop_colors.find(
              (c) => c.id === counterTopData.selectedCTColor.id
            )?.color || counterTopData.selectedCTColor.color,

          wooden_storage_color:
            colors.arabic_colors.storage_colors.find(
              (c) => c.id === counterTopData.selectedStorageColor.id
            )?.color || counterTopData.selectedStorageColor.color,

          countertop_color_id: counterTopData.selectedCTColor.id,
          wooden_storage_color_id: counterTopData.selectedStorageColor.id,
        },
        unit_price:
          (counterTopData.selectedCTColor.price_type === "supreme"
            ? tempCartItem.english.countertop_supreme_price
            : tempCartItem.english.countertop_price) +
          tempCartItem.english.storage_price,
        quantity: priceData.totalQuantity,
      })
    );
  };

  const [activeKey, setActiveKey] = useState("0");

  const handleToggle = (eventKey) => {
    setActiveKey(activeKey === eventKey ? null : eventKey);
  };

  const editCounterTopModel = () => {
    dispatch(addTempCartItem({ ...tempCartItem, isEditing: true }));
    router.push("/shop/countertops");
  };

  const editStorageModel = () => {
    router.push("/shop/storages");
  };

  const handleCounterTopColor = (color) => {
    setCounterTopData({
      ...counterTopData,
      selectedCTColor: color,
      storageColors:
        color.price_type === "supreme"
          ? currentColor.storage_colors.filter(
              (c) => c.price_type === "supreme"
            )
          : currentColor.storage_colors,
      selectedStorageColor: validArticleNos.includes(
        tempCartItem.english.storage_article_no
      )
        ? color
        : "",
    });
  };
  return (
    <LayoutOne showFooter={false}>
      {/* <Header /> */}
      <div className="visualizer-wrapper">
        <section className="visualizer-container">
          {tempCartItem?.english?.countertop_3d_image ||
          tempCartItem?.arabic?.storage_3d_image ? (
            <Visualizer3D
              counterTopColor={counterTopData.selectedCTColor}
              storageColor={counterTopData.selectedStorageColor}
            />
          ) : (
            <div className="d-flex align-items-center justify-content-center flex-column gap-3">
              <img
                src="/assets/images/Cabina New Logo.png"
                alt="Cabina"
                className="d-none d-lg-block"
                style={{ maxWidth: "80px" }}
              />
              <p>{t("customize.3d-model-not-available")}</p>
            </div>
          )}
          <div className="color-finish-container">
            <div className="color-finish-inner-container">
              <h2 className="heading text-center">{t("customize.title")}</h2>
              <Accordion
                activeKey={activeKey}
                onSelect={handleToggle}
                className="accordion-custom-container"
              >
                <Accordion.Item eventKey="0" className="">
                  <Accordion.Header className="accordion-custom-header">
                    {t("customize.model.title")}{" "}
                    {activeKey === "0" ? (
                      <FaChevronDown className="ms-auto" />
                    ) : (
                      <CgLoadbar className="ms-auto" />
                    )}
                  </Accordion.Header>
                  <Accordion.Body>
                    <div className="d-flex align-items-center gap-2 mb-4">
                      <img
                        src={`${domainUrl}/${
                          tempCartItem.english?.countertop_image ||
                          tempCartItem.arabic?.countertop_image
                        }`}
                        alt="Countertop Model Image"
                        style={{ width: "100%", maxWidth: "80px" }}
                      />
                      <p className="model-name">
                        {currentTempCart?.countertop_name}
                      </p>

                      <div>
                        <MdEdit
                          size={20}
                          className="edit-vanity-button"
                          onClick={editCounterTopModel}
                        />
                      </div>
                    </div>
                    {tempCartItem?.english?.storage_id !== "no" ? (
                      <div className="d-flex align-items-center gap-2">
                        <img
                          src={`${domainUrl}/${
                            tempCartItem.english?.storage_image ||
                            tempCartItem.arabic?.storage_image
                          }`}
                          alt="Storage Model Image"
                          style={{ width: "100%", maxWidth: "80px" }}
                        />
                        <p className="model-name">
                          {currentTempCart?.storage_name}
                        </p>
                        <div>
                          <MdEdit
                            size={20}
                            className="edit-vanity-button"
                            onClick={editStorageModel}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="d-flex align-items-center gap-2 justify-content-between">
                        <p className="model-name">
                          {t("customize.model.no-storage")}
                        </p>
                        <div>
                          <MdEdit
                            size={20}
                            className="edit-vanity-button"
                            onClick={editStorageModel}
                          />
                        </div>
                      </div>
                    )}
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header className="accordion-custom-header">
                    {t("customize.countertop-color.title")}{" "}
                    {activeKey === "1" ? (
                      <FaChevronDown className="ms-auto" />
                    ) : (
                      <CgLoadbar className="ms-auto" />
                    )}
                  </Accordion.Header>
                  <Accordion.Body>
                    <div className="color-container">
                      {counterTopData?.counterTopColors.map((color, index) => (
                        <div
                          className="color"
                          key={index}
                          onClick={() => handleCounterTopColor(color)}
                        >
                          <div style={{ position: "relative" }}>
                            <img
                              src={`${domainUrl}/${color.compressed_image}`}
                              alt={color.color}
                            />{" "}
                            {counterTopData?.selectedCTColor.id ===
                              color.id && (
                              <FaCheckCircle className="color-check-icon" />
                            )}
                          </div>
                          <p className="color-name">{color.color}</p>
                        </div>
                      ))}
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
                {tempCartItem.english?.storage_id !== "no" &&
                  tempCartItem.english?.storage_article_no !== "3C.0.0.80" &&
                  tempCartItem.english?.storage_article_no !== "3C.0.0.100" &&
                  tempCartItem.english?.storage_article_no !== "3C.0.0.120" &&
                  tempCartItem.english?.storage_article_no !== "3C.0.0.180" && (
                    <Accordion.Item eventKey="2">
                      <Accordion.Header className="accordion-custom-header">
                        {t("customize.storage-color.title")}{" "}
                        {activeKey === "2" ? (
                          <FaChevronDown className="ms-auto" />
                        ) : (
                          <CgLoadbar className="ms-auto" />
                        )}
                      </Accordion.Header>
                      <Accordion.Body>
                        <div className="color-container">
                          {counterTopData.storageColors.length > 0 &&
                            counterTopData?.storageColors.map(
                              (color, index) => (
                                <div
                                  className="color"
                                  key={index}
                                  onClick={() =>
                                    setCounterTopData({
                                      ...counterTopData,
                                      selectedStorageColor: color,
                                    })
                                  }
                                >
                                  <div style={{ position: "relative" }}>
                                    <img
                                      src={`${domainUrl}/${color.compressed_image}`}
                                      alt={color.color}
                                    />{" "}
                                    {counterTopData?.selectedStorageColor
                                      ?.id === color.id && (
                                      <FaCheckCircle className="color-check-icon" />
                                    )}
                                  </div>
                                  <p className="color-name">{color.color}</p>
                                </div>
                              )
                            )}
                        </div>
                        {counterTopData.storageColors.length === 0 && (
                          <p>{t("customize.storage-color.no-storage-color")}</p>
                        )}
                      </Accordion.Body>
                    </Accordion.Item>
                  )}
              </Accordion>
            </div>

            <div className="d-flex align-items-center price-bottom-container">
              <div className="col-4  col-sm-4 col-lg-4 col-xl-4">
                <div className="product-content__price vanity d-flex-align-items-center">
                  <span className="price vanity d-flex align-items-center">
                    {`QAR
                    ${Number(totalPrice).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    })}`}
                  </span>
                </div>
              </div>
              <div className="col-5 col-sm-4 col-lg-5 col-xl-5">
                <div className="product-content__quantity mb-0 vanity">
                  <div className="cart-plus-minus">
                    <button className="qtybutton" onClick={decrementQuantity}>
                      -
                    </button>
                    <input
                      className="cart-plus-minus-box"
                      type="text"
                      value={priceData.totalQuantity}
                      readOnly
                    />
                    <button className="qtybutton" onClick={incrementQuantity}>
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="col-3 text-end col-lg-3">
                {tempCartItem.cartItemId ? (
                  <button
                    className="btn btn-fill-out btn-addtocart space-ml--10"
                    onClick={handleUpdateToRealCart}
                    disabled={
                      !counterTopData?.selectedCTColor ||
                      (tempCartItem?.english?.storage_id !== "no" &&
                        !counterTopData?.selectedStorageColor)
                        ? true
                        : false
                    }
                  >
                    {t("customize.update-button")}
                  </button>
                ) : (
                  <button
                    className="btn btn-fill-out btn-addtocart vanity space-ml--10"
                    onClick={handleAddToRealCart}
                    disabled={
                      !counterTopData?.selectedCTColor ||
                      (tempCartItem?.english?.storage_id !== "no" &&
                        !counterTopData?.selectedStorageColor)
                        ? true
                        : false
                    }
                  >
                    {t("customzie.add-button")}
                  </button>
                )}
              </div>
              {/* <div className="d-flex align-items-center gap-2"></div> */}
            </div>
          </div>
        </section>

        {/* <section className="additional-wrapper">
          <div className="additional-container">
            <div className="heading-s1 space-mb--20">
              <h4>Additional Requests</h4>
            </div>
            <div className="mb-3 mb-0">
              <textarea
                onChange={(e) => setAdditionalRequest(e.target.value)}
                rows="8"
                className="form-control p-3"
                placeholder="Additional requests"
                name="additional_request"
              ></textarea>
            </div>
          </div>
        </section> */}
      </div>

      {/* <BottomWizard
        incrementQuantity={incrementQuantity}
        decrementQuantity={decrementQuantity}
        priceData={priceData}
        formatNumber={formatNumber}
        totalPrice={totalPrice}
        handleAddToRealCart={handleAddToRealCart}
      /> */}
    </LayoutOne>
  );
}

export default VanityCustomizer;
