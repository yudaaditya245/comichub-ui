"use client";

import { twMerge } from "tailwind-merge";
import { GoHomeFill, GoHeartFill } from "react-icons/go";
import { IoSettingsSharp } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Nav({ className }) {
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

  return (
    <nav
      className={twMerge(
        "bg-gra sticky bottom-0 flex w-full p-3 pt-7 shadow-md",
        "to-light-300 bg-gradient-to-b from-transparent",
        className
      )}
    >
      <ul className="mx-auto flex w-full max-w-2xl flex-row items-center justify-around rounded-lg bg-green-700 
                      p-[0.88rem] font-bold shadow-[0_0_10px_rgba(0,0,0,0.3)]">
        {navObj.map(nav => (
          <li key={nav.path} className="relative text-white/90">
            <Link href={nav.path} className="w-full">
              <nav.icon size={nav.size} />
            </Link>
            {nav.path === pathname && <div className="absolute -bottom-[0.4rem] w-full h-[3px] rounded-full bg-white/50"></div>}
          </li>
        ))}
      </ul>
    </nav>
  );
}
