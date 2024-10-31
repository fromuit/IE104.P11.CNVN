import { useEffect, useRef } from 'react';

const useScrollHeader = () => {
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const topNav = document.querySelector('.top-nav');
          const bottomNav = document.querySelector('.bottom-nav');
          const banner = document.querySelector('.banner-container');
          
          if (!topNav || !bottomNav || !banner) return;

          const bottomNavPosition = bottomNav.getBoundingClientRect().top;
          const shouldCombine = bottomNavPosition <= 60; // 60px là chiều cao của topNav

          // Chỉ cập nhật DOM khi trạng thái thay đổi
          if (shouldCombine) {
            if (bottomNav.style.position !== 'fixed') {
              bottomNav.style.position = 'fixed';
              bottomNav.style.top = '60px';
              bottomNav.style.left = '0';
              bottomNav.style.right = '0';
            }
          } else {
            if (bottomNav.style.position !== 'relative') {
              bottomNav.style.position = 'relative';
              bottomNav.style.top = 'auto';
            }
          }

          lastScrollY.current = window.scrollY;
          ticking.current = false;
        });

        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
};

export default useScrollHeader;