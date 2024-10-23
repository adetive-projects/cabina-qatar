import { Fragment } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { IoIosClose } from "react-icons/io";
import { getDiscountPrice } from "../../../lib/product";
import { deleteFromCart } from "../../../store/slices/cart-slice";

const MiniCart = () => {
  let cartTotalPrice = 0;
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  
  return (
    <Fragment>
      {cartItems.length > 0 ? (
        <div className="cart-box">
          <ul className="cart-list">
            {cartItems.map((product, key) => {
              // const discountedPrice = getDiscountPrice(
              //   product.price,
              //   product.discount
              // ).toFixed(2);
              // cartTotalPrice += discountedPrice * product.quantity;
              return (
                <li key={key}>
                  <button
                    className="item-remove"
                    onClick={() => dispatch(deleteFromCart(product.cartItemId))}
                  >
                    <IoIosClose />
                  </button>
                  <div className="single-item">
                    <div className="single-item__image">
                      <Link href={"/shop/product-basic/" + product.slug}>
                        <img src={product.thumbImage[0]} alt="cart_thumb1" />
                      </Link>
                    </div>
                    <div className="single-item__content">
                      <Link href={"/shop/product-basic/" + product.slug}>
                        {product.name}
                      </Link>
                      <span className="cart-quantity">
                        {" "}
                        {product.quantity} x{" "}
                        <span className="cart-amount">
                          {" "}
                          <span className="price-symbol">$</span>
                        </span>
                        {/* {discountedPrice} */}
                      </span>
                      {product.selectedProductColor &&
                      product.selectedProductSize ? (
                        <div className="cart-variation">
                          <p>Color: {product.selectedProductColor}</p>
                          <p>Size: {product.selectedProductSize}</p>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="cart-footer">
            <p className="cart-total">
              <strong>Subtotal:</strong>{" "}
              <span className="cart-price">
                {" "}
                <span className="price-symbol">$</span>
              </span>
              {cartTotalPrice.toFixed(2)}
            </p>
            <div className="cart-buttons">
              <Link href="/other/cart" className="btn btn-fill-line view-cart">
                View Cart
              </Link>
              <Link href="/other/checkout" className="btn btn-fill-out checkout">
                Checkout
              </Link>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </Fragment>
  );
};


export default MiniCart;
