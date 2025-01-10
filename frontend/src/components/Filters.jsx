import React from "react";
import "../styles/Filters.css";

const Filters = ({ cuisines, selectedCuisine, onFilterChange }) => {
  return (
    <div className="filters">
      {/* All Filter Button */}
      <button
        key="all"
        className={`filter-btn ${selectedCuisine === "" ? "active" : ""}`}
        onClick={() => onFilterChange("")} // Reset to show all
      >
        All
      </button>

      {/* Cuisine Buttons */}
      {cuisines.map((cuisine) => (
        <button
          key={cuisine.id}
          className={`filter-btn ${
            selectedCuisine === cuisine.name ? "active" : ""
          }`}
          onClick={() => onFilterChange(cuisine.name)}
        >
          {cuisine.name} ({cuisine.live_menus})
        </button>
      ))}
    </div>
  );
};

export default Filters;
