import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMenus, fetchCuisines, setSelectedCuisine, incrementPage } from "../features/menusSlice";
import SetMenuGrid from "../components/SetMenuGrid";
import Filters from "../components/Filters";
import Pagination from "../components/Pagination";
import QuantityInput from "../components/QuantityInput";
import "../styles/SetMenusPage.css";

const SetMenusPage = () => {
  const dispatch = useDispatch();
  const { menus, cuisines, selectedCuisine, page, totalMenus, loading } = useSelector(
    (state) => state.menus
  );

  useEffect(() => {
    dispatch(fetchCuisines());
    dispatch(fetchMenus({ page: 1, cuisineSlug: selectedCuisine }));
  }, [dispatch, selectedCuisine]);

  const handleFilterChange = (cuisine) => {
    dispatch(setSelectedCuisine(cuisine));
  };

  const handleLoadMore = () => {
    dispatch(incrementPage());
    dispatch(fetchMenus({ page: page + 1, cuisineSlug: selectedCuisine }));
  };

  return (
    <div className="page-container">
      <div className="guests-container">
        <h2 className="guests-label">Guests <br></br>👱🏻‍♀️👩🏻‍🦰👩🏻👧🏽👧🏾</h2>
        <QuantityInput />
      </div>
      <Filters cuisines={cuisines} selectedCuisine={selectedCuisine} onFilterChange={handleFilterChange} />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <SetMenuGrid menus={menus} />
      )}
      {menus.length < totalMenus && (
        <div className="pagination-container">
          <Pagination onLoadMore={handleLoadMore} />
        </div>
      )}
    </div>
  );
};

export default SetMenusPage;
