import prisma from "@/lib/prismaClient";

export async function GET(request) {
  try {
    const data = await prisma.groups.findMany({
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
