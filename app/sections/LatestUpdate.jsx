"use client";

import CardComics from "@/components/CardComics";
import { FaAngleRight, FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import { AiOutlineStop } from "react-icons/ai";
import { useQuery } from "@tanstack/react-query";
import { getLatestLists } from "@/utils/qComics";
import { useEffect, useState } from "react";
import { LatestComicsSkeleton } from "@/components/Skeletons";

export default function LatestUpdate() {
  const [page, setPage] = useState(1);

  const { isPending, data, isRefetching } = useQuery({
    queryKey: ["getLatest", page],
    queryFn: () => getLatestLists(page)
  });

  const totalPage = parseInt(data?.totalPage);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  return (
    <section className="container flex flex-col gap-6 px-5 py-8">
      <header className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-black/75">LATEST UPDATE</h2>
        {isPending ? (
          <div className="h-4 w-20 animate-pulse rounded bg-black/30"></div>
        ) : (
          <a href="" className="flex items-center gap-[0.35rem] text-[0.9rem]">
            Browse more <FaAngleRight />
          </a>
        )}
      </header>

      {isPending ? (
        <LatestComicsSkeleton />
      ) : (
        <ul className="grid grid-cols-3 gap-x-4 gap-y-6 overflow-hidden md:grid-cols-6">
          {data.data
            ? data.data.map(comic => (
                <li key={comic.id} className="flex w-full flex-col gap-[0.65rem]">
                  <CardComics comicData={comic} />
                </li>
              ))
            : "No comic :("}
        </ul>
      )}

      {isPending ? (
        <div className="h-10 w-full rounded bg-black/30"></div>
      ) : (
        <section className="mt-4 flex gap-3">
          <button
            onClick={() => setPage(prev => prev - 1)}
            className="flex items-center justify-center rounded bg-white px-10
          drop-shadow-darksoft disabled:bg-white/60"
            disabled={page <= 1 || page > totalPage || isRefetching}
          >
            {page > 1 && page <= totalPage ? <FaLongArrowAltLeft /> : <AiOutlineStop className="text-red-900/60" />}
          </button>

          <span className="flex-grow rounded bg-white px-5 py-3 text-center font-[500] text-black/70">Page {page}</span>

          <button
            onClick={() => setPage(prev => prev + 1)}
            className="flex items-center justify-center rounded bg-white px-10
            drop-shadow-darksoft disabled:bg-white/60"
            disabled={page >= totalPage || page < 1 || isRefetching}
          >
            {page < totalPage && page >= 1 ? <FaLongArrowAltRight /> : <AiOutlineStop className="text-red-900/60" />}
          </button>
        </section>
      )}
    </section>
  );
}
