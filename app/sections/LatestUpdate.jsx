import CardComics from "@/components/CardComics";
import { FaAngleRight, FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import { AiOutlineStop } from "react-icons/ai";
import Link from "next/link";

export default function LatestUpdate({ data }) {
  const page = parseInt(data.page);
  const totalPage = parseInt(data.totalPage);

  return (
    <section className="container flex flex-col gap-6 px-5 py-8">
      <header className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-black/75">LATEST UPDATE</h2>
        <a href="" className="flex items-center gap-[0.35rem] text-[0.9rem]">
          Browse more <FaAngleRight />
        </a>
      </header>

      <ul className="grid grid-cols-3 gap-x-4 gap-y-6 overflow-hidden md:grid-cols-6">
        {data.data
          ? data.data.map(comic => (
              <li key={comic.id} className="flex w-full flex-col gap-[0.65rem]">
                <CardComics comicData={comic} />
              </li>
            ))
          : "No comic :("}
      </ul>

      <section className="mt-4 flex gap-3">
        <Link scroll={false}
          href={data.page > 1 ? `?page=${parseInt(data.page) - 1}` : ""}
          className="flex items-center justify-center rounded bg-white px-10 
                      drop-shadow-darksoft disabled:bg-white/60">
          {page > 1 && page <= totalPage ? <FaLongArrowAltLeft /> : <AiOutlineStop className="text-red-900/60" />}
        </Link>

        <span className="flex-grow rounded bg-white px-5 py-3 text-center font-[500] text-black/70">Page {page}</span>

        <Link scroll={false}
          href={data.page < data.totalPage ? `?page=${parseInt(page) + 1}` : ""}
          className="flex items-center justify-center rounded bg-white px-10 
                      drop-shadow-darksoft disabled:bg-white/60">
          {page < totalPage && page >= 1 ? <FaLongArrowAltRight /> : <AiOutlineStop className="text-red-900/60" />}
        </Link>
      </section>
    </section>
  );
}
