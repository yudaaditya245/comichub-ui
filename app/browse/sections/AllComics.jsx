"use client";

import CardComics from "@/components/CardComics";
import { LatestComicsSkeleton } from "@/components/Skeletons";
import { scrollRestoreByCache } from "@/hooks/useScrollRestoration";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { Fragment } from "react";

export default function AllComics() {
  const { isPending, data, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["getComicsInfinity"],
    queryFn: async ({ pageParam }) => {
      const { data } = await axios.get(`/api/get-comics?page=${pageParam}&ex=yes`);
      if (data) return data;
      throw Error("No data");
    },
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      return lastPage.isNext ? parseInt(lastPage.page) + 1 : undefined;
    },
    staleTime : 5 * (60 * 1000)
  });

  // initialize scroll restoration, restore scroll when data still exist in useEffect
  scrollRestoreByCache("browseScrollY", data);

  return (
    <section className="container flex flex-col gap-6">
      {isPending ? (
        <LatestComicsSkeleton />
      ) : (
        <>
          <ul className="grid grid-cols-3 gap-x-4 gap-y-6 overflow-hidden md:grid-cols-6">
            {data.pages.map((data, index) => (
              <Fragment key={index}>
                {data.data.map(comic => (
                  <li key={comic.id} className="flex w-full flex-col gap-[0.65rem]">
                    <CardComics comic={comic} sourceLabel={comic.main_id === null} excLabel={comic.main_id === null}/>
                  </li>
                ))}
              </Fragment>
            ))}
          </ul>
          {isFetchingNextPage && <LatestComicsSkeleton />}
        </>
      )}

      {isFetchingNextPage || isPending || !hasNextPage ? (
        <div className="mt-3 flex items-center justify-center gap-2 rounded bg-white/60 p-3 drop-shadow-darksoft">
          <span className="text-black.70 text-[0.94rem] font-semibold">Thats it!</span>
        </div>
      ) : (
        <button
          onClick={() => fetchNextPage()}
          className="mt-3 flex items-center justify-center gap-2 rounded bg-white p-3 drop-shadow-darksoft"
        >
          <span className="text-[0.94rem] font-semibold">Browse more ...</span>
        </button>
      )}
    </section>
  );
}
