import { Fragment, useEffect } from "react";
import { IoIosArrowForward } from "react-icons/io";

import {
  setActiveSort,
  getIndividualDimension,
  getIndividualSink,
  getIndividualMount,
  getIndividualKitParts,
  getIndividualMaterials,
} from "../../lib/product";
import { ProductRating } from "../../components/Product";
import { useTranslation } from "react-i18next";

const Sidebar = ({ products, getSortParams, productType }) => {
  const dimensions = getIndividualDimension(products);
  const sinks = getIndividualSink(products);
  const mounts = getIndividualMount(products);

  const kitParts = getIndividualKitParts(products);
  const materials = getIndividualMaterials(products);

  const { t } = useTranslation();

  const widgets =
    productType === "countertops" ? (
      <Fragment>
        <div className="widget">
          <h5 className="widget__title">{t("shop.vanity.sidebar.size")}</h5>
          {dimensions.length > 0 ? (
            <ul className="widget__sizes one">
              <li>
                <button
                  onClick={(e) => {
                    getSortParams("sizes", "");
                    setActiveSort(e, "widget__sizes.one");
                  }}
                >
                  {t("shop.vanity.sidebar.all-sizes")}
                </button>
              </li>
              {dimensions.map((size, i) => {
                return (
                  <li key={i}>
                    <button
                      onClick={(e) => {
                        getSortParams("sizes", size);
                        setActiveSort(e, "widget__sizes.one");
                      }}
                    >
                      {size}
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : (
            t("shop.vanity.sidebar.no-size")
          )}
        </div>
        <div className="widget">
          <h5 className="widget__title">{t("shop.vanity.sidebar.sinks")}</h5>
          {sinks.length > 0 ? (
            <ul className="widget__sizes two">
              <li>
                <button
                  onClick={(e) => {
                    getSortParams("sinks", "");
                    setActiveSort(e, "widget__sizes.two");
                  }}
                >
                  {t("shop.vanity.sidebar.all-sinks")}
                </button>
              </li>
              {sinks.map((sink, i) => {
                return (
                  <li key={i}>
                    <button
                      onClick={(e) => {
                        getSortParams("sinks", sink);
                        setActiveSort(e, "widget__sizes.two");
                      }}
                    >
                      {sink}
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : (
            t("shop.vanity.sidebar.no-sinks")
          )}
        </div>
        <div className="widget">
          <h5 className="widget__title">
            {t("shop.vanity.sidebar.all-mounts")}
          </h5>
          {mounts.length > 0 ? (
            <ul className="widget__sizes three">
              <li>
                <button
                  onClick={(e) => {
                    getSortParams("mounts", "");
                    setActiveSort(e, "widget__sizes.three");
                  }}
                >
                  {t("shop.vanity.sidebar.all-mounts")}
                </button>
              </li>
              {mounts.map((mount, i) => {
                return (
                  <li key={i}>
                    <button
                      onClick={(e) => {
                        getSortParams("mounts", mount);
                        setActiveSort(e, "widget__sizes.three");
                      }}
                    >
                      {mount}
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : (
            t("shop.vanity.sidebar.no-mounts")
          )}
        </div>
      </Fragment>
    ) : productType === "storages" ? (
      <Fragment>
        <div className="widget">
          <h5 className="widget__title">
            {t("shop.storage.sidebar.kitParts")}
          </h5>
          {kitParts.length > 0 ? (
            <ul className="widget__sizes four">
              <li>
                <button
                  onClick={(e) => {
                    getSortParams("kitParts", "");
                    setActiveSort(e, "widget__sizes.four");
                  }}
                >
                  {t("shop.storage.sidebar.all-kitParts")}
                </button>
              </li>
              {kitParts.map((kitPart, i) => {
                return (
                  <li key={i}>
                    <button
                      onClick={(e) => {
                        getSortParams("kitParts", kitPart);
                        setActiveSort(e, "widget__sizes.four");
                      }}
                    >
                      {kitPart}
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : (
            t("shop.storage.sidebar.no-kitParts")
          )}
        </div>
        {/* <div className="widget">
          <h5 className="widget__title">Materials</h5>
          {materials.length > 0 ? (
            <ul className="widget__sizes">
              <li>
                <button
                  onClick={(e) => {
                    getSortParams("materials", "");
                    setActiveSort(e);
                  }}
                >
                  All Materials
                </button>
              </li>
              {materials.map((material, i) => {
                return (
                  <li key={i}>
                    <button
                      onClick={(e) => {
                        getSortParams("materials", material);
                        setActiveSort(e);
                      }}
                    >
                      {material}
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : (
            "No Materials found"
          )}
        </div> */}
      </Fragment>
    ) : null;

  return <div className="sidebar">{widgets}</div>;
};

export default Sidebar;
