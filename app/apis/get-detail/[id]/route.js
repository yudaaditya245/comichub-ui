import { Comics, Scraps } from "@/sequelize/models";

export async function GET(request, { params }) {
  const id = params.id;

  try {
    const comicDetail = await Comics.findByPk(id, {
      include : Scraps
    });
    
    return Response.json(comicDetail);
  } catch (e) {
    return Response.json(e.message);
  }
}
