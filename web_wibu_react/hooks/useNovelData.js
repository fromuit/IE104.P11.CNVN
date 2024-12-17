import { useState } from 'react';
import novelData from '../src/data_and_source/Novel_Data/hako_data.json';

export const useNovelData = () => {
  const [novels, setNovels] = useState(() => {
    const savedData = localStorage.getItem("novelData");
    return savedData ? JSON.parse(savedData) : novelData;
  });

  const [likedNovels, setLikedNovels] = useState(() => {
    const savedLikes = localStorage.getItem("likedNovels");
    return savedLikes ? JSON.parse(savedLikes) : {};
  });

  const incrementView = (novelId) => {
    setNovels(prevNovels =>
      prevNovels.map(novel =>
        novel.ID === novelId
          ? { ...novel, "Số lượt xem": novel["Số lượt xem"] + 1 }
          : novel
      )
    );
  };

  const toggleLike = (novelId) => {
    const currentLikeStatus = likedNovels[novelId];

    setLikedNovels(prev => {
      const newLikedNovels = {
        ...prev,
        [novelId]: !prev[novelId]
      };
      localStorage.setItem("likedNovels", JSON.stringify(newLikedNovels));
      return newLikedNovels;
    });

    setNovels(prevNovels => {
      const updatedNovels = prevNovels.map(novel =>
        novel.ID === novelId
          ? {
            ...novel,
            "Số like": currentLikeStatus
              ? novel["Số like"] - 1
              : novel["Số like"] + 1
          }
          : novel
      );
      localStorage.setItem("novelData", JSON.stringify(updatedNovels));
      return updatedNovels;
    });
  };

  return { novels, likedNovels, incrementView, toggleLike };
};