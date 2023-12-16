import { ListGroups } from "./sections/ListGroups";
import LatestUpdate from "./sections/LatestUpdate";

export default async function Home() {
  return (
    <main>
      <LatestUpdate />
      <ListGroups />
    </main>
  );
}
