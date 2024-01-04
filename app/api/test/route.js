// import prisma from "@/lib/prismaClient";
// import { convertStringToTimestamp } from "@/helpers/dateTime";
// import { getChapters } from "@/lib/fetch-web/fetchChapters";
// import { convertStringToTimestamp } from "@/helpers/dateTime";
// import { PrismaClient } from "@prisma/client";
import axios from "axios";
import * as cheerio from "cheerio";
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

// const prisma = new PrismaClient();

export async function POST(request) {
  const { url } = await request.json();
  let browser;

  try {
    puppeteer.use(StealthPlugin());
    browser = await puppeteer.launch({
      headless: "new",
      defaultViewport: null
    });

    const page = await browser.newPage();

    await page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout: 30_000
    });
    // await page.waitForSelector(".wp-manga-chapter", { timeout: 30_000 });

    const images = await page.evaluate(() => {
      const clists = document.querySelectorAll(".reading-content img");
      // return clists
      return Array.from(clists).map(comic => {
        return comic.getAttribute("data-src");
      });
    });

    await browser.close();

    const _images = images.filter(url => url !== null).map(url => url.trim());

    return Response.json(_images);
  } catch (error) {
    return Response.json(error);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

// export async function POST(request) {
//   const { url } = await request.json();

//   const { data } = await axios.get(url, { timeout: 20000 });
//   const $ = cheerio.load(data);

//   const images = $(".reading-content img")
//     .map((_, comic) => {
//       return $(comic).attr("src")
//     })
//     .get();

//   return Response.json(images);
// }
