import React from "react";
import { useSelector } from "react-redux";
import "../styles/SetMenuCard.css";

const SetMenuCard = ({ menu }) => {
  const guests = useSelector((state) => state.menus.guests); // Get guest count from Redux
  const totalPrice = Math.max(menu.price_per_person * guests, menu.min_spend);

  return (
    <div className="set-menu-card">
      <div className="image-card">
        <img src={menu.thumbnail} alt={menu.name} className="menu-image" />
      </div>
      <div className="caption">
        <button className="cuisine-tag">{menu.cuisine}</button>
        {/* <p className="menu-price"> */}
          {/* <strong>£{menu.price_per_person}</strong> per person */}
          <button className="priceperperson-tag">£{menu.price_per_person}  per person</button>

        {/* </p> */}
        <h3 className="menu-title">{menu.name}</h3>
        <p className="menu-description">{menu.description}</p>

        <p className="menu-total">
        <h3>  <b>Total: </b> <strong>£{totalPrice}</strong></h3>
        </p>
      </div>
    </div>
  );
};

export default SetMenuCard;
