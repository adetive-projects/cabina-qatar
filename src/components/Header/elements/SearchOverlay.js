import { Fragment, useEffect, useState } from "react";
import { IoIosSearch, IoIosClose } from "react-icons/io";
import clsx from "clsx";
import { apiUrl } from "../../../data/api/api";
import Link from "next/link";
import { useTranslation } from "react-i18next";

const SearchOverlay = ({ activeStatus, getActiveStatus }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { t } = useTranslation();

  const getProduct = async () => {
    try {
      const response = await fetch(`${apiUrl}/countertops`);
      const data = await response.json();
      if (response.ok) {
        setAllProducts(data.data.english_countertops);
      } else {
        console.error("Error:", data.message);
      }
    } catch (error) {
      console.error("Error:", error.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getProduct();

    return () => {};
  }, []);

  const handleSearch = (e) => {
    const searchValue = (e.target.value || "").toLowerCase();
    if (searchValue === "") {
      setSearchResult([]);
      return;
    }

    const filteredResult = allProducts.filter((item) =>
      item.name.toLowerCase().includes(searchValue)
    );

    setSearchResult(filteredResult);
  };
  return (
    <Fragment>
      <div className={clsx("search-wrap", activeStatus && "open")}>
        <button
          className="close-search"
          onClick={() => {
            getActiveStatus(false);
          }}
        >
          <IoIosClose />
        </button>
        <form>
          <input
            type="text"
            placeholder={t("header-top.search")}
            className="form-control"
            id="search-input"
            onChange={handleSearch}
          />
          <button type="submit" className="search-icon">
            <IoIosSearch />
          </button>
        </form>
        <div className="search-result--wrapper">
          <div className="search-results mt-3">
            {searchResult.length > 0 &&
              !isLoading &&
              searchResult?.map((result) => (
                <Link
                  href={`/shop/countertops-product/${result.id}`}
                  key={result.id}
                  className="text-decoration-none w-100"
                >
                  <p className="p-2 mb-3 text-white border rounded-0 w-100">
                    {result.name}
                  </p>
                </Link>
              ))}

            {/* {searchResult.length === 0 && !isLoading && (
              <p className="p-2 mb-3 text-white border rounded-0 w-100 text-center">
                No result found
              </p>
            )} */}

            {isLoading && (
              <p className="p-2 mb-3 text-white border rounded-0 w-100">
                {t("header-top.loading")}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className={clsx("search-overlay", activeStatus && "open")} />
    </Fragment>
  );
};

export default SearchOverlay;
