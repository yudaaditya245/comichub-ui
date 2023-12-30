import { formatDateAgo } from "@/helpers/dateTime";
import Image from "next/image";
import Link from "next/link";
import { FaAngleRight } from "react-icons/fa";
import { BsFire } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { openChap, setId, setUrl } from "@/redux/features/chapdiag";
import { useQueryState } from "next-usequerystate";
import { useRouter } from "next/navigation";

export default function CardComics({ comic, sourceLabel = false, excLabel = false }) {
  const cardUrl = sourceLabel ? `/extra/${comic.id}` : `/comic/${comic.main_id}`;
  const chapterUrl = comic.scrap_id ? `/read/${comic.scrap_id}` : `/read/${comic.id}`;
  const id = comic.scrap_id ? comic.scrap_id : comic.id;

  const dispatch = useDispatch();
  const [_, setchapdial] = useQueryState("m", { history: "push", shallow: false });

  function chapDiagHandler() {
    dispatch(setUrl(comic.link_chapter));
    dispatch(setId(id));

    // router.push("/?m=1");
    setchapdial("1");
    // dispatch(openChap());
  }

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
          onClick={chapDiagHandler}
          className="absolute text-left bottom-0 flex w-full items-center bg-gradient-to-t from-black/80 to-black/50 py-[0.35rem] 
                      pl-[0.65rem] pr-2 text-sm leading-[1.16rem] text-white/80 backdrop-blur-sm"
        >
          <section className="flex grow flex-col leading-[1.1rem]">
            <span className="text-[0.82rem] font-[700] sm:text-[0.9rem]">Chapter {comic.latest_chapter}</span>
            <span className="text-[0.75rem] text-white/70 sm:text-[0.85rem]">{formatDateAgo(comic.updated_at)}</span>
          </section>
          <i href="">
            <FaAngleRight />
          </i>
        </button>
      </div>

      <Link href={cardUrl} className="line-clamp-2 text-ellipsis px-[0.1rem] font-semibold text-black/70 max-md:text-[0.9rem]">
        {excLabel && <BsFire size={13} className="-mt-1 mr-[0.35rem] inline-block animate-pulse text-red-600" />}
        {comic.title}
      </Link>
    </>
  );
}
