// import prisma from "@/lib/prismaClient";
// import { convertStringToTimestamp } from "@/helpers/dateTime";
// import { getChapters } from "@/lib/fetch-web/fetchChapters";
import { convertStringToTimestamp } from "@/helpers/dateTime";
import { PrismaClient } from "@prisma/client";
// import axios from "axios";
// import * as cheerio from "cheerio";
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

// const prisma = new PrismaClient();

export async function POST(request) {
  // const { url } = await request.json();
  let browser;

  try {
    puppeteer.use(StealthPlugin());
    browser = await puppeteer.launch({
      headless: "new",
      defaultViewport: null
    });

    const page = await browser.newPage();

    await page.goto("https://shinigami.moe/series/player-who-returned-10000-years-later/");
    await page.waitForSelector(".wp-manga-chapter", { timeout: 30_000 });

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

    return Response.json(data);
  } catch (error) {
    return Response.json(error.message);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
