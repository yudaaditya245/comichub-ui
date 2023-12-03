import { formatDateAgo } from "@/helpers/dateTime";
import { ComicScrap, Comics, Scraps } from "@/sequelize/models";
import { sequelize } from "@/sequelize/sequelize";
import { DateTime } from "luxon";
import { Op, Sequelize } from "sequelize";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const res = await prisma.comics.findMany({
      include: {
        latest_scrap: true
      },
      orderBy: {
        latest_scrap: {
          updated_at: "desc"
        }
      },
      take: 18
    });

    return Response.json(res);
  } catch (e) {
    return Response.json(e.message);
  }
}

// export async function GET() {
//   try {
//     await sequelize.authenticate();
//     return Response.json("Connection has been established successfully.");
//   } catch (error) {
//     return Response.json("Unable to connect to the database:", error.message, {
//       db: process.env.DB_DB,
//       user: process.env.DB_USER,
//       pw: process.env.DB_PASS,
//       host: process.env.DB_HOST
//     });
//   }
// }
