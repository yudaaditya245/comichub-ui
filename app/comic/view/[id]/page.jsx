"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Backdrop from "@/components/comic-page/backdrop";
import Image from "next/image";
import Rating from "@/components/comic-page/rating";
import Link from "next/link";
import { BiWorld } from "react-icons/bi";
import { HiOutlineExternalLink } from "react-icons/hi";
import { FiExternalLink } from "react-icons/fi";
import { TbReload } from "react-icons/tb";
import { FaHeart, FaList, FaThList } from "react-icons/fa";
import { formatDateAgo } from "@/helpers/dateTime";
import { useState } from "react";
import _ from "lodash";
import toast from "react-hot-toast";

export default function ComicExPage({ params }) {
  const { id } = params;

  const [isLoadChap, setLoadChap] = useState(false);

  const {
    isLoading,
    data: comic,
    refetch
  } = useQuery({
    queryKey: ["getComicEx", id],
    queryFn: async () => {
      const { data } = await axios.post(`/api/get-comic-ex`, {
        id: id
      });
      if (data) return data;
      throw Error("No data");
    }
  });

  async function chapRefetchHandler(url, source, id) {
    if (!_.includes(["asurascans", "flamecomics", "rizzcomic", "drakescans", "shinigami"], source)) {
      return false;
    }

    setLoadChap(true);
    const toastLoad = toast.loading("Loading...");

    console.log(url, source);
    const { data } = await axios.post("/api/fetch-chapters", {
      url,
      source,
      id
    });
    console.log(data);
    refetch();

    setLoadChap(false);
    toast.success("Done!", {
      id: toastLoad
    });
  }

  function toastHandler() {
    toast.loading("Here is your toast.");
  }

  return (
    <main className="flex flex-col">
      {isLoading ? (
        "loading"
      ) : (
        <>
          <header className="relative bg-gradient-to-b from-transparent from-80% to-light-300 p-6">
            <Backdrop url={comic.cover_img} />

            <section className="container flex flex-col items-center gap-6">
              <div className="relative w-[30vw] shrink-0 overflow-hidden rounded-lg shadow md:max-w-[170px]">
                <Image src={comic.cover_img} width={500} height={800} alt={comic.title} />
              </div>
              <section className="flex flex-col items-center gap-1">
                <h1 className="text-center text-lg font-semibold">{comic.title}</h1>
                <section className="flex items-center gap-3">
                  <Link
                    href={`/browse/?src=${comic.source_group.slug}`}
                    className="flex items-center gap-[0.3rem] text-[0.9rem] text-black/70"
                  >
                    <BiWorld size={16} /> <span className="mt-[0.1rem]">{comic.source_group.title}</span>
                  </Link>
                  <a target="_blank" href={comic.source_group.link}>
                    <HiOutlineExternalLink className="text-blue-800" />
                  </a>
                </section>
              </section>
            </section>
          </header>

          <section className="container flex flex-col gap-4 p-6 pt-0 lg:pl-0">
            <section className="flex gap-3 text-[0.9rem] font-semibold text-white/90">
              {comic.main_id !== null && (
                <Link
                  href={`/comic/${comic.main_id}`}
                  className="flex w-full items-center justify-center gap-2 rounded bg-green-700 px-4 py-2 shadow md:w-[170px]"
                >
                  <FaThList /> Main page
                </Link>
              )}
              <a
                target="_blank"
                href={comic.link}
                className="flex w-full items-center justify-center gap-2 rounded bg-blue-700 px-4 py-2 shadow md:w-[170px]"
              >
                <BiWorld size={16} /> Visit web
              </a>
              <button className="flex w-full items-center justify-center gap-2 rounded bg-[#ec294b] px-4 py-2 shadow md:w-[170px]">
                <FaHeart /> Favorite
              </button>
            </section>

            <div className="flex flex-col gap-4">
              <h3 className="mt-2 flex items-center gap-2 pl-1 font-semibold">
                <FaList size={13} /> <span className="mt-[0.13rem]">Chapter fetched</span>
                <button
                  disabled={isLoadChap}
                  onClick={() => chapRefetchHandler(comic.link, comic.source, comic.id)}
                  className="ml-2 rounded-full bg-white p-[0.35rem] shadow"
                >
                  <TbReload size={17} className={isLoadChap && "animate-spin"} />
                </button>
              </h3>

              <section className="grid grid-cols-2 gap-2 rounded pr-2">
                {comic.chapters.length < 1
                  ? "No chapter fetched"
                  : comic.chapters.map(chapter => (
                      <Link
                        href={`/read/${comic.id}/${chapter.chapter}`}
                        key={chapter.id}
                        className="flex items-center justify-between rounded bg-white px-3 py-[0.35rem] shadow"
                      >
                        <section className="flex flex-col">
                          <h4 className="text-[0.9rem] font-medium">Chapter {chapter.chapter}</h4>
                          <span className="text-[0.82rem] text-black/60">{formatDateAgo(chapter.updated_at)}</span>
                        </section>
                        <a href={chapter.link} target="_blank">
                          <FiExternalLink size={16} className="text-blue-900" />
                        </a>
                      </Link>
                    ))}
              </section>
            </div>
          </section>
        </>
      )}
    </main>
  );
}
