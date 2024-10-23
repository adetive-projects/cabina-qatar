import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import Paginator from "react-hooks-paginator";
import { LayoutOne } from "../../layouts";
import { BreadcrumbOne } from "../../components/Breadcrumb";
import { Sidebar, ShopHeader, ShopProducts } from "../../components/Shop";
import { getSortedProducts } from "../../lib/product";
import { useRouter } from "next/router";
import { apiUrl } from "../../data/api/api";
import { setStorages } from "../../store/slices/product-slice";
import { Trans, useTranslation } from "react-i18next";

const GridLeftSidebar = () => {
  const dispatch = useDispatch();

  const { storages } = useSelector((state) => state.product);
  const { tempCartItem } = useSelector((state) => state.cart);

  const [isCounterTopAvailable, setIsCounterTopAvailable] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

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
  const [currentStorage, setCurrentStorage] = useState([]);

  const [sortParams, setSortParams] = useState({
    sizes: "",
    sinks: "",
    mounts: "",
    kitParts: "",
    materials: "",
  });

  const getProduct = async () => {
    try {
      const response = await fetch(`${apiUrl}/single-countertop-storages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: tempCartItem?.english?.countertop_id,
        }),
      });
      const data = await response.json();

      if (response.ok) {
        if (tempCartItem?.english?.countertop_id) {
          dispatch(setStorages(data.data));
          const c =
            currentLanguage === "ar"
              ? data.data.arabic_storages
              : data.data.english_storages;

          setCurrentStorage(c);
          setIsLoading(false);
        } else {
          setIsCounterTopAvailable(false);
          setIsLoading(false);
        }
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
    getProduct();
  }, []);

  useEffect(() => {
    setCurrentStorage(
      currentLanguage === "ar"
        ? storages.arabic_storages
        : storages.english_storages
    );
  }, [currentLanguage, storages]);

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
    let sortedProducts = getSortedProducts(currentStorage, sortParams);
    // const filterSortedProducts = getSortedProducts(
    //   sortedProducts,
    //   filterSortType,
    //   filterSortValue
    // );
    // sortedProducts = filterSortedProducts;
    setSortedProducts(sortedProducts);
    setCurrentData(sortedProducts.slice(offset, offset + pageLimit));
  }, [offset, currentStorage, sortParams]);

  // console.log(currentStorage);
  return (
    <LayoutOne>
      {/* breadcrumb */}
      <BreadcrumbOne pageTitle={t("shop.storage.breadcrumb.title")}>
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

              {isLoading && (
                <div className="text-center">
                  <div className="spinner-grow" role="status"></div>
                </div>
              )}
              {/* shop products */}
              {isCounterTopAvailable ? (
                <ShopProducts
                  layout={layout}
                  products={currentData}
                  productType={"storages"}
                />
              ) : (
                <p className="text-center">
                  <Trans i18nKey="shop.storage.choose-countertop">
                    You can choose your countertop
                    <Link
                      href="/shop/countertops"
                      className="text-decoration-underline"
                    >
                      here
                    </Link>
                  </Trans>
                </p>
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
                products={currentStorage}
                getSortParams={getSortParams}
                productType={"storages"}
              />
            </Col>
          </Row>
        </Container>
      </div>
    </LayoutOne>
  );
};

export default GridLeftSidebar;
