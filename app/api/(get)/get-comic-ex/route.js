// import prisma from "@/lib/prismaClient";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(request) {
  const { id } = await request.json();

  try {
    const _req = await prisma.scraps.findUnique({
      where: {
        id: parseInt(id)
      },
      include: {
        chapters: {
          orderBy : {
            updated_at : 'desc'
          }
        },
        source_group: true
      }
    });

    return Response.json(_req);
  } catch (error) {
    throw error.message;
  } finally {
    await prisma.$disconnect();
  }
}
