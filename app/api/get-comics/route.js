import prisma from "@/lib/prismaClient";
import _ from "lodash";

// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();

export async function GET(request) {
  const page = request.nextUrl.searchParams.get("page") || 1;
  const limit = parseInt(request.nextUrl.searchParams.get("limit")) || 18;
  const ex = request.nextUrl.searchParams.get("ex");
  const offset = (page - 1) * limit;

  try {
    let data = {};

    if (ex && ex !== "false") {
      data = await withExclusive(limit, offset);
    } else {
      data = await noExclusive(limit, offset);
    }

    const isNext = data.length >= limit;

    return Response.json({
      isNext,
      page,
      source: "all",
      data
    });
  } catch (error) {
    throw error.message;
  } finally {
    await prisma.$disconnect();
  }
}

async function withExclusive(limit, offset) {
  const _get_scraps = await prisma.$queryRaw`
    SELECT 
      s.id, 
      COALESCE(c.title, s.title) as title,
      s.main_id, 
      s.latest_chapter, 
      s.lang, 
      s.link_chapter,
      s.source, 
      s.link, 
      s.images, 
      s.updated_at, 
      s.id as scrap_id, 
      COALESCE(c.cover_img, s.cover_img) as cover_img,
      COALESCE(c.description, null) as description,
      COALESCE(c.synonyms, null) as synonyms,
      COALESCE(c.genres, null) as genres
    FROM Scraps s
    LEFT JOIN Comics c ON s.main_id = c.id AND s.main_id IS NOT NULL
    WHERE 
        s.main_id IS NULL 
        OR
        (
            s.latest_chapter = (SELECT MAX(latest_chapter) FROM Scraps WHERE main_id = s.main_id)
            AND s.updated_at = (SELECT MIN(updated_at) FROM Scraps WHERE main_id = s.main_id AND latest_chapter = s.latest_chapter)
            AND s.id = (SELECT MIN(id) FROM Scraps WHERE main_id = s.main_id AND latest_chapter = s.latest_chapter AND updated_at = s.updated_at)
        )
    ORDER BY s.updated_at DESC, s.id ASC
    LIMIT ${limit} OFFSET ${offset};

  `;

  return _get_scraps.map(comic => {
    
    const _synonyms = !comic.synonyms
      ? null
      : _.uniq(
          JSON.parse(comic.synonyms)
            .flat(Infinity)
            .filter(value => value !== null)
        );
    const _genres = !comic.genres ? null : JSON.parse(comic.genres).flat(Infinity);

    return {
      ...comic,
      synonyms: _synonyms,
      genres: _genres
    };
  });
}

async function noExclusive(limit, offset) {
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

  return _get_scraps_id_filtered.map(comic => ({
    ...comic,
    synonyms: _.uniq(
      JSON.parse(comic.synonyms)
        .flat(Infinity)
        .filter(value => value !== null)
    ),
    genres: JSON.parse(comic.genres).flat(Infinity)
  }));
}
