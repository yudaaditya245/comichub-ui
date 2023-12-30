import { convertStringToTimestamp } from "@/helpers/dateTime";
import axios from "axios";
import * as cheerio from "cheerio";
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

export async function getChapters(url, source) {
  if (source === "asurascans") {
    return await getAsuraChap(url);
  }

  if (source === "flamecomics") {
    return await getFlameChap(url);
  }

  if (source === "rizzcomic") {
    return await getRizzChap(url);
  }

  if (source === "shinigami") {
    return await getShinigamiChap(url);
  }

  if (source === "drakescans") {
    return await getDrakeChap(url);
  }

  return false;
}

async function getAsuraChap(url) {
  const { data } = await axios.get(url, { timeout: 20000 });
  const $ = cheerio.load(data);

  const chapters = $(".clstyle li")
    .map((_, comic) => {
      const _chapter = $(comic).find(".chapternum").text();
      const chapter = _chapter.split(" ")[1];

      const updated_at = $(comic).find(".chapterdate").text();

      const link = $(comic).find("a").attr("href");

      return {
        chapter: parseFloat(chapter),
        updated_at: new Date(updated_at),
        link
      };
    })
    .get();

  return chapters;
}

async function getFlameChap(url) {
  const { data } = await axios.get(url, { timeout: 20000 });
  const $ = cheerio.load(data);

  const chapters = $(".eplister ul li")
    .map((_, comic) => {
      const _chapter = $(comic).find(".chapternum").text();
      const chapter = _chapter.split(" ")[1];

      const updated_at = $(comic).find(".chapterdate").text();

      const link = $(comic).find("a").attr("href");

      return {
        chapter: parseFloat(chapter),
        updated_at: new Date(updated_at),
        link
      };
    })
    .get();

  return chapters;
}

async function getRizzChap(url) {
  const { data } = await axios.get(url, { timeout: 20000 });
  const $ = cheerio.load(data);

  const chapters = $(".eplister ul li")
    .map((_, comic) => {
      const _chapter = $(comic).find(".chapternum").text().trim();
      const chapter = _chapter.match(/\d+/)[0];

      const updated_at = $(comic).find(".chapterdate").text();

      const link = $(comic).find("a").attr("href");

      return {
        chapter: parseFloat(chapter),
        updated_at: new Date(updated_at),
        link
      };
    })
    .get();

  return chapters;
}

async function getShinigamiChap(url) {
  let browser;

  try {
    puppeteer.use(StealthPlugin());
    browser = await puppeteer.launch({
      headless: "new",
      defaultViewport: null
    });

    const page = await browser.newPage();

    await page.goto(url, {
      waitUntil : "domcontentloaded",
      timeout : 30_000
    });
    // await page.waitForSelector(".wp-manga-chapter", { timeout: 30_000 });

    const chapters = await page.evaluate(() => {
      const clists = document.querySelectorAll(".wp-manga-chapter");

      return Array.from(clists).map(comic => {
        const _chapter = comic.querySelector("a > p").innerText;
        const chapter = _chapter.split(" ")[1];

        const updated_at = comic.querySelector("a > span > i")?.innerText;

        const link = comic.querySelector("a").getAttribute("href");

        return {
          chapter: parseFloat(chapter),
          updated_at,
          link
        };
      });
    });

    await browser.close();

    const data = chapters.map(c => {
      const _timestring = ["second", "min", "hour", "day", "week"];
      let updated_at;
      if (_timestring.some(s => c.updated_at.includes(s))) {
        updated_at = convertStringToTimestamp(c.updated_at);
      } else {
        updated_at = new Date(c.updated_at);
      }

      return { ...c, updated_at };
    });

    return data;
  } catch (error) {
    return error;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

async function getDrakeChap(url) {
  let browser;

  try {
    puppeteer.use(StealthPlugin());
    browser = await puppeteer.launch({
      headless: "new",
      defaultViewport: null
    });

    const page = await browser.newPage();

    await page.goto(url);
    await page.waitForSelector(".wp-manga-chapter", { timeout: 30_000 });

    const chapters = await page.evaluate(() => {
      const clists = document.querySelectorAll(".wp-manga-chapter");

      return Array.from(clists).map(comic => {
        const _chapter = comic.querySelector("a").innerText;
        const chapter = _chapter.split(" ")[1];

        const updated_at =
          comic.querySelector(".chapter-release-date i")?.innerText ?? comic.querySelector(".chapter-release-date a").getAttribute("title");

        const link = comic.querySelector("a").getAttribute("href");

        return {
          chapter: parseFloat(chapter),
          updated_at,
          link
        };
      });
    });

    await browser.close();

    const data = chapters.map(c => {
      const _timestring = ["second", "min", "hour", "day", "week"];
      let updated_at;
      if (_timestring.some(s => c.updated_at.includes(s))) {
        updated_at = convertStringToTimestamp(c.updated_at);
      } else {
        const [day, month, year] = c.updated_at.split("/").map(Number);
        const reformattedDateString = `${month}/${day}/${year}`;
        updated_at = new Date(reformattedDateString);
      }

      return { ...c, updated_at };
    });

    return data;
  } catch (error) {
    return error;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
