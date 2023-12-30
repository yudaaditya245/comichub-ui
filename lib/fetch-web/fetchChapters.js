import { convertStringToTimestamp } from "@/helpers/dateTime";
import * as cheerio from "cheerio";

export function getChapters(data, source) {
  if (source === "asurascans") {
    return getChapAsura(data);
  }

  return false;
}

function getChapAsura(data) {
  const $ = cheerio.load(data);

  const chapters = $(".clstyle li")
    .map((_, comic) => {
      const _chapter = $(comic).find(".chapternum").text();
      const chapter = _chapter.split(" ")[1];

      const updated_at = $(comic).find(".chapterdate").text();

      const link = $(comic).find("a").attr("href");

      return {
        chapter: parseInt(chapter),
        updated_at: new Date(updated_at),
        link
      };
    })
    .get();

  return chapters;
}
