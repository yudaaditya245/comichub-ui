import { formatDateAgo } from "@/helpers/dateTime";
import { Comics, Scraps } from "@/sequelize/models";
import { DateTime } from "luxon";

export async function GET() {
  try {
    const req = await Scraps.findOne({
      where: {
        source: "asurascans",
        mainId: null
      },
      order: [["updated_at", "DESC"]]
    });
    // Directly create a DateTime object from the ISO string
    const dbDateTime = DateTime.fromISO(req.updated_at);

    return Response.json({ req: req, db: formatDateAgo(dbDateTime) });
  } catch (e) {
    return Response.json(e.message);
  }
}
