import { Scraps } from "@/sequelize/models";

export async function GET() {
  try {
    const req = await Scraps.findAll({
      where: {
        mainId: null
      },
      order: [["updated_at", "DESC"]]
    });
    return Response.json(req);
  } catch (e) {
    return Response.json(e.message);
  }
}
