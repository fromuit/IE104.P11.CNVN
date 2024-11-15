// import React from "react";
// import './Novel_Stats.css';
import styles from './Novel_Stats.module.scss';
import PropTypes from 'prop-types';
const NovelStats = ({
  novel,
  variant = "original",
  showLikes = true,
  showFullNumbers = false
}) => {
  NovelStats.propTypes = {
    novel: PropTypes.object.isRequired,
    variant: PropTypes.string,
    showLikes: PropTypes.bool,
    showFullNumbers: PropTypes.bool
  };
  // Helper function to format numbers
  const formatNumber = (num) => {
    if (num === undefined || num === null) return '0';
    
    if (showFullNumbers || variant === "top") {
      return num.toLocaleString("vi-VN");
    }
    
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  // Helper function to calculate days ago
  const getDaysAgo = () => {
    if (!novel["Ngày cập nhật cuối"] || !novel["Tháng cập nhật cuối"] || !novel["Năm cập nhật cuối"]) {
      return 'Không xác định';
    }
    
    const today = new Date();
    const updateDate = new Date(
      novel["Năm cập nhật cuối"],
      novel["Tháng cập nhật cuối"] - 1,
      novel["Ngày cập nhật cuối"]
    );
    const diffTime = Math.abs(today.getTime() - updateDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `Cập nhật ${diffDays} ngày trước`;
  };

  return (
    <div className={styles["novel-stats"]} data-variant={variant}>
      <span className={styles["views"]}>👁 {formatNumber(novel["Số lượt xem"])}</span>   
      {variant === "recent" && (
        <span className={styles["update-time"]}>
          {getDaysAgo()}
        </span>
      )}
      {variant === "new" && (
        <span className={styles["start-date"]}>
          {novel["Ngày bắt đầu"]}/{novel["Tháng bắt đầu"]}/{novel["Năm bắt đầu"]}
        </span>
      )}
      {variant === "completed" && (
        <>
          <span className={styles["chapters"]}>📚 {formatNumber(novel["Số chương"])} chương</span>
          <span className={styles["word-count"]}>📝 {formatNumber(novel["Số từ"])} từ</span>
        </>
      )}
    </div>
  );
};

export default NovelStats; 