import React from "react";
import { FaAngleRight, FaMinus, FaPlus } from "react-icons/fa";

const BottomWizard = ({
  incrementQuantity,
  decrementQuantity,
  priceData,
  formatNumber,
  totalPrice,
  handleAddToTempCart,
}) => {
  return (
    <div className="bottom-wizard-container">
      <div className="bottom-wizard">
        <div className="wizard-total">
          <p>
            total: <br />
            <span className="wizard-total-price">
              qar {totalPrice.toFixed(2)}
            </span>
          </p>
        </div>
        <div className="qty">
          <button
            className="qty-update"
            type="button"
            onClick={incrementQuantity}
          >
            <FaPlus />
          </button>
          <p className="qty-number">{priceData.totalQuantity}</p>
          <button
            className="qty-update"
            type="button"
            onClick={decrementQuantity}
          >
            <FaMinus />
          </button>
        </div>
        <div className="wizard-submit">
          <button type="button" onClick={(e) => handleAddToTempCart(e)}>
            <p>Add</p> <FaAngleRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BottomWizard;
