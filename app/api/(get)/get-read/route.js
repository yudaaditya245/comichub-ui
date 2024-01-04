import { getImages } from "@/lib/fetch-web/fetchImages";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const { scrap_id, chapter } = await request.json();

    const _getScrap = await prisma.scrapChapters.findFirst({
      where: {
        scrap_id: parseInt(scrap_id),
        chapter: parseInt(chapter)
      },
      include: {
        scrap: true
      }
    });

    if (!_getScrap || _getScrap === null) return Response.error("data not found!");

    let images = [];
    if (_getScrap.images) {
      images = JSON.parse(_getScrap.images);
    } else {
      // images = [_getScrap.link, _getScrap.scrap.source]
      images = await getImages(_getScrap.link, _getScrap.scrap.source);

      if (images && images !== null) {
        await prisma.scrapChapters.update({
          where: {
            id: _getScrap.id
          },
          data: {
            images: JSON.stringify(images)
          }
        });
      }
    }

    const data = {
      ..._getScrap.scrap,
      images,
      updated_at : _getScrap.updated_at,
      link: _getScrap.link,
      chapter: _getScrap.chapter
    }

    return Response.json(data);
  } catch (error) {
    return Response.json(error.message);
  } finally {
    await prisma.$disconnect();
  }
}
