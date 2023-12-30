// import prisma from "@/lib/prismaClient";
import { convertStringToTimestamp } from "@/helpers/dateTime";
import { getChapters } from "@/lib/fetch-web/fetchChapters";
import { PrismaClient } from "@prisma/client";
import axios from "axios";

const prisma = new PrismaClient();

export async function POST(request) {
  const { url, source, id } = await request.json();

  try {
    const { data } = await axios.get(url, { timeout: 20000 });
    const chapters = getChapters(data, source);

    await prisma.scrapChapters.deleteMany({
      where: {
        scrap_id: id
      }
    });

    const _data = chapters.map(d => {
      return {
        scrap_id: id,
        ...d
      };
    });

    await prisma.scrapChapters.createMany({
      data: _data
    });

    return Response.json("ok");
  } catch (error) {
    console.log(error.message);
  } finally {
    await prisma.$disconnect();
  }
}
