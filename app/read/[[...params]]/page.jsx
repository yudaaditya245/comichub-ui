"use client";

import ScrollTop from "@/components/ScrollTop";
import { useScrollTapView } from "@/hooks/useScrollTapView";
import { Transition } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { TiWorld } from "react-icons/ti";
import { CgSpinnerTwo } from "react-icons/cg";
import _ from "lodash";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import { GoHomeFill } from "react-icons/go";

export default function Read({ params }) {
  const [id, chapter] = params.params;
  const nextChap = parseInt(chapter) + 1;

  const { isShown: showTool } = useScrollTapView();

  const { isLoading, data: comic } = useQuery({
    queryKey: ["read", id, chapter],
    queryFn: async () => {
      const { data } = await axios.post(`/api/get-read`, {
        scrap_id: id,
        chapter: chapter
      });
      if (data) return data;
      throw Error("No data");
    }
  });

  const { isLoading: allChapLoading, data: allChap } = useQuery({
    queryKey: ["read", id],
    queryFn: async () => {
      const { data } = await axios.post(`/api/get-comic-ex`, {
        id: id
      });
      if (data) return data;
      throw Error("No data");
    }
  });

  let _prevchap = undefined,
    _nextchap = undefined;
  if (!allChapLoading) {
    const allChapters = allChap.chapters;
    _prevchap = _.find(allChapters, c => c.chapter < chapter);
    // console.log("prevchap", _prevchap);
    _nextchap = _.findLast(allChapters, c => c.chapter > chapter);
    // console.log("nextchap", _nextchap);
  }

  return (
    <>
      <Transition
        as={Fragment}
        show={isLoading}
        enter="transition ease-out duration-75"
        enterFrom="transform opacity-0 -translate-y-6"
        enterTo="transform opacity-100 translate-y-00"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 translate-y-00"
        leaveTo="transform opacity-0 -translate-y-6"
      >
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-slate-200">
          <section className="flex items-center gap-2 rounded bg-white px-6 py-5 shadow-md">
            Fetching
            <CgSpinnerTwo size={18} className="animate-spin" />
          </section>
        </div>
      </Transition>

      {!isLoading && (
        <div className="mx-auto max-w-3xl">
          <Transition
            as={Fragment}
            show={showTool}
            enter="transition ease-out duration-75"
            enterFrom="transform opacity-0 -translate-y-6"
            enterTo="transform opacity-100 translate-y-00"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 translate-y-00"
            leaveTo="transform opacity-0 -translate-y-6"
          >
            <section className="fixed left-0 top-0 z-[999] flex w-full justify-center">
              <div className="flex w-full max-w-3xl justify-between bg-black/80 p-5 shadow-md backdrop-blur-md">
                <div>
                  <Link href={`/comic/view/${comic.id}`}>
                    <h1 className="flex items-center gap-2 text-[1.1rem] font-semibold text-white/80">
                      {comic.title}
                      <FiArrowUpRight size={18} className="text-blue-300" />
                    </h1>
                  </Link>
                  <h3 className="text-[0.9rem] font-medium text-white/60">
                    Chapter {comic.chapter} &nbsp;&middot;&nbsp; {comic.source}
                  </h3>
                </div>
                <Link href={comic.link} target="_blank" className="flex h-full items-center">
                  <TiWorld className="text-white/80" size={20} />
                </Link>
              </div>
            </section>
          </Transition>

          <main className="relative mx-auto max-w-3xl">
            {comic.images.map((image, index) => (
              <Image key={index} src={image} alt={index} width={500} height={3000} className="relative z-10 w-full" priority/>
            ))}
            <div className="absolute left-0 top-0 z-0 h-full w-full animate-pulse bg-black/50"></div>
          </main>

          <Transition
            as={Fragment}
            show={showTool && !allChapLoading}
            enter="transition ease-out duration-75"
            enterFrom="transform opacity-0 translate-y-6"
            enterTo="transform opacity-100 translate-y-00"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 translate-y-00"
            leaveTo="transform opacity-0 translate-y-6"
          >
            <section className="fixed bottom-0 left-0 z-[999] flex w-full justify-center">
              <div
                className="flex w-full max-w-3xl justify-center gap-3 bg-black/80 p-5 text-[0.9rem] text-white/80
                            shadow-md backdrop-blur-md"
              >
                {_prevchap && (
                  <Link
                    href={`/read/${comic.id}/${_prevchap.chapter}`}
                    className="flex items-center gap-3 rounded border border-white/20 px-5 py-2"
                  >
                    <FaLongArrowAltLeft /> Previous
                  </Link>
                )}
                <Link href={`/comic/view/${comic.id}`} className="flex items-center gap-3 rounded border border-white/20 px-3 py-2">
                  <GoHomeFill size={18}/>
                </Link>
                {_nextchap && (
                  <Link
                    href={`/read/${comic.id}/${_nextchap.chapter}`}
                    className="flex items-center gap-3 rounded border border-white/20 px-5 py-2"
                  >
                    Next <FaLongArrowAltRight />
                  </Link>
                )}
              </div>
            </section>
          </Transition>

          <ScrollTop className="fixed bottom-5 right-5 z-[998] rounded bg-white p-3 shadow-md" />
        </div>
      )}
    </>
  );
}
