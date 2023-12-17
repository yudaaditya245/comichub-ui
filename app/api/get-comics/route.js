import prisma from "@/lib/prismaClient";

// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();

export async function GET(request) {
  const page = request.nextUrl.searchParams.get("page") || 1;
  const limit = parseInt(request.nextUrl.searchParams.get("limit")) || 18;
  const offset = (page - 1) * limit;

  try {
    const _req = await prisma.comicsLang.findMany({
      include: {
        scrap: true,
        comic: true
      },
      take: limit,
      skip: offset,
      orderBy: [
        {
          updated_at: "desc"
        },
        {
          id: "asc"
        }
      ]
    });

    const data = _req.map(comic => ({
      ...comic.scrap,
      scrap_id: comic.scrap.id,
      id: comic.comic.id,
      cover_img: comic.comic.cover_img,
      title: comic.comic.title
    }));

    const isNext = data.length >= limit;

    return Response.json({ isNext, page, source: "all", data });
  } catch (error) {
    throw error.message;
  } finally {
    await prisma.$disconnect();
  }
}
