import prisma from "@/lib/prismaClient";

// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();

export async function GET(request) {
  const page = request.nextUrl.searchParams.get("page") || 1;

  const limit = parseInt(request.nextUrl.searchParams.get("limit")) || 18;
  const offset = (page - 1) * limit;

  const source = request.nextUrl.searchParams.get("source");
  const ex = request.nextUrl.searchParams.get("ex");

  let whereClause = {};
  if (ex) whereClause.main_id = null;
  if (source) whereClause.source = source;

  try {
    const data = await prisma.scraps.findMany({
      where: whereClause,
      orderBy: [
        {
          updated_at: "desc"
        },
        {
          id: "asc"
        }
      ],
      take: limit,
      skip: offset
    });

    const isNext = data.length >= limit;

    return Response.json({ isNext, page, source: "all", data });
  } catch (error) {
    throw error.message;
  } finally {
    await prisma.$disconnect();
  }
}
