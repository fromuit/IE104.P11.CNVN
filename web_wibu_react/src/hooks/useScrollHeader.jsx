import { useEffect, useRef, useCallback } from 'react';

const useScrollHeader = () => {
  const bottomNavRef = useRef(null);
  const observerRef = useRef(null);
  const isFixedRef = useRef(false);

  const updatePosition = useCallback((shouldFix) => {
    const bottomNav = bottomNavRef.current;
    if (!bottomNav) return;

    // Chỉ cập nhật khi trạng thái thay đổi
    if (shouldFix !== isFixedRef.current) {
      isFixedRef.current = shouldFix;
      
      if (shouldFix) {
        bottomNav.style.cssText = `
          position: fixed;
          top: 60px;
          left: 0;
          right: 0;
          width: 100%;
          z-index: 999;
        `;
      } else {
        bottomNav.style.cssText = `
          position: relative;
          top: auto;
          left: auto;
          right: auto;
        `;
      }
    }
  }, []);

  useEffect(() => {
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          updatePosition(!entry.isIntersecting);
        },
        {
          threshold: 0,
          rootMargin: '-60px 0px 0px 0px'
        }
      );
    }

    const currentNav = bottomNavRef.current;
    const currentObserver = observerRef.current;

    if (currentNav && currentObserver) {
      currentObserver.observe(currentNav);
    }

    return () => {
      if (currentNav && currentObserver) {
        currentObserver.unobserve(currentNav);
      }
    };
  }, [updatePosition]);

  return bottomNavRef;
};

export default useScrollHeader;