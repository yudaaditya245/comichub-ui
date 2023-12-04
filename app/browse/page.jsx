"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { LuCheckCheck } from "react-icons/lu";
import GroupsComics from "./sections/GroupsComics";
import AllComics from "./sections/AllComics";

export default function Browse() {
  const [groupsSrc, setGroupsSrc] = useState("all");
  const { isLoading, data: groupLists } = useQuery({
    queryKey: ["getGroupsLists"],
    queryFn: async () => {
      const { data } = await axios.get("/api/get-groups-lists");
      if (data) return data;
      throw Error("No data");
    }
  });

  return (
    <main className="mx-auto min-h-full max-w-5xl p-5 flex flex-col gap-2">
      <section className="noScroll bottom-16 flex flex-shrink-0 gap-3 overflow-scroll pb-5">
        {isLoading ? (
          <>
            <div className="h-10 w-36 flex-shrink-0 animate-pulse rounded bg-black/30"></div>
          </>
        ) : (
          <>
            <GroupButton state={groupsSrc} setState={setGroupsSrc} slug="all" text="All" />
            {groupLists.map(group => (
              <GroupButton key={group.id} state={groupsSrc} setState={setGroupsSrc} slug={group.slug} text={group.title} />
            ))}
          </>
        )}
      </section>
      <div className="">{groupsSrc === "all" ? <AllComics /> : <GroupsComics source={groupsSrc} />}</div>
    </main>
  );
}

function GroupButton({ state, setState, slug, text }) {
  return (
    <button
      onClick={() => setState(slug)}
      key={slug}
      className={twMerge(
        `relative flex flex-shrink-0 items-center gap-2 rounded bg-white px-5 py-2 font-medium drop-shadow-darksoft`,
        state === slug && "bg-green-700 text-white"
      )}
    >
      {/* {state === slug && (
        <i className="absolute left-0 top-0">
          <LuCheckCheck size={17} />
        </i>
      )} */}
      <span className="text-[0.93rem]">{text}</span>
    </button>
  );
}
