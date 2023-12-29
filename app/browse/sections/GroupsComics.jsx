import CardComics from "@/components/CardComics";
import { LatestComicsSkeleton } from "@/components/Skeletons";
import { scrollRestoreByCache } from "@/hooks/useScrollRestoration";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { Fragment, useState } from "react";
import { twMerge } from "tailwind-merge";
import { MdFolderSpecial } from "react-icons/md";
import { Popover } from "@headlessui/react";
import { FaInfoCircle } from "react-icons/fa";

export default function GroupsComics({ source }) {
  const [exc, setExc] = useState(true);

  const { isPending, data, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["getGroupsInfinity", exc, source],
    queryFn: async ({ pageParam = 1 }) => {
      const { data } = await axios.get(`/api/get-comics-ex?source=${source}&page=${pageParam}&ex=${exc}`);
      if (data) return data;
      throw Error("No data");
    },
    getNextPageParam: lastPage => {
      return lastPage.isNext ? parseInt(lastPage.page) + 1 : undefined;
    }
  });

  // initialize scroll restoration, restore scroll when data still exist in useEffect
  scrollRestoreByCache(`${source}ScrollY`, data);

  return (
    <section className="container flex flex-col gap-6">
      {isPending ? (
        <LatestComicsSkeleton length={8} />
      ) : (
        <>
          <div>
            <div className={twMerge(`flex items-center gap-2`)}>
              <button onClick={() => setExc(prev => !prev)} className="flex items-center gap-2">
                <MdFolderSpecial size={23} className={twMerge("text-black/50", exc && "text-green-700")} />{" "}
                <i className="text-medium mt-[0.1rem] text-[0.92rem] not-italic">
                  / {source} / {exc ? "exclusive" : "all"}
                </i>
              </button>
              {exc && (
                <Popover className="relative ml-1">
                  <Popover.Button className="flex items-center outline-none">
                    <FaInfoCircle />
                  </Popover.Button>

                  <Popover.Panel className="absolute -left-10 z-20 mt-3 w-[200px] rounded bg-white px-4 py-3 text-left text-sm shadow-lg">
                    <span className="font-bold">Exclusive comic</span> is a comic with a title not found on AniList database.
                    <br />
                    <br />
                    It might be a new comic, or use a unique and/or uncommon title.
                    <br />
                    <br />
                    If a comic isn't featured on this exclusive page, you can find it in the <span className="font-bold">All</span> section.
                  </Popover.Panel>
                </Popover>
              )}
            </div>
          </div>

          <ul className="grid grid-cols-3 gap-x-4 gap-y-6 overflow-hidden md:grid-cols-6">
            {data.pages.map((data, index) => (
              <Fragment key={index}>
                {data.data.map(comic => (
                  <li key={comic.id} className="flex w-full flex-col gap-[0.65rem]">
                    <CardComics comic={comic} sourceLabel />
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
