"use client";

import { twMerge } from "tailwind-merge";
import { GoHomeFill, GoHeartFill } from "react-icons/go";
import { IoSettingsSharp } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { usePathname } from "next/navigation";
import Link from "next/link";
import ScrollTop from "@/components/ScrollTop";
import { Fragment, useEffect, useState } from "react";
import { Transition } from "@headlessui/react";

export default function Nav({ className }) {
  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  const handleScroll = () => {
    const currentScrollPos = window.scrollY;

    // You can adjust the threshold value to control when the button appears
    const threshold = 100;

    setIsVisible(currentScrollPos < prevScrollPos || currentScrollPos < threshold);
    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  const pathname = usePathname();

  const navObj = [
    {
      path: "/",
      icon: GoHomeFill,
      size: 19
    },
    {
      path: "/search",
      icon: FaSearch,
      size: 16
    },
    {
      path: "/bookmark",
      icon: GoHeartFill,
      size: 18
    },
    {
      path: "/setting",
      icon: IoSettingsSharp,
      size: 18
    }
  ];

  const excludePaths = ["/read"];
  const isExcludedPath = excludePaths.some(excludedPath => pathname.startsWith(excludedPath));

  return (
    <Transition
      as={Fragment}
      show={isVisible && !isExcludedPath}
      enter="transition ease-out duration-75"
      enterFrom="transform opacity-0 translate-y-6 scale-90"
      enterTo="transform opacity-100 translate-y-0 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 translate-y-0 scale-100"
      leaveTo="transform opacity-0 translate-y-6 scale-95"
    >
      <nav
        className={twMerge(
          "fixed bottom-0 flex w-full gap-2 bg-gradient-to-b from-transparent from-70% to-light-300 p-3 shadow-md max-md:flex-col md:flex-row-reverse",
          className
        )}
      >
        <div className="flex max-w-2xl justify-end max-md:mx-auto max-md:w-full md:mr-auto">
          <ScrollTop className="rounded-lg bg-white p-[0.6rem] shadow md:p-3 md:shadow-md" />
        </div>

        <ul
          className="mx-auto flex w-full max-w-2xl flex-row items-center justify-around rounded-lg bg-green-700 p-[0.88rem] 
        font-bold shadow-[0_0_10px_rgba(0,0,0,0.3)] md:mr-0"
        >
          {navObj.map(nav => (
            <Link key={nav.path} href={nav.path} className="relative w-full text-white/90">
              <span className="flex justify-center">
                <nav.icon size={nav.size} />
                {nav.path === pathname && <div className="absolute -bottom-[0.5rem] h-[3px] w-3 rounded-full bg-white/60"></div>}
              </span>
            </Link>
          ))}
        </ul>
      </nav>
    </Transition>
  );
}
