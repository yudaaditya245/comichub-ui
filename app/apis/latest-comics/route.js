import { Comics } from "@/sequelize/models";

export async function GET(request) {
  const page = request.nextUrl.searchParams.get("page") || 1;

  const limit = 18;
  const offset = (page - 1) * limit;

  try {
    const { count, rows } = await Comics.findAndCountAll({
      limit,
      offset,
      order: [["updated_at", "DESC"]]
    });

    const totalPage = Math.ceil(count / limit);
    return Response.json({ totalPage, data: rows });
  } catch (e) {
    return Response.json(e.message);
  }
}
