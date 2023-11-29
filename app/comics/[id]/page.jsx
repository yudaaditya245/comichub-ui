"use client";

import { LatestComicsSkeleton } from "@/components/Skeletons";
import { getComicDetail } from "@/utils/qComics";
import { useQuery } from "@tanstack/react-query";

export default function ComicPage({ params }) {
  const { id } = params;

  const { isLoading, data: comic } = useQuery({
    queryKey: ["comicdata", id],
    queryFn: ({ queryKey }) => {
      return getComicDetail(queryKey[1]);
    }
  });

  return (
    <main className="p-5">
      <h2>{!isLoading && comic.title}</h2>
      <p>{!isLoading && comic.description}</p>
      <div className="mt-5 flex flex-col gap-3">
        <strong>Available chapter</strong>
        {!isLoading && comic.scraps.map((extra) => (
          <a key={extra.id} href={extra.link_chapter} target="_blank">{extra.source} - Chapter {extra.latest_chapter}</a>
        ))}
      </div>
    </main>
  );
}
