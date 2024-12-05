import PropTypes from "prop-types";
import styles from "./Pagination.module.scss";

/**
 * Pagination component for displaying page navigation
 * @param {Object} props Component properties
 * @param {number} props.currentPage Current active page number
 * @param {number} props.totalPages Total number of pages
 * @param {Function} props.onPageChange Callback function when page changes
 */
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const renderPaginationButtons = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    pages.push(
      <button 
        key="first" 
        onClick={() => onPageChange(1)} 
        className={styles["pagination-button"]}
        disabled={currentPage === 1}
      >
        <i className="fas fa-angle-double-left"></i>
      </button>,
      <button 
        key="prev" 
        onClick={() => onPageChange(currentPage - 1)} 
        className={styles["pagination-button"]}
        disabled={currentPage === 1}
      >
        <i className="fas fa-chevron-left"></i>
      </button>
    );

    if (startPage > 1) {
      pages.push(
        <button key={1} onClick={() => onPageChange(1)} className={styles["pagination-button"]}>1</button>
      );
      if (startPage > 2) {
        pages.push(<span key="dots1" className={styles["pagination-dots"]}>...</span>);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`${styles["pagination-button"]} ${currentPage === i ? styles["pagination-button--active"] : ""}`}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(<span key="dots2" className={styles["pagination-dots"]}>...</span>);
      }
      pages.push(
        <button key={totalPages} onClick={() => onPageChange(totalPages)} className={styles["pagination-button"]}>
          {totalPages}
        </button>
      );
    }

    pages.push(
      <button 
        key="next" 
        onClick={() => onPageChange(currentPage + 1)} 
        className={styles["pagination-button"]}
        disabled={currentPage === totalPages}
      >
        <i className="fas fa-chevron-right"></i>
      </button>,
      <button 
        key="last" 
        onClick={() => onPageChange(totalPages)} 
        className={styles["pagination-button"]}
        disabled={currentPage === totalPages}
      >
        <i className="fas fa-angle-double-right"></i>
      </button>
    );

    return pages;
  };

  return <div className={styles["pagination"]}>{renderPaginationButtons()}</div>;
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default Pagination;
