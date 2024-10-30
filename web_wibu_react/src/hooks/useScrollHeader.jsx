import { useState, useEffect } from 'react';

const useScrollHeader = () => {
  const [isBottomNavStuck, setIsBottomNavStuck] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const topNav = document.querySelector('.top-nav');
      const banner = document.querySelector('.banner');
      const bottomNav = document.querySelector('.bottom-nav');

      if (!topNav || !banner || !bottomNav) return;

      const scrollPosition = window.scrollY;
      const bannerBottom = banner.offsetTop + banner.offsetHeight;
      const topNavHeight = topNav.offsetHeight;

      if (scrollPosition + topNavHeight >= bannerBottom - bottomNav.offsetHeight) {
        setIsBottomNavStuck(true);
      } else {
        setIsBottomNavStuck(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Gọi một lần để set trạng thái ban đầu
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { isBottomNavStuck };
};

export default useScrollHeader;