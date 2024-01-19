"use client";

import CardComics from "@/components/CardComics";
import { LatestComicsSkeleton } from "@/components/Skeletons";
import { base_url } from "@/helpers/pubicEnv";
import useRefetchDelay from "@/hooks/useRefetchDelay";
import { scrollRestoreByCache } from "@/hooks/useScrollRestoration";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { Fragment } from "react";
import { FaAngleDown } from "react-icons/fa";

export default function AllComics() {
  const { isPending, data, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["getComicsInfinity"],
    queryFn: async ({ pageParam }) => {
      const { data } = await axios.get(`${base_url}/comic/getall?page=${pageParam}&ex=yes`);
      if (data) return data;
      throw Error("No data");
    },
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      return lastPage.isNext ? parseInt(lastPage.page) + 1 : undefined;
    },
    staleTime: 5 * (60 * 1000)
  });

  // initialize scroll restoration
  scrollRestoreByCache("browseScrollY", data);

  // UI: when data loading less than 200ms, skeleton transition break
  // so here, give delay for transition to finish
  const { skeleton, refetchDelay: fetchNextPageDelay } = useRefetchDelay(100, fetchNextPage, isFetchingNextPage);

  // console.log(inView);
  return (
    
    <section className="container flex flex-col gap-6">
      <LatestComicsSkeleton show={isPending} />

      {!isPending && (
        <>
          <ul className="grid grid-cols-3 gap-x-4 gap-y-6 overflow-hidden md:grid-cols-6">
            {data.pages.map((data, index) => (
              <Fragment key={index}>
                {data.data.map(comic => (
                  <li key={comic.id} className="flex w-full flex-col gap-[0.65rem]">
                    <CardComics comic={comic} sourceLabel={comic.main_id === null} excLabel={comic.main_id === null} />
                  </li>
                ))}
              </Fragment>
            ))}
          </ul>
          {<LatestComicsSkeleton show={skeleton} />}
        </>
      )}

      {isFetchingNextPage || isPending || !hasNextPage ? (
        <div className="mt-3 flex items-center justify-center gap-2 rounded bg-white/60 p-3 drop-shadow-darksoft">
          <span className="text-black.70 text-[0.94rem] font-semibold">Thats it!</span>
        </div>
      ) : (
        <button
          onClick={() => fetchNextPageDelay()}
          className="mt-3 flex items-center justify-center gap-2 rounded bg-white p-3 drop-shadow-darksoft"
        >
          <span className="flex items-center gap-2 text-[0.94rem] font-semibold">
            Browse more <FaAngleDown />
          </span>
        </button>
      )}
    </section>
  );
}
