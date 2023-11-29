"use client";

import { GroupComicsSkeleton } from "@/components/Skeletons";
import { getGroupLists } from "@/utils/qComics";
import { useQuery } from "@tanstack/react-query";
import { FaAngleRight } from "react-icons/fa";
import { twMerge } from "tailwind-merge";
import CardComics from "@/components/CardComics";
import { useRef } from "react";
import { useDraggable } from "react-use-draggable-scroll";

const getAccent = {
  asurascans: {
    title: "ASURASCANS - NEW",
    title_link: "Browse more",
    link: "asura",
    text: "text-purple-700",
    scroll: "asuraScroll"
  },
  flamecomics: {
    title: "FLAMECOMICS - NEW",
    title_link: "Browse more",
    link: "flamelink",
    text: "text-red-700",
    scroll: "flameScroll"
  },
  rizzcomic: {
    title: "RIZZCOMIC - NEW",
    title_link: "Browse more",
    link: "rizz link",
    text: "text-green-700",
    scroll: "rizzScroll"
  },
  all: {
    title: "All NEW",
    title_link: "Browse more",
    link: "all link",
    text: "text-black/80",
    scroll: "darkScroll"
  }
};

export function CardGroups({ data: extras, source = "all" }) {
  const data = source !== "all" ? extras.filter(d => d.source === source) : extras;

  const ref = useRef();
  const { events } = useDraggable(ref);

  return (
    <>
      <section className="container flex flex-col gap-6 px-5 py-8">
        <header className="flex items-center justify-between">
          <h2 className={twMerge("text-xl font-bold", getAccent[source].text)}>{getAccent[source].title} </h2>
          <a href={getAccent[source].link} className="flex items-center gap-[0.35rem] text-[0.9rem]">
            {getAccent[source].title_link} <FaAngleRight />
          </a>
        </header>

        <ul
          {...events}
          ref={ref}
          className={twMerge("customScroll flex flex-shrink-0 flex-row gap-x-4 gap-y-6 overflow-x-scroll pb-6", getAccent[source].scroll)}
        >
          {data.map(comic => (
            <li key={comic.id} className="flex w-[30vw] flex-shrink-0 flex-col gap-2 md:w-[14vw] lg:w-[140px]">
              <CardComics comicData={comic} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
