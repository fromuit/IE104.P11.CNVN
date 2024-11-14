import React, { FC } from "react";
import './Novel_Stats.css';

interface NovelStatsProps {
  novel: {
    "Số lượt xem": number;
    "Số like": number;
    "Số chương"?: number;
    "Số từ"?: number;
    "Ngày cập nhật cuối"?: number;
    "Tháng cập nhật cuối"?: number;
    "Năm cập nhật cuối"?: number;
    "Ngày bắt đầu"?: number;
    "Tháng bắt đầu"?: number;
    "Năm bắt đầu"?: number;
  };
  variant?: "recent" | "new" | "completed" | "original" | "top";
  showLikes?: boolean;
  showFullNumbers?: boolean;
}

const NovelStats: FC<NovelStatsProps> = ({
  novel,
  variant = "original",
  showLikes = true,
  showFullNumbers = false
}) => {
  // Helper function to format numbers
  const formatNumber = (num: number | undefined): string => {
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
  const getDaysAgo = (): string => {
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
    <div className="novel-stats" data-variant={variant}>
      <span className="views">👁 {formatNumber(novel["Số lượt xem"])}</span>   
      {variant === "recent" && (
        <span className="update-time">
          {getDaysAgo()}
        </span>
      )}
      {variant === "new" && (
        <span className="start-date">
        {novel["Ngày bắt đầu"]}/{novel["Tháng bắt đầu"]}/{novel["Năm bắt đầu"]}
        </span>
      )}

      {variant === "completed" && (
        <>
          <span className="chapters">📚 {formatNumber(novel["Số chương"])} chương</span>
          <span className="word-count">📝 {formatNumber(novel["Số từ"])} từ</span>
        </>
      )}
    </div>
  );
};

export default NovelStats;