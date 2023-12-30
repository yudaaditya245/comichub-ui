import { formatDateAgo } from "@/helpers/dateTime";
import Image from "next/image";
import Link from "next/link";
import { FaAngleRight, FaFileImage } from "react-icons/fa";
import { BsFire } from "react-icons/bs";
import { Fragment } from "react";
import { Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { setId } from "@/redux/features/chapdiag";
import { IoClose } from "react-icons/io5";
import { BiWorld } from "react-icons/bi";

export default function CardComics({ comic, sourceLabel = false, excLabel = false }) {
  const cardUrl = sourceLabel ? `/extra/${comic.id}` : `/comic/${comic.main_id}`;
  const id = comic.scrap_id ? comic.scrap_id : comic.id;

  const chapdial = useSelector(state => state.chapdiag);
  const dispatch = useDispatch();

  return (
    <>
      <div className="relative block aspect-[3/4.7] overflow-hidden rounded-md bg-blue-400 shadow-lg">
        {sourceLabel && (
          <div className="absolute top-0 flex w-full justify-end bg-gradient-to-b from-black/50 to-transparent p-1 pb-3">
            <span
              className="rounded-bl-lg rounded-tr bg-white/75 px-2 text-[0.8rem] font-semibold 
            text-black/80 backdrop-blur-sm"
            >
              {comic.source}
            </span>
          </div>
        )}

        <Link href={cardUrl}>
          <Image src={comic.cover_img} width={500} height={300} alt={comic.title} className="h-full w-full object-cover object-center" />
        </Link>

        <button
          onClick={() => dispatch(setId(id))}
          className={`absolute bottom-0 flex w-full items-center bg-gradient-to-t from-black/80 to-black/50 py-[0.35rem] pl-[0.65rem] 
                      pr-2 text-left text-sm leading-[1.16rem] text-white/80 backdrop-blur-sm`}
        >
          <section className="flex grow flex-col leading-[1.1rem]">
            <span className="text-[0.82rem] font-[700] sm:text-[0.9rem]">Chapter {comic.latest_chapter}</span>
            <span className="text-[0.75rem] text-white/70 sm:text-[0.85rem]">{formatDateAgo(comic.updated_at)}</span>
          </section>
          <i href="">
            <FaAngleRight />
          </i>
        </button>

        <Transition
          show={chapdial.id === id}
          as={Fragment}
          enter="ease-out duration-75"
          enterFrom="top-[100%]"
          enterTo="top-0"
          leave="ease-in duration-75"
          leaveFrom="top-0"
          leaveTo="top-[100%]"
        >
          <div className="absolute flex h-full w-full flex-col justify-end bg-black/80 text-[0.9rem] backdrop-blur-sm">
            <section className="flex flex-col grow justify-center items-center p-3 pb-1 text-white/90">
              <span className="font-medium">Chapter {comic.latest_chapter}</span>
              <span className="text-[0.8rem] text-white/[0.65]">- {comic.source}</span>
            </section>

            <section className="flex flex-shrink-0 flex-col gap-[0.35rem] p-2 text-sm text-white/95">
              <a
                href={comic.link_chapter}
                target="_blank"
                className="flex w-full items-center justify-between gap-2 rounded bg-blue-600 px-3 py-[0.35rem] text-[0.83rem] text-left"
              >
                Visit web <BiWorld />
              </a>
              <Link
                href={`/read/${id}`}
                className="flex w-full items-center justify-between gap-2 rounded bg-green-600 px-3 py-[0.35rem] text-[0.83rem] text-left"
              >
                Read here <FaFileImage />
              </Link>
            </section>

            <button className="flex w-full justify-center pb-3 pt-1 text-white/80" 
              onClick={() => dispatch(setId(null))}>
              <IoClose size={15} />
            </button>
          </div>
        </Transition>
      </div>

      <Link href={cardUrl} className="line-clamp-2 text-ellipsis px-[0.1rem] font-semibold text-black/70 max-md:text-[0.9rem]">
        {excLabel && <BsFire size={13} className="-mt-1 mr-[0.35rem] inline-block animate-pulse text-red-600" />}
        {comic.title}
      </Link>
    </>
  );
}
