import { formatDateAgo } from "@/helpers/dateTime";
import Image from "next/image";
import Link from "next/link";
import { FaAngleRight } from "react-icons/fa";

export default function CardComics({ comicData }) {
  const cardUrl = comicData.mainId === null ? `/extra/${comicData.id}` : `/comics/${comicData.id}`;

  return (
    <>
      <div className="relative block aspect-[3/4.5] overflow-hidden rounded-md bg-blue-400 shadow-lg">
        <Link href={cardUrl}>
          <Image src={comicData.cover_img} fill={true} alt="Comic" className="h-full w-full object-cover object-center" />
        </Link>

        <a
          href={comicData.link_chapter}
          target="_blank"
          className="absolute bottom-0 flex w-full items-center 
                            bg-gradient-to-t from-black/80 to-black/50 py-[0.35rem] pl-[0.65rem] pr-2
                            text-sm leading-[1.16rem] text-white/80 backdrop-blur-sm"
        >
          <section className="flex grow flex-col leading-[1.1rem]">
            <span className="text-[0.8rem] font-[700] sm:text-[0.9rem]">Chapter {comicData.latest_chapter}</span>
            <span className="text-[0.78rem] text-white/70 sm:text-[0.85rem]">{formatDateAgo(comicData.updated_at)}</span>
            {/* <span className="text-[0.78rem] text-white/70 sm:text-[0.85rem]">{comicData.updated_at.toIso().toString()}</span> */}
          </section>
          <i href="">
            <FaAngleRight />
          </i>
        </a>
      </div>

      <Link href={cardUrl} className="line-clamp-2 text-ellipsis font-semibold text-black/70 max-md:text-[0.9rem]">
        {comicData.title}
      </Link>
    </>
  );
}