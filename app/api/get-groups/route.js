import { Scraps } from "@/sequelize/models";

export async function GET(request) {
  // const group = request.nextUrl.searchParams.get("group");

  try {
    const req = await Scraps.findAll({
      where: {
        // source: group,
        mainId: null
      },
      order: [["updated_at", "DESC"]]
    });
    return Response.json(req);
  } catch (e) {
    return Response.json(e.message);
  }
}
