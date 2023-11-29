import { formatDateAgo } from "@/helpers/dateTime";
import { Comics, Scraps } from "@/sequelize/models";
import { sequelize } from "@/sequelize/sequelize";
import { DateTime } from "luxon";

// export async function GET() {
//   try {
//     const req = await Scraps.findOne({
//       where: {
//         source: "asurascans",
//         mainId: null
//       },
//       order: [["updated_at", "DESC"]]
//     });
//     // Directly create a DateTime object from the ISO string
//     const dbDateTime = DateTime.fromISO(req.updated_at);

//     return Response.json({ req: req, db: formatDateAgo(dbDateTime) });
//   } catch (e) {
//     return Response.json(e.message);
//   }
// }

export async function GET() {
  try {
    await sequelize.authenticate();
    return Response.json("Connection has been established successfully.");
  } catch (error) {
    return Response.json("Unable to connect to the database:", error.message, {
      db: process.env.DB_DB,
      user: process.env.DB_USER,
      pw: process.env.DB_PASS,
      host: process.env.DB_HOST
    });
  }
}
