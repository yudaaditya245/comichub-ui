"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import Backdrop from "@/components/comic-page/backdrop";
import { FaAngleRight, FaHeart } from "react-icons/fa";
import Link from "next/link";
import Rating from "@/components/comic-page/rating";
import parse from "html-react-parser";
import { formatDateAgo } from "@/helpers/dateTime";
import { SiAnilist } from "react-icons/si";

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
              <div className="relative w-[30vw] shrink-0 overflow-hidden rounded-lg shadow md:max-w-[170px]">
                <Image src={comic.cover_img} width={500} height={300} alt={comic.title} />
              </div>
              <div className="flex flex-col justify-center gap-3 pr-4 md:px-6">
                <h1 className="text-lg font-semibold ">{comic.title}</h1>

                <section className="flex gap-[0.4rem] font-medium">
                  <Rating score={comic.score} />
                  <i className="text-[0.9rem] font-medium not-italic"> {comic.score ? comic.score / 10 : "No rate"}</i>
                </section>

                <ul className="flex flex-wrap gap-1">
                  {comic.genres.map(genre => (
                    <li key={genre} className="rounded-lg rounded-bl-none bg-white/60 px-2 py-[0.1rem] text-[0.8rem] shadow-sm">
                      <Link href={`/genre/${genre}`}>{genre}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </header>

          <section className="container flex flex-col gap-4 p-6 pt-0 lg:pl-0">
            <section className="flex gap-3 text-[0.9rem] font-semibold text-white/90">
              <a
                target="_blank"
                href={comic.anilist_url}
                className="flex w-full items-center justify-center gap-2 rounded bg-[#02a9ff] px-4 py-2 shadow md:w-[170px]"
              >
                <SiAnilist /> More info
              </a>
              <button className="flex w-full items-center justify-center gap-2 rounded bg-[#ec294b] px-4 py-2 shadow md:w-[170px]">
                <FaHeart /> Add to favorite
              </button>
            </section>

            <p className="rounded-[0.33rem] bg-white p-4 text-[0.94rem] text-black/70 shadow">{parse(comic.description)}</p>

            <section className="mt-3 flex flex-col gap-4">
              <h3 className="text-lg font-semibold text-black/80">Fetched source</h3>
              <div className="flex flex-col gap-2">
                {!comic.Scraps
                  ? "Loading..."
                  : comic.Scraps.map(scrap => (
                      <div key={scrap.id} className="flex items-center gap-4 rounded-[0.3rem] bg-white px-4 py-2 text-[0.9rem] shadow">
                        <div className="flex flex-col">
                          <span className="font-semibold">{scrap.source_group.title}</span>
                          <span className="text-[0.8rem] text-black/60">{scrap.source_group.link}</span>
                        </div>
                        <span className="flex grow flex-col items-end">
                          <i className="font-medium not-italic">Chapter {scrap.latest_chapter}</i>
                          <i className="text-[0.8rem] not-italic text-black/60">{formatDateAgo(scrap.updated_at)}</i>
                        </span>
                        <a
                          target="_blank"
                          href={scrap.link_chapter}
                          className="-mr-4 flex items-center rounded-bl rounded-tl bg-green-700 py-1 pl-2 pr-1 font-semibold text-white/80"
                        >
                          {scrap.lang} <FaAngleRight className="pt-[0.05rem]" />
                        </a>
                      </div>
                    ))}
              </div>
            </section>
          </section>
        </>
      )}
    </main>
  );
}
