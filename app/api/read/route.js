// // import prisma from "@/lib/prismaClient";
// import { getImages } from "@/lib/fetchChapter";
// import { PrismaClient } from "@prisma/client";

// import axios from "axios";
// const prisma = new PrismaClient();

// export async function GET(request) {
//   const id = parseInt(request.nextUrl.searchParams.get("id"));

//   if (!id) {
//     return Response.error("Forbidden");
//   }

//   try {
//     const _getScrap = await prisma.scraps.findUnique({
//       where: {
//         id
//       }
//     });

//     // if already have images in db, then return images
//     if (_getScrap.images !== null) {
//       return Response.json(JSON.parse(_getScrap.images));
//     }

//     const { data } = await axios.get(_getScrap.link_chapter, { timeout: 20000 });
//     const images = getImages(_getScrap.source, data);

//     if (!images) {
//       return Response.error("fetch failed!");
//     }

//     await prisma.scraps.update({
//       where: {
//         id
//       },
//       data: {
//         images: JSON.stringify(images)
//       }
//     });

//     return Response.json(images);
//   } catch (error) {
//     return Response.error(error.message);
//   } finally {
//     await prisma.$disconnect();
//   }
// }
