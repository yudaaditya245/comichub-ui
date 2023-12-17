const { useEffect } = require("react");
const { useDebouncedCallback } = require("use-debounce");

export function scrollRestoreByCache(name, cache) {
  const handleScroll = useDebouncedCallback(() => {
    const _getLocalScroll = localStorage.getItem("ScrollY");
    const scrollLocal = JSON.parse(_getLocalScroll) || {};

    const position = window.scrollY;
    const newScroll = { ...scrollLocal, [name]: position };

    localStorage.setItem("ScrollY", JSON.stringify(newScroll));
  }, 30);

  useEffect(() => {
    const _getLocalScroll = localStorage.getItem("ScrollY");
    const scrollLocal = JSON.parse(_getLocalScroll) || {};

    if (scrollLocal[name] && cache) {
      window.scrollTo({
        top: scrollLocal[name],
        behavior: "smooth"
      });
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
}
