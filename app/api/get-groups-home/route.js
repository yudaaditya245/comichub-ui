import { PrismaClient } from "@prisma/client";

export async function GET() {
  const prisma = new PrismaClient();

  try {
    const data = await prisma.scraps.findMany({
      orderBy: {
        updated_at: "desc"
      },
      where: {
        main_id: null
      }
    });

    return Response.json(data);
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect()
  }
}
