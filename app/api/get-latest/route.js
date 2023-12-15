import prisma from "@/lib/prismaClient";

// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

export async function GET(request) {
  try {
    const data = await prisma.comicsLang.findMany({
      take: 18,
      orderBy: {
        updated_at: "desc"
      },
      include : {
        comic : true,
        scrap : true
      },
      distinct : ['comic_id']
    });

    return Response.json(data);
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
