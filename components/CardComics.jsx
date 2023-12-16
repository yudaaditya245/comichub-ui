import { formatDateAgo } from "@/helpers/dateTime";
import Image from "next/image";
import Link from "next/link";
import { FaAngleRight } from "react-icons/fa";

export default function CardComics({ comic }) {
  const cardChapterUrl = comic.link_chapter ?? comic.scrap.link_chapter;
  const cardTitle = comic.title ?? comic.comic.title;
  const cardTime = comic.updated_at ?? comic.scrap.updated_at;
  const cardUrl = comic.comic ? `/comic/${comic.comic.id}` : `/extra/${comic.id}`;
  const cardImg = comic.cover_img ?? comic.comic.cover_img;
  const cardChapterNumber = comic.latest_chapter ?? comic.comic.latest_chapter;

  return (
    <>
      <div className="relative block aspect-[3/4.7] overflow-hidden rounded-md bg-blue-400 shadow-lg">
        {comic.source && (
          <span
            className="absolute right-1 top-1 rounded-bl-lg rounded-tr bg-white/70 px-2 text-[0.8rem] font-medium 
          text-black/80 backdrop-blur-sm"
          >
            {comic.source}
          </span>
        )}

        <Link href={cardUrl}>
          <Image src={cardImg} width={500} height={300} alt={cardTitle} className="h-full w-full object-cover object-center" />
        </Link>

        <a
          href={cardChapterUrl}
          target="_blank"
          className="absolute bottom-0 flex w-full items-center 
                            bg-gradient-to-t from-black/80 to-black/50 py-[0.35rem] pl-[0.65rem] pr-2
                            text-sm leading-[1.16rem] text-white/80 backdrop-blur-sm"
        >
          <section className="flex grow flex-col leading-[1.1rem]">
            <span className="text-[0.82rem] font-[700] sm:text-[0.9rem]">Chapter {cardChapterNumber}</span>
            <span className="text-[0.75rem] text-white/70 sm:text-[0.85rem]">{formatDateAgo(cardTime)}</span>
          </section>
          <i href="">
            <FaAngleRight />
          </i>
        </a>
      </div>

      <Link href={cardUrl} className="line-clamp-2 text-ellipsis font-semibold text-black/70 max-md:text-sm px-[0.1rem]">
        {cardTitle}
      </Link>
    </>
  );
}
