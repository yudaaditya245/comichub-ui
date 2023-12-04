"use client";

import CardComics from "@/components/CardComics";
import { FaAngleRight, FaBookOpen } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { LatestComicsSkeleton } from "@/components/Skeletons";
import axios from "axios";
import Link from "next/link";

// async function getLatest() {
//   const prisma = new PrismaClient();

//   try {
//     const data = await prisma.comics.findMany({
//       include: {
//         latest_scrap: true
//       },
//       orderBy: {
//         latest_scrap: {
//           updated_at: "desc"
//         }
//       },
//       take: 18
//     });

//     await new Promise(resolve => setTimeout(resolve, 5000));
//     return data;
//   } catch (error) {
//     throw error; // Rethrow the error to be caught by the calling code
//   }
// }

export default function LatestUpdate() {
  const { isLoading, data } = useQuery({
    queryKey: ["getLatest"],
    queryFn: async () => {
      const { data } = await axios.get(`/api/get-comics`);
      if (data) return data;
      throw Error("No data");
    }
  });

  // const data = await getLatest();

  return (
    <section className="container flex flex-col gap-6 px-5 py-8">
      <header className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-black/75">LATEST UPDATE</h2>
        <Link href="/browse" className="flex items-center gap-[0.35rem] text-[0.9rem]">
          Browse more <FaAngleRight />
        </Link>
      </header>

      {isLoading ? (
        <LatestComicsSkeleton />
      ) : (
        <ul className="grid grid-cols-3 gap-x-4 gap-y-6 overflow-hidden md:grid-cols-6">
          {data
            ? data.data.map(comic => (
                <li key={comic.id} className="flex w-full flex-col gap-[0.65rem]">
                  <CardComics comicData={comic} />
                  {/* {console.log("latest == ",comic)} */}
                </li>
              ))
            : "No comic :("}
        </ul>
      )}

      <Link href="/browse" className="mt-3 flex items-center justify-center gap-2 rounded bg-white p-3 drop-shadow-darksoft">
        <FaBookOpen />
        <span className="text-[0.94rem] font-medium">Browse More</span>
      </Link>
    </section>
  );
}
