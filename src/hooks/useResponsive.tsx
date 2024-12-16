// Example of a custom hook
import { useState, useEffect } from "react";

const useResponsive = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Call initially to set the state

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
};

export default useResponsive;
