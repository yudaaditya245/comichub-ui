import { MdKeyboardDoubleArrowUp } from "react-icons/md";
import { IoMdRocket } from "react-icons/io";
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
      <IoMdRocket size={18} />
    </button>
  );
}
