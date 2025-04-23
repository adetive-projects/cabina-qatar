import { Fragment, useState } from "react";
import Link from "next/link";
import { getProductCartQuantity } from "../../lib/product";
import { ProductRating } from "../Product";
import { BsShield } from "react-icons/bs";
import { AiOutlineReload } from "react-icons/ai";
import { GiSwapBag } from "react-icons/gi";
import {
  IoLogoFacebook,
  IoLogoTwitter,
  IoLogoGoogleplus,
  IoLogoYoutube,
  IoLogoInstagram,
} from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { addTempCartItem, addToCart } from "../../store/slices/cart-slice";
import {
  addToWishlist,
  deleteFromWishlist,
} from "../../store/slices/wishlist-slice";
import {
  addToCompare,
  deleteFromCompare,
} from "../../store/slices/compare-slice";
import { useRouter } from "next/router";
import Lightbox from "yet-another-react-lightbox";

import ModelViewer from "./ModelViewer";
import { FaXmark } from "react-icons/fa6";
import { domainUrl } from "../../data/api/api";
import {
  addNoStorage,
  removeNoStorage,
  setStorages,
} from "../../store/slices/product-slice";
import { useTranslation } from "react-i18next";

const ProductDescription = ({
  product,
  productPrice,
  discountedPrice,
  cartItems,
  wishlistItem,
  compareItem,
  productContentButtonStyleClass,
  productType,
  productAllDetails,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [selectedProductColor, setSelectedProductColor] = useState(
    product.variation ? product.variation[0].color : ""
  );
  const [selectedProductSize, setSelectedProductSize] = useState(
    product.variation ? product.variation[0].size[0].name : ""
  );
  const [productStock, setProductStock] = useState(
    product.variation ? product.variation[0].size[0].stock : product.stock
  );
  const [quantityCount, setQuantityCount] = useState(1);

  const productCartQty = getProductCartQuantity(
    cartItems,
    product,
    selectedProductColor,
    selectedProductSize
  );

  const router = useRouter();
  const { tempCartItem } = useSelector((state) => state.cart);
  const { storages } = useSelector((state) => state.product);

  const getStorageWidth = (data) => {
    return Number(data?.storage_dimension?.split("x")[0]);
  };

  const handleAddToTempCart = () => {
    if (productType === "countertops") {
      if (
        tempCartItem?.english?.countertop_id &&
        tempCartItem?.arabic?.countertop_id
      ) {
        // FOR EDITING IN VANITY OF SAME SIZE & SAME TYPE
        if (
          tempCartItem?.english.countertop_size === product.size &&
          tempCartItem?.english.countertop_type === product.type &&
          tempCartItem?.isEditing
        ) {
          dispatch(
            addTempCartItem({
              ...tempCartItem,
              // countertop_id: product.id,
              // countertop_price: product.price,
              // countertop_supreme_price: product.supreme_price,
              // countertop_name: product.name,
              // countertop_image: product.main_image,
              // countertop_3d_image: product["3d_image"],
              // countertop_size: product.size,
              // countertop_type: product.type,
              english: {
                ...tempCartItem.english,
                countertop_id: productAllDetails.english_countertops.id,
                countertop_price: productAllDetails.english_countertops.price,
                countertop_supreme_price:
                  productAllDetails.english_countertops.supreme_price,
                countertop_name: productAllDetails.english_countertops.name,
                countertop_image:
                  productAllDetails.english_countertops.main_image,
                countertop_3d_image:
                  productAllDetails.english_countertops["3d_image"],
                countertop_size: productAllDetails.english_countertops.size,
                countertop_type: productAllDetails.english_countertops.type,
              },
              arabic: {
                ...tempCartItem.arabic,
                countertop_id: productAllDetails.arabic_countertops.id,
                countertop_price: productAllDetails.arabic_countertops.price,
                countertop_supreme_price:
                  productAllDetails.arabic_countertops.supreme_price,
                countertop_name: productAllDetails.arabic_countertops.name,
                countertop_image:
                  productAllDetails.arabic_countertops.main_image,
                countertop_3d_image:
                  productAllDetails.arabic_countertops["3d_image"],
                countertop_size: productAllDetails.arabic_countertops.size,
                countertop_type: productAllDetails.arabic_countertops.type,
              },
              isEditing: false,
            })
          );

          router.push("/vanity-customizer");
        } else {
          // FOR EDITING IN VANITY OF DIFFERENT SIZE
          dispatch(
            addTempCartItem({
              // countertop_id: product.id,
              // countertop_price: product.price,
              // countertop_supreme_price: product.supreme_price,
              // countertop_name: product.name,
              // countertop_image: product.main_image,
              // countertop_3d_image: product["3d_image"],
              // countertop_size: product.size,
              // countertop_type: product.type,

              english: {
                countertop_id: productAllDetails.english_countertops.id,
                countertop_price: productAllDetails.english_countertops.price,
                countertop_supreme_price:
                  productAllDetails.english_countertops.supreme_price,
                countertop_name: productAllDetails.english_countertops.name,
                countertop_image:
                  productAllDetails.english_countertops.main_image,
                countertop_3d_image:
                  productAllDetails.english_countertops["3d_image"],
                countertop_size: productAllDetails.english_countertops.size,
                countertop_type: productAllDetails.english_countertops.type,
              },
              arabic: {
                countertop_id: productAllDetails.arabic_countertops.id,
                countertop_price: productAllDetails.arabic_countertops.price,
                countertop_supreme_price:
                  productAllDetails.arabic_countertops.supreme_price,
                countertop_name: productAllDetails.arabic_countertops.name,
                countertop_image:
                  productAllDetails.arabic_countertops.main_image,
                countertop_3d_image:
                  productAllDetails.arabic_countertops["3d_image"],
                countertop_size: productAllDetails.arabic_countertops.size,
                countertop_type: productAllDetails.arabic_countertops.type,
              },
            })
          );

          if (product.type === "Classic" || product.type === "كلاسيكي") {
            dispatch(addNoStorage(product.main_image));
          } else {
            dispatch(removeNoStorage());
          }
          router.push("/shop/storages");
        }
      } else {
        // CHOOSING IN VANITY FOR FIRST TIME
        dispatch(
          addTempCartItem({
            // countertop_id: product.id,
            // countertop_price: product.price,
            // countertop_supreme_price: product.supreme_price,
            // countertop_name: product.name,
            // countertop_image: product.main_image,
            // countertop_3d_image: product["3d_image"],
            // countertop_size: product.size,
            // countertop_type: product.type,

            english: {
              countertop_id: productAllDetails.english_countertops.id,
              countertop_price: productAllDetails.english_countertops.price,
              countertop_supreme_price:
                productAllDetails.english_countertops.supreme_price,
              countertop_name: productAllDetails.english_countertops.name,
              countertop_image:
                productAllDetails.english_countertops.main_image,
              countertop_3d_image:
                productAllDetails.english_countertops["3d_image"],
              countertop_size: productAllDetails.english_countertops.size,
              countertop_type: productAllDetails.english_countertops.type,
            },
            arabic: {
              countertop_id: productAllDetails.arabic_countertops.id,
              countertop_price: productAllDetails.arabic_countertops.price,
              countertop_supreme_price:
                productAllDetails.arabic_countertops.supreme_price,
              countertop_name: productAllDetails.arabic_countertops.name,
              countertop_image: productAllDetails.arabic_countertops.main_image,
              countertop_3d_image:
                productAllDetails.arabic_countertops["3d_image"],
              countertop_size: productAllDetails.arabic_countertops.size,
              countertop_type: productAllDetails.arabic_countertops.type,
            },
            isEditing: false,
          })
        );

        if (product.type === "Classic" || product.type === "كلاسيكي") {
          dispatch(addNoStorage(product.main_image));
        } else {
          dispatch(removeNoStorage());
        }
        router.push("/shop/storages");
      }
    } else if (productType === "storages") {
      dispatch(
        addTempCartItem({
          // ...tempCartItem,
          // storage_price: product.price,
          // storage_supreme_price: product.supreme_price,
          // storage_id: product.id,
          // storage_name: product.name,
          // storage_image: product.main_image,
          // storage_3d_image: product["3d_image"],
          // storage_article_no: product.article_no,
          english: {
            ...tempCartItem.english,
            storage_price: productAllDetails.english_storage.price,
            storage_supreme_price:
              productAllDetails.english_storage.supreme_price,
            storage_id: productAllDetails.english_storage.id,
            storage_name: productAllDetails.english_storage.name,
            storage_image: productAllDetails.english_storage.main_image,
            storage_3d_image: productAllDetails.english_storage["3d_image"],
            storage_article_no: productAllDetails.english_storage.article_no,
          },
          arabic: {
            ...tempCartItem.arabic,
            storage_price: productAllDetails.arabic_storage.price,
            storage_supreme_price:
              productAllDetails.arabic_storage.supreme_price,
            storage_id: productAllDetails.arabic_storage.id,
            storage_name: productAllDetails.arabic_storage.name,
            storage_image: productAllDetails.arabic_storage.main_image,
            storage_3d_image: productAllDetails.arabic_storage["3d_image"],
            storage_article_no: productAllDetails.arabic_storage.article_no,
          },
          quantity: 1,
          isEditing: false,
        })
      );
      router.push("/vanity-customizer");
    }
  };

  const [open, setOpen] = useState(false);
  const [renderCanvas, setRenderCanvas] = useState(false);

  const handleOpenPopup = () => {
    setOpen(true);
    setTimeout(() => {
      setRenderCanvas(true);
    }, 500);
  };

  const handleClosePopup = () => {
    setOpen(false);
    setRenderCanvas(false);
  };

  const productSpecification = product.specification
    .split("\n")
    .filter((item) => item)
    .map((singleSpec) => {
      const [key, value] = singleSpec.split(":");
      return { key, value };
    });

  return (
    <div className="product-content">
      <h2 className="product-content__title space-mb--10 text-start">
        {product.name}
      </h2>
      <div className="product-content__price-rating-wrapper space-mb--10">
        <div className="product-content__price d-flex-align-items-center">
          {product.discount ? (
            <Fragment>
              <span className="price">${discountedPrice}</span>
              <del>${productPrice}</del>
              <span className="on-sale">{product.discount}% Off</span>
            </Fragment>
          ) : (
            <span className="price">
              QAR{" "}
              {Number(product.price).toLocaleString("en-US", {
                minimumFractionDigits: 2,
              })}
            </span>
          )}
        </div>
        {/* {product.rating && product.rating > 0 ? (
          <div className="product-content__rating-wrap">
            <div className="product-content__rating">
              <ProductRating ratingValue={product.rating} />
              <span>({product.ratingCount})</span>
            </div>
          </div>
        ) : (
          ""
        )} */}
      </div>
      <div className="product-content__description space-mb--20">
        <p>{product.details}</p>
      </div>

      {/* <div className="product-content__sort-info space-mb--20">
        <ul>
          <li>
            <BsShield /> 1 Year Brand Warranty
          </li>
          <li>
            <AiOutlineReload /> 30 Days Return Policy
          </li>
          <li>
            <GiSwapBag /> Cash on Delivery available
          </li>
        </ul>
      </div> */}

      {/* {product.variation ? (
        <div className="product-content__size-color">
          <div className="product-content__color space-mb--10">
            <div className="product-content__color__title">Color</div>
            <div className="product-content__color__content">
              {product.variation.map((single, i) => {
                return (
                  <Fragment key={i}>
                    <input
                      type="radio"
                      value={single.color}
                      name="product-color"
                      id={single.color}
                      checked={
                        single.color === selectedProductColor ? "checked" : ""
                      }
                      onChange={() => {
                        setSelectedProductColor(single.color);
                        setSelectedProductSize(single.size[0].name);
                        setProductStock(single.size[0].stock);
                        setQuantityCount(1);
                      }}
                    />
                    <label
                      htmlFor={single.color}
                      style={{ backgroundColor: single.colorCode }}
                    ></label>
                  </Fragment>
                );
              })}
            </div>
          </div>
          <div className="product-content__size space-mb--20">
            <div className="product-content__size__title">Size</div>
            <div className="product-content__size__content">
              {product.variation &&
                product.variation.map((single) => {
                  return single.color === selectedProductColor
                    ? single.size.map((singleSize, i) => {
                        return (
                          <Fragment key={i}>
                            <input
                              type="radio"
                              value={singleSize.name}
                              checked={
                                singleSize.name === selectedProductSize
                                  ? "checked"
                                  : ""
                              }
                              id={singleSize.name}
                              onChange={() => {
                                setSelectedProductSize(singleSize.name);
                                setProductStock(singleSize.stock);
                                setQuantityCount(1);
                              }}
                            />
                            <label htmlFor={singleSize.name}>
                              {singleSize.name}
                            </label>
                          </Fragment>
                        );
                      })
                    : "";
                })}
            </div>
          </div>
        </div>
      ) : (
        ""
      )} */}
      <ul className={`product-content__product-meta text-start`}>
        {product.specification && (
          <Fragment>
            {productSpecification.length > 0 ? (
              <Fragment>
                <div className="row">
                  <div className="col-md-6">
                    <ul>
                      {productSpecification
                        .slice(0, Math.ceil(productSpecification.length / 2))
                        .map((spec, index) => (
                          <li key={index}>
                            <span className="font-weight--bold">
                              {spec.key}
                            </span>
                            : {spec.value}
                          </li>
                        ))}
                    </ul>
                  </div>
                  <div className="col-md-6">
                    <ul>
                      {productSpecification
                        .slice(Math.ceil(productSpecification.length / 2))
                        .map((spec, index) => (
                          <li key={index}>
                            <span className="font-weight--bold">
                              {spec.key}
                            </span>
                            : {spec.value}
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              </Fragment>
            ) : (
              ""
            )}
          </Fragment>
        )}
      </ul>
      <hr />
      {product.affiliateLink ? (
        <div className="product-content__quality">
          <div className="product-content__cart btn-hover">
            <a
              href={product.affiliateLink}
              target="_blank"
              className="btn btn-fill-out btn-addtocart"
            >
              Buy Now
            </a>
          </div>
        </div>
      ) : (
        <Fragment>
          <div
            className={`${
              productContentButtonStyleClass
                ? productContentButtonStyleClass
                : "product-content__button-wrapper d-flex align-items-center"
            }`}
          >
            {/* <div className="product-content__quantity">
              <div className="cart-plus-minus">
                <button
                  onClick={() =>
                    setQuantityCount(quantityCount > 1 ? quantityCount - 1 : 1)
                  }
                  className="qtybutton"
                >
                  -
                </button>
                <input
                  className="cart-plus-minus-box"
                  type="text"
                  value={quantityCount}
                  readOnly
                />
                <button
                  onClick={() =>
                    setQuantityCount(
                      quantityCount < productStock - productCartQty
                        ? quantityCount + 1
                        : quantityCount
                    )
                  }
                  className="qtybutton"
                >
                  +
                </button>
              </div>
            </div> */}
            <div className="d-flex align-items-center justify-content-between w-100">
              {productType === "countertops" ? (
                <button
                  onClick={handleAddToTempCart}
                  className="btn btn-fill-out btn-addtocart space-ml--10"
                >
                  <i className="icon-basket-loaded" />{" "}
                  {t("shop.single-product.add-to-cart")}
                </button>
              ) : tempCartItem.english.countertop_id &&
                tempCartItem.arabic.countertop_id ? (
                <button
                  onClick={handleAddToTempCart}
                  className="btn btn-fill-out btn-addtocart space-ml--10"
                >
                  <i className="icon-basket-loaded" />{" "}
                  {t("shop.single-product.add-to-cart")}
                </button>
              ) : (
                <button className="btn btn-fill-out btn-addtocart" disabled>
                  {t("shop.single-product.select-countertop")}
                </button>
              )}
              <button
                className="btn btn-fill-out btn-addtocart space-ml--10"
                onClick={handleOpenPopup}
              >
                {t("shop.single-product.view-3d")}
              </button>
            </div>
            {open && (
              <div className="own-modal-overlay">
                <div className="own-modal-content">
                  <button className="own-close-btn" onClick={handleClosePopup}>
                    <FaXmark />
                  </button>

                  {/* Render Canvas only after the delay */}
                  {renderCanvas ? (
                    <div style={{ height: "100%", width: "100%" }}>
                      {product["3d_image"] ? (
                        <ModelViewer
                          modelPath={`${domainUrl}/${product["3d_image"]}`}
                        />
                      ) : (
                        <div className="d-flex align-items-center justify-content-center h-100">
                          <p>The 3D Model is not available</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div class="spinner-grow" role="status"></div>
                  )}
                </div>
              </div>
            )}

            {/* {productStock && productStock > 0 ? (
              <button
                onClick={() =>
                  dispatch(addToCart({
                    ...product,
                    quantity: quantityCount,
                    selectedProductColor: selectedProductColor ? selectedProductColor : product.selectedProductColor ? product.selectedProductColor : null,
                    selectedProductSize: selectedProductSize ? selectedProductSize : product.selectedProductSize ? product.selectedProductSize : null
                  }))
                }
                disabled={productCartQty >= productStock}
                className="btn btn-fill-out btn-addtocart space-ml--10"
              >
                <i className="icon-basket-loaded" /> Add To Cart
              </button>
            ) : (
              <button className="btn btn-fill-out btn-addtocart" disabled>
                Out of Stock
              </button>
            )} */}

            {/* <button
              className={`product-content__compare ${
                compareItem !== undefined ? "active" : ""
              }`}
              title={
                compareItem !== undefined
                  ? "Added to compare"
                  : "Add to compare"
              }
              onClick={
                compareItem !== undefined
                  ? () => dispatch(deleteFromCompare(product))
                  : () => dispatch(addToCompare(product))
              }
            >
              <i className="icon-shuffle" />
            </button>

            <button
              className={`product-content__wishlist ${
                wishlistItem !== undefined ? "active" : ""
              }`}
              title={
                wishlistItem !== undefined
                  ? "Added to wishlist"
                  : "Add to wishlist"
              }
              onClick={
                wishlistItem !== undefined
                  ? () => dispatch(deleteFromWishlist(product.id))
                  : () => dispatch(addToWishlist(product))
              }
            >
              <i className="icon-heart" />
            </button> */}
          </div>
        </Fragment>
      )}
      <hr />

      {/* <ModelViewer /> */}
      {/* <ul className="product-content__product-meta">
        <li>
          SKU: <span>{product.sku}</span>
        </li>
        <li>
          Category:
          {product.category &&
            product.category.map((item, index, arr) => {
              return (
                <Link
                  href="/shop/grid-left-sidebar"
                  key={index}
                >
                  {item + (index !== arr.length - 1 ? ", " : "")}
                </Link>
              );
            })}
        </li>
        <li>
          Tags:
          {product.tag &&
            product.tag.map((item, index, arr) => {
              return (
                <Link
                  href="/shop/grid-left-sidebar"
                  key={index}
                >
                  {item + (index !== arr.length - 1 ? ", " : "")}
                </Link>
              );
            })}
        </li>
      </ul> */}
      {/* <div className="product-content__product-share space-mt--15 text-start">
        <span>Share:</span>
        <ul className="social-icons">
          <li>
            <a href="#">
              <IoLogoFacebook />
            </a>
          </li>
          <li>
            <a href="#">
              <IoLogoTwitter />
            </a>
          </li>
          <li>
            <a href="#">
              <IoLogoGoogleplus />
            </a>
          </li>
          <li>
            <a href="#">
              <IoLogoYoutube />
            </a>
          </li>
          <li>
            <a href="#">
              <IoLogoInstagram />
            </a>
          </li>
        </ul>
      </div> */}
    </div>
  );
};

export default ProductDescription;
