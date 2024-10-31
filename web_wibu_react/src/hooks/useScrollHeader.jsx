// import { useState, useEffect } from 'react';

// const useScrollHeader = () => {
//   const [isBottomNavStuck, setIsBottomNavStuck] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       const topNav = document.querySelector('.top-nav');
//       const banner = document.querySelector('.banner');
//       const bottomNav = document.querySelector('.bottom-nav');

//       if (!topNav || !banner || !bottomNav) return;

//       const scrollPosition = window.scrollY;
//       const bannerBottom = banner.offsetTop + banner.offsetHeight;
//       const topNavHeight = topNav.offsetHeight;

//       if (scrollPosition + topNavHeight >= bannerBottom - bottomNav.offsetHeight) {
//         setIsBottomNavStuck(true);
//       } else {
//         setIsBottomNavStuck(false);
//       }
//     };

//     window.addEventListener('scroll', handleScroll);
//     // Gọi một lần để set trạng thái ban đầu
//     handleScroll();

//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   return { isBottomNavStuck };
// };

// export default useScrollHeader;

import { useEffect } from 'react';

const useScrollHeader = () => {
  useEffect(() => {
    const handleScroll = () => {
      const topNav = document.querySelector('.top-nav');
      const bottomNav = document.querySelector('.bottom-nav');
      const banner = document.querySelector('.banner-container');
      
      if (!topNav || !bottomNav || !banner) return;

      const bottomNavPosition = bottomNav.getBoundingClientRect().top;
      
      if (bottomNavPosition <= 0) {
        // Khi cuộn đến bottom nav
        topNav.style.position = 'fixed';
        topNav.style.top = '0';
        bottomNav.style.position = 'fixed';
        bottomNav.style.top = '60px'; // Chiều cao của top nav
      } else {
        // Khi chưa cuộn đến bottom nav
        topNav.style.position = 'fixed';
        topNav.style.top = '0';
        bottomNav.style.position = 'relative';
        bottomNav.style.top = 'auto';
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
};

export default useScrollHeader;