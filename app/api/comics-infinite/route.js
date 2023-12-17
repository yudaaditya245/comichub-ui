// import prisma from "@/lib/prismaClient";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request) {
  const page = request.nextUrl.searchParams.get("page") || 1;
  const source = request.nextUrl.searchParams.get("source");
  const limit = parseInt(request.nextUrl.searchParams.get("limit")) || 18;

  const offset = (page - 1) * limit;

  try {
    const _raw = await prisma.comicsLang.findMany({
      include: {
        scrap: true,
        comic: true
      },
      orderBy: {
        updated_at: "desc"
      },
      take: limit,
      skip: offset
    });

    const data = _raw.map(data => {
      return {
        id: data.comic.id,
        
        ...data.scrap
      };
    });

    const isNext = data.length === limit;

    return Response.json({
      page: parseInt(page),
      source,
      isNext,
      data
    });
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
