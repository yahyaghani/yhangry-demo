// src/components/SetMenuGrid.jsx
import React from "react";
import SetMenuCard from "./SetMenuCard";
import "../styles/SetMenuGrid.css";

const SetMenuGrid = ({ menus, guests }) => {
  return (
    <div className="set-menu-grid">
      {menus.map((menu) => (
        <SetMenuCard key={menu.id} menu={menu} guests={guests} />
      ))}
    </div>
  );
};

export default SetMenuGrid;
