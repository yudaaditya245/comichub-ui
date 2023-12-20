import * as cheerio from "cheerio";

export function getImages(source, data) {
  if (source === "asurascans") {
    return getAsura(data);
  }

  if (source === "flamecomics") {
    return getFlame(data);
  }

  if (source === "rizzcomic") {
    return getRizz(data);
  }

  if (source === "drakescans") {
    return getDrake(data);
  }

  return false
}

function getAsura(data) {
  const $ = cheerio.load(data);

  const clist = $("#readerarea img")
    .map((_, comic) => {
      return $(comic).attr("src");
    })
    .get();

  return clist;
}

function getFlame(data) {
  const $ = cheerio.load(data);

  const clist = $("#readerarea img")
    .map((_, comic) => {
      return $(comic).attr("src");
    })
    .get();

  return clist;
}

function getRizz(data) {
  const $ = cheerio.load(data);

  const clist = $("#readerarea img")
    .map((_, comic) => {
      return $(comic).attr("src");
    })
    .get();

  return clist;
}

function getDrake(data) {
  const $ = cheerio.load(data);

  const clist = $(".reading-content img")
    .map((_, comic) => {
      const _image = $(comic).attr("src");
      return _image.match(/(https?:\/\/[^\s]+)/)[1];
    })
    .get();

  return clist;
}
