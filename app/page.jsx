import { CardGroups } from "./sections/CardGroups";
import { Scraps } from "@/sequelize/models";
import LatestUpdate from "./sections/LatestUpdate";

export async function getExtras() {
  try {
    const data = await Scraps.findAll({
      where: {
        mainId: null
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
  const scraps = JSON.parse(JSON.stringify(await getExtras()));

  return (
    <main>
      <LatestUpdate page={page} />
      <CardGroups data={scraps} />

      {/* {groupLists.map((group, index) => (
        <CardGroups key={index} data={scraps} source={group} />
      ))} */}
    </main>
  );
}
