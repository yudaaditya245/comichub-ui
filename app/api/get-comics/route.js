import prisma from "@/lib/prismaClient";

export async function GET(request) {
  const page = request.nextUrl.searchParams.get("page") || 1;
  const source = request.nextUrl.searchParams.get("source");
  const limit = parseInt(request.nextUrl.searchParams.get("limit")) || 18;

  const offset = (page - 1) * limit;

  let Model,
    whereClause = {},
    includeClause = {},
    order;

  if (source) {
    Model = prisma.scraps;
    order = {
      updated_at: "desc"
    };
    whereClause.source = source;
  } else {
    Model = prisma.comics;
    order = {
      latest_scrap: {
        updated_at: "desc"
      }
    };
    includeClause.latest_scrap = true;
  }

  try {
    const data = await Model.findMany({
      take: limit,
      skip: offset,
      orderBy: order,
      include: includeClause,
      where: whereClause
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
