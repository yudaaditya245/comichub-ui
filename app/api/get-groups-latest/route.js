// import prisma from "@/lib/prismaClient";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request) {
  const source = request.nextUrl.searchParams.get("source");
  const ex = request.nextUrl.searchParams.get("ex"); // exclusive

  let whereClause;
  if (ex) [(whereClause.main_id = null)];

  try {
    if (!source) return Response.json("invalid!");

    const data = await prisma.scraps.findMany({
      where: whereClause,
      orderBy: {
        updated_at: "desc"
      }
    });

    return Response.json(data);
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
