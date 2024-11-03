import React, { useState, useEffect, useRef } from 'react';

const BottomNav = () => {
  const [lastScrollY, setLastScrollY] = useState(0);
  const bottomNavRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  const handleScroll = React.useCallback(() => {
    if (bottomNavRef.current) {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY) {
        bottomNavRef.current.classList.add('nav-hidden');
      } else {
        bottomNavRef.current.classList.remove('nav-hidden');
      }
      
      setLastScrollY(currentScrollY);
    }
  }, [lastScrollY]);

  useEffect(() => {
    setIsMounted(true);
    
    if (bottomNavRef.current) {
      window.addEventListener('scroll', handleScroll);
    }

    return () => {
      setIsMounted(false);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  if (!isMounted) return null;

  return (
    <nav className="bottom-nav" ref={bottomNavRef}>
      <div className="nav-content">
        {/* Thêm nội dung navigation của bạn ở đây */}
      </div>
    </nav>
  );
};

export default BottomNav; 