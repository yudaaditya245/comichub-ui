"use client";

import axios from "axios";
import { twMerge } from "tailwind-merge";
import GroupsComics from "./sections/GroupsComics";
import AllComics from "./sections/AllComics";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";

export default function Browse() {
  const params = useSearchParams();
  const groupSrc = params.get("src") || "all";

  const { isLoading, data: groupLists } = useQuery({
    queryKey: ["getGroupsLists"],
    queryFn: async () => {
      const { data } = await axios.get("/api/get-groups-lists");
      if (data) return data;
      throw Error("No data");
    }
  });

  browseScrollHandler(); // initialize scroll restoration

  return (
    <main className="mx-auto flex min-h-full max-w-5xl flex-col gap-2 p-5">
      {/* {console.log(groupSrc)} */}
      <section className="noScroll bottom-16 flex flex-shrink-0 gap-3 overflow-scroll pb-5">
        {isLoading ? (
          <>
            <div className="h-10 w-36 flex-shrink-0 animate-pulse rounded bg-black/30"></div>
          </>
        ) : (
          <>
            <GroupButton state={groupSrc} slug="all" text="All" />
            {groupLists.map(group => (
              <GroupButton key={group.id} state={groupSrc} slug={group.slug} text={group.title} />
            ))}
          </>
        )}
      </section>
      <div>{groupSrc === "all" ? <AllComics /> : <GroupsComics source={groupSrc} />}</div>
    </main>
  );
}

function GroupButton({ state, slug, text }) {
  return (
    <Link
      href={`?src=${slug}`}
      key={slug}
      className={twMerge(
        `relative flex flex-shrink-0 items-center gap-2 rounded bg-white px-5 py-2 font-medium drop-shadow-darksoft`,
        state === slug && "bg-green-700 text-white"
      )}
    >
      <span className="text-[0.93rem]">{text}</span>
    </Link>
  );
}

function browseScrollHandler() {
  const handleScroll = useDebouncedCallback(() => {
    const position = window.scrollY;
    localStorage.setItem("browseScrollY", position);
  }, 50);

  useEffect(() => {
    const scrollY = localStorage.getItem("browseScrollY");
    if (scrollY) {
      window.scrollTo({
        top: scrollY,
        behavior: "smooth"
      });
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
}
