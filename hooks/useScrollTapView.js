import { useState, useEffect } from "react";

export function useScrollTapView(shown = true) {
  const [isShown, setIsShown] = useState(shown);

  const handleScroll = () => {
    const currentScrollPos = window.scrollY;
    const isAtTop = currentScrollPos <= 0;
    const isAtBottom = currentScrollPos + window.innerHeight + 100 >= document.documentElement.scrollHeight;

    setIsShown(isAtTop || isAtBottom);
  };

  const handleTap = () => {
    setIsShown(prev => !prev);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("click", handleTap);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("click", handleTap);
    };
  }, []);

  return { isShown, setIsShown };
}
