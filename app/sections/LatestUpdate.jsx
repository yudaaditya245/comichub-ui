import CardComics from "@/components/CardComics";
import { FaAngleRight } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { LatestComicsSkeleton } from "@/components/Skeletons";
import axios from "axios";
import Link from "next/link";
import { getComics } from "@/utils/qComics";
import { Comics } from "@/sequelize/models";

async function getLatest() {
  try {
    const data = await Comics.findAll({
      limit : 18,
      order: [["updated_at", "DESC"]],
      attributes : ['id', 'title', 'cover_img', 'updated_at']
    });

    return data
  } catch (error) {
    throw error; // Rethrow the error to be caught by the calling code
  }
}

export default async function LatestUpdate() {
  // const { isLoading, data } = useQuery({
  //   queryKey: ["getLatest"],
  //   queryFn: async () => {
  //     const { data } = await axios.get(`/api/latest-comics`);
  //     if (data) return data;
  //     throw Error("No data");
  //   }
  // });
  const data = await getLatest();

  return (
    <section className="container flex flex-col gap-6 px-5 py-8">
      <header className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-black/75">LATEST UPDATE</h2>
        {/* {isLoading ? (
          <div className="h-4 w-20 animate-pulse rounded bg-black/30"></div>
        ) : ( */}
        <a href="" className="flex items-center gap-[0.35rem] text-[0.9rem]">
          Browse more <FaAngleRight />
        </a>
        {/* )} */}
      </header>

      {/* {isLoading ? (
        <LatestComicsSkeleton />
      ) : ( */}
      <ul className="grid grid-cols-3 gap-x-4 gap-y-6 overflow-hidden md:grid-cols-6">
        {data
          ? data.map(comic => (
              <li key={comic.id} className="flex w-full flex-col gap-[0.65rem]">
                <CardComics comicData={comic} />
              </li>
            ))
          : "No comic :("}
      </ul>
      {/* )} */}

      <Link href="/browse" className="mt-3 rounded bg-white p-3 drop-shadow-darksoft">
        Browse More
      </Link>
    </section>
  );
}
