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
      headless: false,
      defaultViewport: null
    });

    const page = await browser.newPage();

    await page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout: 30_000
    });
    // await page.goto(url);

    // await page.setViewport({
    //   width: 1200,
    //   height: 1000
    // });

    await autoScroll(page);

    // await page.waitForSelector("span.image-vertical img", { timeout: 30_000 });
    // await page.screenshot({
    //   path: "./shini.jpg",
    //   fullPage: true
    // });

    const images = await page.evaluate(() => {
      const clists = document.querySelectorAll("span.image-vertical img");
      // return clists
      return Array.from(clists).map(comic => {
        return comic.getAttribute("src");
      });
    });

    await browser.close();

    // const _images = images.filter(url => url !== null).map(url => url.trim());

    return Response.json(images);
  } catch (error) {
    return Response.json(error);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise(resolve => {
      var totalHeight = 0;
      var distance = 1000;
      var timer = setInterval(() => {
        var scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight - window.innerHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });

  // await new Promise(resolve => setTimeout(resolve, 5000));
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
