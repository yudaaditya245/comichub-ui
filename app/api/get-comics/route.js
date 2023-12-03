import { Comics, Scraps } from "@/sequelize/models";

export async function GET(request) {
  const page = request.nextUrl.searchParams.get("page") || 1;
  const source = request.nextUrl.searchParams.get("source");

  const limit = 18;
  const offset = (page - 1) * limit;

  let whereClause = {};
  if (source) {
    whereClause = {
      source: source
    };
  }

  const Model = source ? Scraps : Comics;

  try {
    const { count, rows } = await Model.findAndCountAll({
      where: whereClause,
      limit,
      offset,
      order: [["updated_at", "DESC"]]
    });

    const totalPage = Math.ceil(count / limit);

    return Response.json({ totalPage, data: rows });
  } catch (error) {
    throw error;
  }
}
