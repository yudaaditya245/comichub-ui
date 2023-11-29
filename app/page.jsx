import { CardGroups } from "./sections/CardGroups";
import LatestUpdate from "./sections/LatestUpdate";

import { Comics, Scraps } from "@/sequelize/models";

export async function getLatests(page = 1) {
  const limit = 18;
  const offset = (page - 1) * limit;

  try {
    const { count, rows } = await Comics.findAndCountAll({
      limit,
      offset,
      order: [["updated_at", "DESC"]]
    });

    const totalPage = Math.ceil(count / limit);
    return { page, totalPage, data: rows };
  } catch (e) {
    return e.message;
  }
}

export async function getExtras() {
  
  try {
    const data = await Scraps.findAll({
      where : {
        mainId : null
      },
      order: [["updated_at", "DESC"]]
    });

    return data;
  } catch (e) {
    return e.message;
  }
}

export default async function Home({ searchParams }) {
  const groupLists = ["asurascans", "flamecomics", "rizzcomic"];

  const page = searchParams.page;
  const comics = await getLatests(page);
  const scraps = await getExtras();

  console.log({comics, scraps});
  // console.log(scraps);
  return (
    <main>
      <LatestUpdate data={comics} />

      {groupLists.map((group, index) => (
        <CardGroups key={index} data={scraps} source={group} />
      ))}
    </main>
  );
}
