// import prisma from "@/lib/prismaClient";

import { PrismaClient } from "@prisma/client";
import _ from "lodash";
const prisma = new PrismaClient();

export async function GET(request) {
  const page = request.nextUrl.searchParams.get("page") || 1;
  const limit = parseInt(request.nextUrl.searchParams.get("limit")) || 18;
  const offset = (page - 1) * limit;

  try {
    // const _req = await prisma.comicsLang.findMany({
    //   include: {
    //     scrap: true,
    //     comic: true
    //   },
    //   take: limit,
    //   skip: offset,
    //   orderBy: [
    //     {
    //       updated_at: "desc"
    //     },
    //     {
    //       id: "asc"
    //     }
    //   ]
    // });

    // const data = _req.map(comic => ({
    //   ...comic.scrap,
    //   scrap_id: comic.scrap.id,
    //   id: comic.comic.id,
    //   cover_img: comic.comic.cover_img,
    //   title: comic.comic.title,
    //   description : comic.comic.description,
    //   synonyms : (JSON.parse(comic.comic.synonyms)).flat(Infinity).filter(value => value !== null),
    //   genres : (JSON.parse(comic.comic.genres)).flat(Infinity),
    // }));

    // const isNext = data.length >= limit;

    // return Response.json({ isNext, page, source: "all", data });
    const _get_scraps_id_filtered = await prisma.$queryRaw`
      SELECT 
        s.id, c.title, s.main_id, s.latest_chapter, s.lang, s.link_chapter,
        s.source, s.link, c.cover_img, s.images, s.updated_at, s.id as scrap_id, c.description,
        c.synonyms, c.genres
      FROM Scraps s
      INNER JOIN Comics c ON s.main_id = c.id
      WHERE s.main_id IS NOT NULL
      AND s.latest_chapter = (
        SELECT MAX(latest_chapter) FROM Scraps WHERE main_id = s.main_id
      )
      AND s.updated_at = (
        SELECT MIN(updated_at) FROM Scraps WHERE main_id = s.main_id AND latest_chapter = s.latest_chapter
      )
      AND s.id = (
        SELECT MIN(id) FROM Scraps WHERE main_id = s.main_id AND latest_chapter = s.latest_chapter AND updated_at = s.updated_at
      )
      ORDER BY s.updated_at DESC, s.id ASC
      LIMIT ${limit} OFFSET ${offset};
    `;

    const data = _get_scraps_id_filtered.map(comic => ({
      ...comic,
      synonyms: _.uniq(
        JSON.parse(comic.synonyms)
          .flat(Infinity)
          .filter(value => value !== null)
      ),
      genres: JSON.parse(comic.genres).flat(Infinity)
    }));

    return Response.json(data);
  } catch (error) {
    throw error.message;
  } finally {
    await prisma.$disconnect();
  }
}
