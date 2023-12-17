"use client";

import { LatestComicsSkeleton } from "@/components/Skeletons";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { useEffect } from "react";
import Backdrop from "./comp/backdrop";
import { FaHeart, FaStar } from "react-icons/fa";
import Link from "next/link";
import Rating from "./comp/rating";

export default function ComicPage({ params }) {
  const { id } = params;

  const queryClient = useQueryClient();
  // link, link_chap, main_id, scrap_id, source, synonyms, title, updated_at
  // cover_img, desc, genres, id, images, lang, latest_chap,
  const cacheData = queryClient.getQueryData(["getComicsInfinity"])?.pages.flatMap(page => page.data);
  // console.log("cached", cacheData);

  const { isLoading, data: comic } = useQuery({
    queryKey: ["getComic", id],
    queryFn: async () => {
      const { data } = await axios.post(`/api/get-comic`, {
        id: id
      });
      if (data) return data;
      throw Error("No data");
    },
    initialData: () => {
      return cacheData?.find(data => data.main_id === parseInt(id));
    }
  });

  return (
    <main className="flex flex-col">
      {isLoading ? (
        "loading"
      ) : (
        <>
          <header className="relative bg-gradient-to-b from-transparent from-80% to-light-300 p-6">
            <Backdrop url={comic.cover_img} />

            <section className="container flex flex-row gap-6">
              <div className="relative w-[30vw] shrink-0 shadow md:max-w-[170px]">
                <Image
                  src={comic.cover_img}
                  width={500}
                  height={300}
                  alt={comic.title}
                  className="h-full w-full rounded-lg object-cover object-center"
                />
              </div>
              <div className="flex flex-col justify-center gap-3 pr-4 md:px-6">
                <h1 className="text-lg font-semibold ">{comic.title}</h1>

                <section className="flex gap-[0.4rem] font-medium">
                  <Rating score={comic.score} />
                  <i className="text-[0.9rem] font-medium not-italic"> {comic.score ? comic.score : "No rate"}</i>
                </section>

                <ul className="flex flex-wrap gap-1">
                  {comic.genres.map(genre => (
                    <li className="rounded-lg rounded-bl-none bg-white/60 px-2 py-[0.1rem] text-[0.8rem] shadow-sm">
                      <Link href={`/genre/${genre}`}>{genre}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </header>

          <section className="container p-6 pt-0 lg:pl-0">
            <button className="flex w-full items-center justify-center gap-2 rounded bg-[#ec294b] px-4 py-2 font-semibold text-white/90 shadow md:w-[170px]">
              <FaHeart /> Add to favorite
            </button>
          </section>
        </>
      )}
    </main>
  );
}
