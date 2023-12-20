// import prisma from "@/lib/prismaClient";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(request) {
  const { id } = await request.json();

  try {
    const _req = await prisma.comics.findUnique({
      where: {
        id: parseInt(id)
      },
      include: {
        Scraps: {
          orderBy: {
            updated_at: "desc"
          },
          include : {
            source_group : true
          }
        }
      }
    });

    const parsedData = {
      ..._req,
      synonyms: JSON.parse(_req.synonyms)
        .flat(Infinity)
        .filter(value => value !== null),
      genres: JSON.parse(_req.genres).flat(Infinity)
    };

    return Response.json(parsedData);
  } catch (error) {
    throw error.message;
  } finally {
    await prisma.$disconnect();
  }
}
