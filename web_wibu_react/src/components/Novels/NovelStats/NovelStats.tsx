import React, { FC } from "react";
import './NovelStats.css';

interface NovelStatsProps {
  views: number;
  likes: number;
  chapters?: number; 
  wordCount?: number;
  lastUpdated?: {
    day: number;
    month: number;
    year: number;
  };
  startDate?: {
    month: number;
    year: number;
  };
  variant: "recent" | "new" | "completed" | "original" | "top";
  showLikes?: boolean; 
  showFullNumbers?: boolean;
}

const NovelStats: FC<NovelStatsProps> = ({
  views,
  likes,
  chapters,
  wordCount,
  lastUpdated,
  startDate,
  variant,
  showLikes = true, // Giá trị mặc định là true
  showFullNumbers = false // Giá trị mặc định là false
}) => {
  // Helper function to format numbers
  const formatNumber = (num: number): string => {
    if (showFullNumbers || variant === "top") {
      return num.toLocaleString("vi-VN"); // Format số đầy đủ với dấu phẩy
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
  const getDaysAgo = (date: { day: number; month: number; year: number }): string => {
    const today = new Date();
    const updateDate = new Date(date.year, date.month - 1, date.day);
    const diffTime = Math.abs(today.getTime() - updateDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `Cập nhật ${diffDays} ngày trước`;
  };

  return (
    <div className="novel-stats" data-variant={variant}>
      <span className="views">👁 {formatNumber(views)}</span>
      {showLikes && <span className="likes">❤ {formatNumber(likes)}</span>} {/* Thêm điều kiện này */}
      
      {variant === "recent" && lastUpdated && (
        <span className="update-time">
          {getDaysAgo(lastUpdated)}
        </span>
      )}

      {variant === "new" && startDate && (
        <span className="start-date">
          {`Tháng ${startDate.month}/${startDate.year}`}
        </span>
      )}

      {variant === "completed" && (
        <>
          <span className="chapters">📚 {chapters} chương</span>
          <span className="word-count">📝 {formatNumber(wordCount || 0)} từ</span>
        </>
      )}
    </div>
  );
};

export default NovelStats;