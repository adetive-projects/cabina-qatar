import Link from "next/link";
import { useState, Fragment } from "react";
import { EffectFade, Thumbs } from 'swiper';
import { Modal, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { BsShield } from "react-icons/bs";
import { AiOutlineReload } from "react-icons/ai";
import { GiSwapBag } from "react-icons/gi";
import {
  IoLogoFacebook,
  IoLogoTwitter,
  IoLogoGoogleplus,
  IoLogoYoutube,
  IoLogoInstagram
} from "react-icons/io";
import { ProductRating } from "../../Product";
import Swiper, { SwiperSlide } from "../../swiper";
import { getProductCartQuantity } from "../../../lib/product";
import { addToCart } from "../../../store/slices/cart-slice";
import { addToWishlist, deleteFromWishlist } from "../../../store/slices/wishlist-slice";
import { addToCompare, deleteFromCompare } from "../../../store/slices/compare-slice";

const ProductModal = ({
  show,
  onHide,
  product,
  discountedprice,
  productprice,
  wishlistitem,
  compareitem
}) => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

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

  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const gallerySwiperParams = {
    spaceBetween: 10,
    loop: true,
    effect: "fade",
    fadeEffect: {
      crossFade: true
    },
    thumbs: { swiper: thumbsSwiper },
    modules: [EffectFade, Thumbs],
  };

  const thumbnailSwiperParams = {
    onSwiper: setThumbsSwiper,
    spaceBetween: 10,
    slidesPerView: 4,
    touchRatio: 0.2,
    freeMode: true,
    loop: true,
    slideToClickedSlide: true
  };

  const onCloseModal = () => {
    setThumbsSwiper(null)
    onHide()
  }

  return (
    <Modal
      show={show}
      onHide={onCloseModal}
      className="product-quickview"
      centered
    >
      <Modal.Body>
        <Modal.Header closeButton></Modal.Header>
        <Row>
          <Col lg={6}>
            <div className="product-quickview__large-image-wrapper">
              {!!product.image?.length ? (
                <Swiper options={gallerySwiperParams}>
                  {product.image.map((single, key) => (
                    <SwiperSlide key={key}>
                      <div className="single-image">
                        <img src={single} className="img-fluid" alt="" />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : null}
            </div>
            <div className="product-quickview__small-image-wrapper">
              {!!product.image?.length ? (
                <Swiper options={thumbnailSwiperParams}>
                  {product.image.map((image, i) => (
                    <SwiperSlide key={i}>
                      <div className="single-image">
                        <img src={image} className="img-fluid" alt="" />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : null}
            </div>
          </Col>
          <Col lg={6}>
            <div className="product-quickview__content">
              <h2 className="product-quickview__title space-mb--10">
                {product.name}
              </h2>
              <div className="product-quickview__price-rating-wrapper space-mb--10">
                <div className="product-quickview__price d-flex-align-items-center">
                  {product.discount ? (
                    <Fragment>
                      <span className="price">${discountedprice}</span>
                      <del>${productprice}</del>
                      <span className="on-sale">{product.discount}% Off</span>
                    </Fragment>
                  ) : (
                    <span className="price">${productprice}</span>
                  )}
                </div>
                {product.rating && product.rating > 0 ? (
                  <div className="product-quickview__rating-wrap">
                    <div className="product-quickview__rating">
                      <ProductRating ratingValue={product.rating} />
                      <span>({product.ratingCount})</span>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="product-quickview__description space-mb--20">
                <p>{product.shortDescription}</p>
              </div>

              <div className="product-quickview__sort-info space-mb--20">
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
              </div>

              {product.variation ? (
                <div className="product-quickview__size-color">
                  <div className="product-quickview__color space-mb--10">
                    <div className="product-quickview__color__title">Color</div>
                    <div className="product-quickview__color__content">
                      {product.variation.map((single, i) => {
                        return (
                          <Fragment key={i}>
                            <input
                              type="radio"
                              value={single.color}
                              name="product-color"
                              id={single.color}
                              checked={
                                single.color === selectedProductColor
                                  ? "checked"
                                  : ""
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
                  <div className="product-quickview__size space-mb--20">
                    <div className="product-quickview__size__title">Size</div>
                    <div className="product-quickview__size__content">
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
              )}
              <hr />
              {product.affiliateLink ? (
                <div className="product-quickview__quality">
                  <div className="product-quickview__cart btn-hover">
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
                  <div className="product-quickview__button-wrapper d-flex align-items-center">
                    <div className="product-quickview__quantity">
                      <div className="cart-plus-minus">
                        <button
                          onClick={() =>
                            setQuantityCount(
                              quantityCount > 1 ? quantityCount - 1 : 1
                            )
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
                    </div>
                    {productStock && productStock > 0 ? (
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
                      <button
                        className="btn btn-fill-out btn-addtocart"
                        disabled
                      >
                        Out of Stock
                      </button>
                    )}

                    <button
                      className={`product-quickview__compare ${
                        compareitem !== undefined ? "active" : ""
                      }`}
                      title={
                        compareitem !== undefined
                          ? "Added to compare"
                          : "Add to compare"
                      }
                      onClick={
                        compareitem !== undefined
                          ? () => dispatch(deleteFromCompare(product.id))
                          : () => dispatch(addToCompare(product))
                      }
                    >
                      <i className="icon-shuffle" />
                    </button>

                    <button
                      className={`product-quickview__wishlist ${
                        wishlistitem !== undefined ? "active" : ""
                      }`}
                      title={
                        wishlistitem !== undefined
                          ? "Added to wishlist"
                          : "Add to wishlist"
                      }
                      onClick={
                        wishlistitem !== undefined
                          ? () => dispatch(deleteFromWishlist(product.id))
                          : () => dispatch(addToWishlist(product))
                      }
                    >
                      <i className="icon-heart" />
                    </button>
                  </div>
                </Fragment>
              )}
              <hr />
              <ul className="product-quickview__product-meta">
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
              </ul>
              <div className="product-quickview__product-share space-mt--15">
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
              </div>
            </div>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default ProductModal;
