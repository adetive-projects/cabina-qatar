import { Fragment, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import ProductModal from "./elements/ProductModal";
import { ProductRating } from "../Product";
import { addTempCartItem, addToCart } from "../../store/slices/cart-slice";
import {
  addToWishlist,
  deleteFromWishlist,
} from "../../store/slices/wishlist-slice";
import {
  addToCompare,
  deleteFromCompare,
} from "../../store/slices/compare-slice";
import { domainUrl } from "../../data/api/api";
import { useRouter } from "next/router";

const ProductGridList = ({
  product,
  discountedPrice,
  productPrice,
  cartItem,
  wishlistItem,
  compareItem,
  productType,
}) => {
  const [modalShow, setModalShow] = useState(false);
  const [colorImage, setColorImage] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const { tempCartItem } = useSelector((state) => state.cart);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleSelectingNoStorage = () => {
    if (product.storage_id === "no" && productType === "storages") {
      router.push("/vanity-customizer");
      dispatch(
        addTempCartItem({
          // storage_price: 0,
          // storage_id: product.storage_id,
          // storage_name: product.name,
          // storage_image: product.main_image,
          // storage_supreme_price: 0,
          // storage_3d_image: "",
          arabic: {
            ...tempCartItem.arabic,
            storage_price: 0,
            storage_id: "no",
            storage_name: "لا توجد مساحة تخزين",
            storage_image: product.main_image,
            storage_supreme_price: 0,
            storage_3d_image: "",
          },

          english: {
            ...tempCartItem.english,
            storage_price: 0,
            storage_id: "no",
            storage_name: "No Storage",
            storage_image: product.main_image,
            storage_supreme_price: 0,
            storage_3d_image: "",
          },
          quantity: 1,
          isEditing: false,
        })
      );
    } else if (productType === "countertops") {
      router.push(`/shop/${productType}-product/${product.id}`);
    } else if (productType === "storages") {
      router.push(`/shop/${productType}-product/${product.storage_id}`);
    } else {
      null;
    }
  };

  return (
    <Fragment>
      <div className="product-grid">
        <div className="product-grid__image">
          <div style={{ cursor: "pointer" }} onClick={handleSelectingNoStorage}>
            <img
              src={`${domainUrl}/${
                productType === "countertops"
                  ? isHovered
                    ? product.sub_image
                    : product.main_image
                  : productType === "storages"
                  ? isHovered
                    ? product.storage_sub_image
                    : product.storage_main_image
                  : ""
              }`}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              alt={product.name || product.storage_name}
              className={isHovered ? "hover" : ""}
            />
          </div>
          {/* <div className="product-grid__badge-wrapper">
            {product.new ? <span className="pr-flash">NEW</span> : ""}
            {product.featured ? (
              <span className="pr-flash bg-danger">HOT</span>
            ) : (
              ""
            )}
            {product.discount ? (
              <span className="pr-flash bg-success">SALE</span>
            ) : (
              ""
            )}
          </div> */}
          {/* <div className="product-grid__action-box">
            <ul>
              <li>
                {product.affiliateLink ? (
                  <a href={product.affiliateLink} target="_blank">
                    <i className="icon-action-redo" />
                  </a>
                ) : product.variation && product.variation.length >= 1 ? (
                  (<Link href={"/countertop-product/" + product.slug}>
                    <i className="icon-wrench" />
                  </Link>)
                ) : product.stock && product.stock > 0 ? (
                  <button
                    onClick={() => dispatch(addToCart(product))}
                    disabled={
                      cartItem !== undefined &&
                      cartItem.quantity >= cartItem.stock
                    }
                    className={cartItem !== undefined ? "active" : ""}
                  >
                    <i className="icon-basket-loaded" />
                  </button>
                ) : (
                  <button disabled>
                    <i className="icon-basket-loaded" />
                  </button>
                )}
              </li>
              <li>
                <button
                  onClick={
                    compareItem !== undefined
                      ? () => dispatch(deleteFromCompare(product.id))
                      : () => dispatch(addToCompare(product))
                  }
                  className={compareItem !== undefined ? "active" : ""}
                >
                  <i className="icon-shuffle" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => setModalShow(true)}
                  className="d-none d-lg-block"
                >
                  <i className="icon-magnifier-add" />
                </button>
              </li>
              <li>
                <button
                  onClick={
                    wishlistItem !== undefined
                      ? () => dispatch(deleteFromWishlist(product.id))
                      : () => dispatch(addToWishlist(product))
                  }
                  className={wishlistItem !== undefined ? "active" : ""}
                >
                  <i className="icon-heart" />
                </button>
              </li>
            </ul>
          </div> */}
        </div>
        <div className="product-grid__info">
          <h6 className="product-title">
            <div
              style={{ cursor: "pointer" }}
              className={product?.storage_id === "no" ? "no-storage-card" : ""}
              onClick={handleSelectingNoStorage}
            >
              {productType === "countertops"
                ? product.name
                : productType === "storages"
                ? product.storage_name
                : ""}
            </div>
          </h6>
          {/* <div className="product-price">
            {product.discount ? (
              <Fragment>
                <span className="price">QAR {discountedPrice}</span>
                <del>QAR {productPrice}</del>
                <span className="on-sale">{product.discount}% Off</span>
              </Fragment>
            ) : (
              <span className="price">QAR {productPrice}</span>
            )}
          </div> */}
          {/* <div className="rating-wrap">
            <ProductRating ratingValue={product.rating} />
            <span className="rating-num">({product.ratingCount})</span>
          </div> */}

          {/* {product.variation ? (
            <div className="product-switch-wrap">
              <ul>
                {product.variation.map((single, key) => {
                  return (
                    <li key={key}>
                      <button
                        style={{ backgroundColor: `${single.colorCode}` }}
                        onClick={() => setColorImage(single.image)}
                        className={
                          colorImage === single.image ? "active" : ""
                        }
                      />
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : (
            ""
          )} */}
        </div>
      </div>
      <div className="product-list">
        <div className="product-list__image">
          <div style={{ cursor: "pointer" }} onClick={handleSelectingNoStorage}>
            <img
              src={`${domainUrl}/${
                productType === "countertops"
                  ? isHovered
                    ? product.sub_image
                    : product.main_image
                  : productType === "storages"
                  ? isHovered
                    ? product.storage_sub_image
                    : product.storage_main_image
                  : ""
              }`}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              alt={product.name || product.storage_name}
              className={isHovered ? "hover" : ""}
            />
          </div>
          {/* <div className="product-grid__badge-wrapper">
            {product.new ? <span className="pr-flash">NEW</span> : ""}
            {product.featured ? (
              <span className="pr-flash bg-danger">HOT</span>
            ) : (
              ""
            )}
            {product.discount ? (
              <span className="pr-flash bg-success">SALE</span>
            ) : (
              ""
            )}
          </div> */}
        </div>
        <div className="product-list__info">
          <h6 className="product-title">
            <div
              style={{ cursor: "pointer" }}
              onClick={handleSelectingNoStorage}
            >
              {productType === "countertops"
                ? product.name
                : productType === "storages"
                ? product.storage_name
                : ""}
            </div>
          </h6>
          <div className="d-flex justify-content-between">
            {/* <div className="product-price">
              {product.discount ? (
                <Fragment>
                  <span className="price">${discountedPrice}</span>
                  <del>QAR {productPrice}</del>
                  <span className="on-sale">{product.discount}% Off</span>
                </Fragment>
              ) : (
                <span className="price">QAR {productPrice}</span>
              )}
            </div> */}
            {/* <div className="rating-wrap">
              <ProductRating ratingValue={product.rating} />
              <span className="rating-num">({product.ratingCount})</span>
            </div> */}
          </div>
          <div className="product-description list mt-1">
            {productType === "countertops"
              ? product.details
              : productType === "storages"
              ? product.storage_details
              : ""}
          </div>
          {/* {product.variation ? (
            <div className="product-switch-wrap">
              <ul>
                {product.variation.map((single, key) => {
                  return (
                    <li key={key}>
                      <button
                        style={{ backgroundColor: `${single.colorCode}` }}
                        onClick={() => setColorImage(single.image)}
                        className={
                          colorImage === single.image ? "active" : ""
                        }
                      />
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : (
            ""
          )} */}
          <div className="product-list__actions">
            <ul>
              {/* <li>
                {product.affiliateLink ? (
                  <a
                    href={product.affiliateLink}
                    className="btn btn-fill-out btn-addtocart"
                    target="_blank"
                  >
                    <i className="icon-action-redo" /> Buy Now
                  </a>
                ) : product.variation && product.variation.length >= 1 ? (
                  <Link
                    href={`/${slug}-product/${product.id}`}
                    className="btn btn-fill-out btn-addtocart"
                  >
                    <i className="icon-wrench" />
                    Select Options
                  </Link>
                ) : product.stock && product.stock > 0 ? (
                  <button
                    onClick={() => dispatch(addToCart(product))}
                    disabled={
                      cartItem !== undefined &&
                      cartItem.quantity >= cartItem.stock
                    }
                    className={`btn btn-fill-out btn-addtocart ${
                      cartItem !== undefined ? "active" : ""
                    }`}
                  >
                    <i className="icon-basket-loaded" /> Add To Cart
                  </button>
                ) : (
                  <button disabled className="btn btn-fill-out btn-addtocart">
                    <i className="icon-basket-loaded" /> Add To Cart
                  </button>
                )}
              </li> */}
              {/* <li>
                <button
                  onClick={
                    compareItem !== undefined
                      ? () => dispatch(deleteFromCompare(product.id))
                      : () => dispatch(addToCompare(product))
                  }
                  className={compareItem !== undefined ? "active" : ""}
                >
                  <i className="icon-shuffle" />
                </button>
              </li> */}
              {/* <li>
                <button
                  onClick={() => setModalShow(true)}
                  className="d-none d-lg-block"
                >
                  <i className="icon-magnifier-add" />
                </button>
              </li> */}
              {/* <li>
                <button
                  onClick={
                    wishlistItem !== undefined
                      ? () => dispatch(deleteFromWishlist(product.id))
                      : () => dispatch(addToWishlist(product))
                  }
                  className={wishlistItem !== undefined ? "active" : ""}
                >
                  <i className="icon-heart" />
                </button>
              </li> */}
            </ul>
          </div>
        </div>
      </div>
      {/* product modal */}
      <ProductModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        product={product}
        discountedprice={discountedPrice}
        productprice={productPrice}
        cartitem={cartItem}
        wishlistitem={wishlistItem}
        compareitem={compareItem}
      />
    </Fragment>
  );
};

export default ProductGridList;
