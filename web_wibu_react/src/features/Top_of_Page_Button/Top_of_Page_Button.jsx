import { useState, useEffect } from "react";
import styles from "./Top_of_Page_Button.module.scss";

/**
 * @typedef {Object} TopOfPageButtonProps
 * @property {number} [showAtHeight=300] - Height in pixels at which the button becomes visible
 * @property {string} [className] - Additional CSS class names
 */

/**
 * A button component that scrolls to the top of the page when clicked.
 * The button is hidden by default and appears when scrolling down.
 * 
 * @param {TopOfPageButtonProps} props - Component props
 * @returns {JSX.Element | null} The scroll to top button or null if hidden
 */
const TopOfPageButton = ({ showAtHeight = 300, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    /**
     * Handles scroll events to show/hide the button
     */
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY > showAtHeight);
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showAtHeight]);

  /**
   * Smoothly scrolls to the top of the page
   */
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <button
      className={`${styles.topButton} ${className}`.trim()}
      onClick={scrollToTop}
      aria-label="Scroll to top"
      type="button"
    >
      ↑
    </button>
  );
};

export default TopOfPageButton;
