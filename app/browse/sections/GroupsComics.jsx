import CardComics from "@/components/CardComics";
import { LatestComicsSkeleton } from "@/components/Skeletons";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { Fragment } from "react";

export default function GroupsComics({ source }) {
  const { isPending, data, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["getLatestGroups", source],
    queryFn: async ({ pageParam = 1 }) => {
      const { data } = await axios.get(`/api/get-comics?source=${source}&page=${pageParam}`);
      if (data) return data;
      throw Error("No data");
    },
    getNextPageParam: lastPage => {
      return lastPage.isNext ? lastPage.page + 1 : undefined;
    }
  });

  // const data = await getLatest();
  // console.log(!isPending && data);
  return (
    <section className="container flex flex-col gap-6">
      {isPending ? (
        <LatestComicsSkeleton />
      ) : (
        <ul className="grid grid-cols-3 gap-x-4 gap-y-6 overflow-hidden md:grid-cols-6">
          {data.pages.map((data, index) => (
            <Fragment key={index}>
              {data.data.map(comic => (
                <li key={comic.id} className="flex w-full flex-col gap-[0.65rem]">
                  <CardComics comicData={comic} />
                </li>
              ))}
            </Fragment>
          ))}
          {isFetchingNextPage && <LatestComicsSkeleton />}
        </ul>
      )}

      {isFetchingNextPage || isPending || !hasNextPage ? (
        <button className="mt-3 flex items-center justify-center gap-2 rounded bg-white p-3 drop-shadow-darksoft">
          <span className="text-[0.94rem] font-medium">No page</span>
        </button>
      ) : (
        <button
          onClick={() => fetchNextPage()}
          className="mt-3 flex items-center justify-center gap-2 rounded bg-white p-3 drop-shadow-darksoft"
        >
          <span className="text-[0.94rem] font-medium">Browse More</span>
        </button>
      )}
    </section>
  );
}
