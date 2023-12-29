import { MdKeyboardDoubleArrowUp } from "react-icons/md";
import { twMerge } from "tailwind-merge";

export default function ScrollTop({ className }) {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <button onClick={scrollToTop} className={twMerge("", className)}>
      <MdKeyboardDoubleArrowUp size={18} />
    </button>
  );
}
