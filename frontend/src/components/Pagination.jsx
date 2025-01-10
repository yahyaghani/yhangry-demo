import React from "react";
import "../styles/Pagination.css";

const Pagination = ({ onLoadMore }) => {
  return (
    <div className="pagination">
      <button className="load-more" onClick={onLoadMore}>
        Load More
      </button>
    </div>
  );
};

export default Pagination;
