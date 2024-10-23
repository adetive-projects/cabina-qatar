import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import Paginator from "react-hooks-paginator";
import { LayoutOne } from "../../layouts";
import { BreadcrumbOne } from "../../components/Breadcrumb";
import { Sidebar, ShopHeader, ShopProducts } from "../../components/Shop";
import {
  getSortedCountertopProducts,
  getSortedProducts,
} from "../../lib/product";
import { useRouter } from "next/router";
import { apiUrl } from "../../data/api/api";
import {
  setColors,
  setCounterTops,
  setStorages,
} from "../../store/slices/product-slice";
import { useTranslation } from "react-i18next";

const GridLeftSidebar = () => {
  const dispatch = useDispatch();

  const { products, counterTops } = useSelector((state) => state.product);
  const [isLoading, setIsLoading] = useState(true);

  const [layout, setLayout] = useState("grid");
  const [sortType, setSortType] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [filterSortType, setFilterSortType] = useState("filterSort");
  const [filterSortValue, setFilterSortValue] = useState("default");
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [shopTopFilterStatus, setShopTopFilterStatus] = useState(false);
  const [currentCounterTop, setCurrentCounterTop] = useState([]);

  // console.log(currentCounterTop);
  const [sortParams, setSortParams] = useState({
    sizes: "",
    sinks: "",
    mounts: "",
    kitParts: "",
    materials: "",
  });

  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const getProduct = async () => {
    try {
      const response = await fetch(`${apiUrl}/countertops`);
      const data = await response.json();
      if (response.ok) {
        dispatch(setCounterTops(data.data));
        const c =
          currentLanguage === "ar"
            ? data.data.arabic_countertops
            : data.data.english_countertops;

        setCurrentCounterTop(c);
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

  const fetchColors = async () => {
    try {
      const response = await fetch(`${apiUrl}/colors`);
      const data = await response.json();

      if (response.ok) {
        dispatch(setColors(data.data));
      } else {
        console.error("Error:", data.message);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const pageLimit = 12;

  const getLayout = (layout) => {
    setLayout(layout);
  };

  // const getSortParams = (sortType, sortValue) => {
  //   setSortType(sortType);
  //   setSortValue(sortValue);
  // };

  const getSortParams = (sortType, sortValue) => {
    setSortParams((prevSortParams) => ({
      ...prevSortParams,
      [sortType]: sortValue,
    }));
  };

  const getFilterSortParams = (sortType, sortValue) => {
    setFilterSortType(sortType);
    setFilterSortValue(sortValue);
  };

  useEffect(() => {
    getProduct();
    fetchColors();
  }, []);

  useEffect(() => {
    setCurrentCounterTop(
      currentLanguage === "ar"
        ? counterTops.arabic_countertops
        : counterTops.english_countertops
    );
  }, [currentLanguage, counterTops]);

  useEffect(() => {
    let sortedProducts = getSortedProducts(currentCounterTop, sortParams);
    // const filterSortedProducts = getSortedProducts(
    //   sortedProducts,
    //   filterSortType,
    //   filterSortValue
    // );
    // sortedProducts = filterSortedProducts;
    const filterSortedProducts = getSortedCountertopProducts(sortedProducts);
    sortedProducts = filterSortedProducts;
    setSortedProducts(sortedProducts);
    setCurrentData(sortedProducts.slice(offset, offset + pageLimit));
  }, [offset, currentCounterTop, sortParams]);

  return (
    <LayoutOne>
      {/* breadcrumb */}
      <BreadcrumbOne pageTitle={t("shop.vanity.breadcrumb.title")}>
        {/* <ol className="breadcrumb justify-content-md-end align-items-center">
          <li className="breadcrumb-item">
            <Link href="/">Home</Link>
          </li>
          <li className="breadcrumb-item active">Shop</li>
        </ol> */}
      </BreadcrumbOne>
      <div className="shop-content space-pt--r100 space-pb--r100">
        <Container>
          <Row>
            <Col lg={9}>
              {/* shop page header */}
              <ShopHeader
                getLayout={getLayout}
                getFilterSortParams={getFilterSortParams}
                shopTopFilterStatus={shopTopFilterStatus}
                setShopTopFilterStatus={setShopTopFilterStatus}
                layout={layout}
              />

              {/* shop products */}
              {currentData.length > 0 ? (
                <ShopProducts
                  layout={layout}
                  products={currentData}
                  productType={"countertops"}
                />
              ) : isLoading ? (
                <div className="text-center">
                  <div className="spinner-grow" role="status"></div>
                </div>
              ) : (
                <p className="text-center">{t("shop.vanity.no-product")}</p>
              )}

              {/* shop product pagination */}
              <div className="pagination pagination-style pagination-style--two justify-content-center">
                <Paginator
                  totalRecords={sortedProducts.length}
                  pageLimit={pageLimit}
                  pageNeighbours={2}
                  setOffset={setOffset}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  pageContainerClass="mb-0 mt-0"
                  pagePrevText="«"
                  pageNextText="»"
                />
              </div>
            </Col>
            <Col lg={3} className="order-lg-first mt-4 pt-2 mt-lg-0 pt-lg-0">
              {/* sidebar */}
              <Sidebar
                products={currentCounterTop}
                getSortParams={getSortParams}
                productType={"countertops"}
              />
            </Col>
          </Row>
        </Container>
      </div>
    </LayoutOne>
  );
};

export default GridLeftSidebar;
