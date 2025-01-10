import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setGuests } from "../features/menusSlice";
import "../styles/QuantityInput.css";

const QuantityInput = () => {
  const dispatch = useDispatch();
  const guests = useSelector((state) => state.menus.guests); // Get the current guest count from Redux

  const handleIncrease = () => {
    dispatch(setGuests(guests + 1)); // Dispatch action to increment guests
  };

  const handleDecrease = () => {
    if (guests > 1) {
      dispatch(setGuests(guests - 1)); // Dispatch action to decrement guests
    }
  };

  return (
    <div className="quantity-input">
      <button
        className="quantity-input__modifier quantity-input__modifier--left"
        onClick={handleDecrease}
      >
        -
      </button>
      <input
        type="text"
        className="quantity-input__screen"
        value={guests}
        readOnly
      />
      <button
        className="quantity-input__modifier quantity-input__modifier--right"
        onClick={handleIncrease}
      >
        +
      </button>
    </div>
  );
};

export default QuantityInput;
