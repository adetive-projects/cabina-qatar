import Visualizer3D from "../components/create-your-own-vanity/Visualizer3D";

import { useEffect, useState } from "react";
import { FaCheckCircle, FaChevronDown } from "react-icons/fa";

import { LayoutOne } from "../layouts";

import { apiUrl, domainUrl } from "../data/api/api";

import { useRouter } from "next/router";

import { Accordion } from "react-bootstrap";

import { CgLoadbar } from "react-icons/cg";
import { useDispatch } from "react-redux";
import { getSortedCountertopProducts, sortColors } from "../lib/product";
import cogoToast from "@hasanm95/cogo-toast";
import { addToOwnCart } from "../store/slices/cart-slice";
import { useTranslation } from "react-i18next";

function VanityCustomizer() {
  const validArticleNos = [
    "3C.0.0.80",
    "3C.0.0.100",
    "3C.0.0.120",
    "3C.0.0.180",
  ];
  const [isLoading, setIsLoading] = useState({
    countertopLoading: false,
    storageLoading: false,
    colorsLoading: false,
  });

  const [counterTopData, setCounterTopData] = useState({
    countertops: [],
    selectedCTColor: null,
    selectedCountertop: "",
  });

  const [storageData, setStorageData] = useState({
    storages: [],
    selectedStorageColor: null,
    selectedStorage: "",
    oldSelectedStorageColor: null,
  });

  const [colorsData, setColorsData] = useState({
    counterTopColors: [],
    storageColors: [],
  });

  const router = useRouter();
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const [allColorData, setAllColorData] = useState({});

  const fetchColors = async () => {
    try {
      setIsLoading({ ...isLoading, colorsLoading: true });
      const response = await fetch(`${apiUrl}/colors`);
      const data = await response.json();
      setAllColorData(data.data);
      const c =
        currentLanguage === "ar"
          ? data.data.arabic_colors
          : data.data.english_colors;

      setColorsData({
        counterTopColors: c.countertop_colors,
        storageColors: c.storage_colors,
      });
    } catch (error) {
      console.error("Error:", error.message);
    } finally {
      setIsLoading({ ...isLoading, colorsLoading: false });
    }
  };

  useEffect(() => {
    const c =
      currentLanguage === "ar"
        ? allColorData.arabic_colors
        : allColorData.english_colors;
    setColorsData({
      counterTopColors: c?.countertop_colors,
      storageColors: c?.storage_colors,
    });
  }, [currentLanguage, allColorData]);

  // console.log(colorsData);

  const fetchCountertops = async () => {
    try {
      setIsLoading({ ...isLoading, countertopLoading: true });
      const response = await fetch(`${apiUrl}/countertops`);
      const data = await response.json();
      const filtered = getSortedCountertopProducts(
        data.data.english_countertops
      );
      setCounterTopData({
        ...counterTopData,
        countertops: filtered,
      });
    } catch (error) {
      console.error("Error:", error.message);
    } finally {
      setIsLoading({ ...isLoading, countertopLoading: false });
    }
  };

  const fetchStorages = async () => {
    try {
      setIsLoading((prev) => ({ ...prev, storageLoading: true }));
      const response = await fetch(`${apiUrl}/single-countertop-storages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: counterTopData.selectedCountertop?.id,
        }),
      });
      const data = await response.json();

      const existingStorageIds = storageData.storages
        .map((item) => item.storage_id)
        .sort((a, b) => a - b);

      const upcomingStorageIds = data.data.english_storages
        .map((item) => item.storage_id)
        .sort((a, b) => a - b);

      const shouldUpdate =
        existingStorageIds.length === 0 ||
        existingStorageIds.length !== upcomingStorageIds.length ||
        !existingStorageIds.every(
          (id, index) => id === upcomingStorageIds[index]
        );

      if (shouldUpdate) {
        setStorageData({
          ...storageData,
          selectedStorage: "",
          storages: data.data.english_storages,
        });
      }
    } catch (error) {
      console.error("Error fetching storages:", error);
    } finally {
      setIsLoading((prev) => ({ ...prev, storageLoading: false }));
    }
  };

  useEffect(() => {
    fetchColors();
    fetchCountertops();
  }, []);

  useEffect(() => {
    if (counterTopData.selectedCountertop !== "") {
      fetchStorages();
    }
  }, [counterTopData.selectedCountertop]);

  const [priceData, setPriceData] = useState({
    totalQuantity: 1,
    counterTopPrice: counterTopData.selectedCountertop.price
      ? counterTopData.selectedCountertop.price
      : 0,
    storagePrice: storageData.storage_price ? storageData.storage_price : 0,
  });

  useEffect(() => {
    const priceCalculation = () => {
      let counterTopPrice = priceData.counterTopPrice;

      if (
        counterTopData &&
        counterTopData.selectedCTColor &&
        counterTopData.selectedCTColor.price_type === "supreme"
      ) {
        counterTopPrice = parseFloat(
          counterTopData.selectedCountertop.supreme_price
        );
      }

      const totalPriceTemp =
        priceData.totalQuantity * (counterTopPrice + priceData.storagePrice);
      setTotalPrice(totalPriceTemp);
    };

    priceCalculation();
  }, [priceData, counterTopData, storageData, colorsData]);

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

  const [activeKey, setActiveKey] = useState("0");

  const handleToggle = (eventKey) => {
    setActiveKey(activeKey === eventKey ? null : eventKey);
  };

  const handleShopNow = (e) => {
    e.preventDefault();

    if (
      !counterTopData?.selectedCTColor ||
      !storageData?.selectedStorageColor ||
      !counterTopData?.selectedCountertop ||
      !storageData?.selectedStorage
    ) {
      return cogoToast.warn('Please select "Countertop & Storage with Color"', {
        position: "bottom-left",
      });
    }

    dispatch(
      addToOwnCart({
        countertop_id: counterTopData.selectedCountertop.id,
        countertop_price: counterTopData.selectedCountertop.price,
        countertop_supreme_price:
          counterTopData.selectedCountertop.supreme_price,
        countertop_name: counterTopData.selectedCountertop.name,
        countertop_image: counterTopData.selectedCountertop.main_image,
        countertop_3d_image: counterTopData.selectedCountertop["3d_image"],
        countertop_size: counterTopData.selectedCountertop.size,
        countertop_type: counterTopData.selectedCountertop.type,
        isEditing: false,
        storage_price: storageData.selectedStorage.storage_price,
        storage_id: storageData.selectedStorage.storage_id,
        storage_name: storageData.selectedStorage.storage_name,
        storage_image: storageData.selectedStorage.storage_main_image,
        storage_3d_image: storageData.selectedStorage.storage_3d_image,

        quantity: priceData.totalQuantity,

        color: counterTopData.selectedCTColor.color,
        wooden_storage_color: storageData.selectedStorageColor.color,
        countertop_color_id: counterTopData.selectedCTColor.id,
        wooden_storage_color_id: storageData.selectedStorageColor.id,

        unit_price:
          (counterTopData.selectedCTColor.price_type === "supreme"
            ? counterTopData.selectedCountertop.supreme_price
            : counterTopData.selectedCountertop.price) +
          storageData.selectedStorage.storage_price,
        quantity: priceData.totalQuantity,
      })
    );

    router.push("/cart");
  };

  const handleStorageSelection = (storage) => {
    setStorageData((prevStorageData) => ({
      ...prevStorageData,
      selectedStorage: storage,
      selectedStorageColor: "",
      selectedStorageColor: validArticleNos.includes(storage?.article_no)
        ? counterTopData?.selectedCTColor
        : prevStorageData?.oldSelectedStorageColor,
    }));

    setPriceData((prevPriceData) => ({
      ...prevPriceData,
      storagePrice: storage.storage_price ? storage.storage_price : 0,
    }));
  };

  // console.log(storageData);

  const handleCounterTopColorSelection = (color) => {
    setCounterTopData((prevCounterTopData) => ({
      ...prevCounterTopData,
      selectedCTColor: color,
    }));

    setStorageData((prevStorageData) => ({
      ...prevStorageData,
      selectedStorageColor: validArticleNos.includes(
        prevStorageData?.selectedStorage?.article_no
      )
        ? color
        : prevStorageData?.selectedStorageColor,
    }));
  };

  useEffect(() => {
    if (validArticleNos.includes(storageData?.selectedStorage?.article_no)) {
      setStorageData((prevStorageData) => ({
        ...prevStorageData,
        selectedStorageColor: counterTopData?.selectedCTColor,
      }));
    }
  }, [storageData.selectedStorage]);

  // useEffect(() => {
  //   if (!validArticleNos.includes(storageData?.selectedStorage?.article_no)) {
  //     setStorageData((prevStorageData) => ({
  //       ...prevStorageData,
  //       selectedStorageColor: prevStorageData?.selectedStorageColor,
  //     }));
  //   }
  // }, [storageData.selectedStorage]);

  return (
    <LayoutOne showFooter={false}>
      {/* <Header /> */}
      <div className="visualizer-wrapper">
        <section className="visualizer-container">
          {counterTopData?.selectedCountertop["3d_image"] ||
          storageData?.selectedStorage?.storage_3d_image ? (
            <Visualizer3D
              counterTopColor={counterTopData.selectedCTColor}
              storageColor={storageData.selectedStorageColor}
              storage={storageData.selectedStorage}
              countertop={counterTopData.selectedCountertop}
            />
          ) : (
            <div className="d-flex align-items-center justify-content-center flex-column gap-3">
              <img
                src="/assets/images/Cabina New Logo.png"
                alt="Cabina"
                className="d-none d-lg-block"
                style={{ maxWidth: "80px" }}
              />
              <p>{t("Visualizer.select-countertop-storage")}</p>
            </div>
          )}
          <div className="color-finish-container">
            <div className="color-finish-inner-container">
              <h2 className="heading text-center">{t("Visualizer.title")}</h2>
              <Accordion
                activeKey={activeKey}
                onSelect={handleToggle}
                className="accordion-custom-container"
              >
                <Accordion.Item eventKey="0" className="">
                  <Accordion.Header className="accordion-custom-header">
                    {t("Visualizer.model.countertops.title")}{" "}
                    {activeKey === "0" ? (
                      <FaChevronDown className="ms-auto" />
                    ) : (
                      <CgLoadbar className="ms-auto" />
                    )}
                  </Accordion.Header>
                  <Accordion.Body>
                    <div className="row">
                      {counterTopData.countertops.length > 0 &&
                        !isLoading.countertopLoading &&
                        counterTopData?.countertops?.map(
                          (countertop, index) => (
                            <div
                              className="col-4"
                              title={countertop.name}
                              key={index}
                              onClick={() => {
                                setCounterTopData({
                                  ...counterTopData,
                                  selectedCountertop: countertop,
                                });

                                setPriceData({
                                  ...priceData,
                                  counterTopPrice: countertop.price
                                    ? countertop.price
                                    : 0,
                                });
                              }}
                            >
                              <div style={{ position: "relative" }}>
                                <img
                                  src={`${domainUrl}/${countertop.main_image}`}
                                  alt="Countertop Model Image"
                                  style={{ width: "100%", maxWidth: "80px" }}
                                />
                                {counterTopData?.selectedCountertop?.id ===
                                  countertop?.id && (
                                  <FaCheckCircle className="color-check-icon" />
                                )}
                              </div>
                            </div>
                          )
                        )}

                      {counterTopData.countertops.length === 0 &&
                        !isLoading.countertopLoading && (
                          <div className="col-12">
                            <p>{t("Visualizer.model.no-coutertops-found")}</p>
                          </div>
                        )}

                      {isLoading.countertopLoading && (
                        <div className="d-flex align-items-center justify-content-center">
                          <div className="spinner-grow" role="status"></div>
                        </div>
                      )}
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header className="accordion-custom-header">
                    {t("Visualizer.model.countertops-colors.title")}{" "}
                    {activeKey === "1" ? (
                      <FaChevronDown className="ms-auto" />
                    ) : (
                      <CgLoadbar className="ms-auto" />
                    )}
                  </Accordion.Header>
                  <Accordion.Body>
                    {colorsData?.counterTopColors?.length > 0 &&
                      !isLoading.colorsLoading && (
                        <div className="color-container">
                          {colorsData?.counterTopColors.map((color, index) => (
                            <div
                              className="color"
                              key={index}
                              onClick={() =>
                                handleCounterTopColorSelection(color)
                              }
                            >
                              <div style={{ position: "relative" }}>
                                <img
                                  src={`${domainUrl}/${color.compressed_image}`}
                                  alt={color.color}
                                />{" "}
                                {counterTopData?.selectedCTColor?.id ===
                                  color?.id && (
                                  <FaCheckCircle className="color-check-icon" />
                                )}
                              </div>
                              <p className="color-name">{color.color}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    {colorsData?.counterTopColors?.length === 0 &&
                      !isLoading.colorsLoading && (
                        <div className="col-12">
                          <p>{t("Visualizer.model.no-countertops-colors")}</p>
                        </div>
                      )}

                    {isLoading.colorsLoading && (
                      <div className="d-flex align-items-center justify-content-center">
                        <div className="spinner-grow" role="status"></div>
                      </div>
                    )}
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2" className="">
                  <Accordion.Header className="accordion-custom-header">
                    {t("Visualizer.model.storages.title")}{" "}
                    {activeKey === "0" ? (
                      <FaChevronDown className="ms-auto" />
                    ) : (
                      <CgLoadbar className="ms-auto" />
                    )}
                  </Accordion.Header>
                  <Accordion.Body>
                    {storageData.storages.length > 0 &&
                      !isLoading.storageLoading && (
                        <div className="row">
                          {storageData.storages.length > 0 &&
                            !isLoading.storageLoading &&
                            storageData?.storages?.map((storage, index) => (
                              <div
                                className="col-4"
                                key={index}
                                title={storage.name}
                                onClick={() => handleStorageSelection(storage)}
                              >
                                <div style={{ position: "relative" }}>
                                  <img
                                    src={`${domainUrl}/${storage.storage_main_image}`}
                                    alt="Storage Model Image"
                                    style={{ width: "100%", maxWidth: "80px" }}
                                  />
                                  {storageData?.selectedStorage?.storage_id ===
                                    storage?.storage_id && (
                                    <FaCheckCircle className="color-check-icon" />
                                  )}
                                </div>
                              </div>
                            ))}
                        </div>
                      )}

                    {storageData.storages.length === 0 &&
                      !isLoading.storageLoading && (
                        <div className="col-12">
                          <p>{t("Visualizer.model.no-storage")}</p>
                        </div>
                      )}

                    {isLoading.storageLoading && (
                      <div className="d-flex align-items-center justify-content-center">
                        <div className="spinner-grow" role="status"></div>
                      </div>
                    )}
                  </Accordion.Body>
                </Accordion.Item>
                {storageData.selectedStorage &&
                  storageData.selectedStorage.article_no !== "3C.0.0.80" &&
                  storageData.selectedStorage.article_no !== "3C.0.0.100" &&
                  storageData.selectedStorage.article_no !== "3C.0.0.120" &&
                  storageData.selectedStorage.article_no !== "3C.0.0.180" && (
                    <Accordion.Item eventKey="3">
                      <Accordion.Header className="accordion-custom-header">
                        {t("Visualizer.model.storage-colors.title")}{" "}
                        {activeKey === "2" ? (
                          <FaChevronDown className="ms-auto" />
                        ) : (
                          <CgLoadbar className="ms-auto" />
                        )}
                      </Accordion.Header>
                      <Accordion.Body>
                        {colorsData?.storageColors?.length > 0 &&
                          !isLoading.colorsLoading && (
                            <div className="color-container">
                              {colorsData?.storageColors.map((color, index) => (
                                <div
                                  className="color"
                                  key={index}
                                  onClick={() =>
                                    setStorageData({
                                      ...storageData,
                                      selectedStorageColor: color,
                                      oldSelectedStorageColor:
                                        validArticleNos.includes(
                                          storageData?.selectedStorage
                                            ?.article_no
                                        )
                                          ? storageData?.selectedStorageColor
                                          : color,
                                    })
                                  }
                                >
                                  <div style={{ position: "relative" }}>
                                    <img
                                      src={`${domainUrl}/${color.compressed_image}`}
                                      alt={color.color}
                                    />{" "}
                                    {storageData?.selectedStorageColor?.id ===
                                      color.id && (
                                      <FaCheckCircle className="color-check-icon" />
                                    )}
                                  </div>
                                  <p className="color-name">{color.color}</p>
                                </div>
                              ))}
                            </div>
                          )}

                        {colorsData?.storageColors.length === 0 &&
                          !isLoading.colorsLoading && (
                            <div className="col-12">
                              <p>{t("Visualizer.model.no-storage-colors")}</p>
                            </div>
                          )}
                      </Accordion.Body>
                    </Accordion.Item>
                  )}
              </Accordion>
            </div>

            <div className="d-flex align-items-center justify-content-end price-bottom-container">
              {/* <div className="col-3 col-sm-4 col-lg-5 col-xl-4">
                <div className="product-content__price vanity d-flex-align-items-center">
                  <span className="price vanity d-flex align-items-center">
                    {`QAR
                    ${Number(totalPrice).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    })}`}
                  </span>
                </div>
              </div> */}
              {/* <div className="col-5 col-sm-4 col-lg-4 col-xl-5">
                <div className="product-content__quantity mb-0">
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
              </div> */}
              <div className="col-6 text-end col-lg-5">
                <button
                  className="btn btn-fill-out btn-addtocart space-ml--10"
                  // onClick={handleShopNow}
                  onClick={() => router.push("/shop/countertops")}
                >
                  {t("Visualizer.shop-button")}
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </LayoutOne>
  );
}

export default VanityCustomizer;
