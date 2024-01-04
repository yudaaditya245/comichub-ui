import axios from "axios";
import * as cheerio from "cheerio";
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

export async function getImages(url, source) {
  if (source === "asurascans") {
    return await getAsura(url);
  } else if (source === "flamecomics") {
    return await getFlame(url);
  } else if (source === "rizzcomic") {
    return await getRizz(url);
  } else if (source === "drakescans") {
    return await getDrake(url);
  } else if (source === "shinigami") {
    return await getShinigami(url);
  }

  return false;
}

async function getAsura(url) {
  const { data } = await axios.get(url, { timeout: 20000 });
  const $ = cheerio.load(data);

  const images = $("#readerarea img")
    .map((_, comic) => {
      return $(comic).attr("src");
    })
    .get();

  return images;
}

async function getFlame(url) {
  const { data } = await axios.get(url, { timeout: 20000 });
  const $ = cheerio.load(data);

  const images = $("#readerarea img")
    .map((_, comic) => {
      return $(comic).attr("src");
    })
    .get();

  return images;
}

async function getRizz(url) {
  const { data } = await axios.get(url, { timeout: 20000 });
  const $ = cheerio.load(data);

  const images = $("#readerarea img")
    .map((_, comic) => {
      return $(comic).attr("src");
    })
    .get();

  return images;
}

async function getDrake(url) {
  const { data } = await axios.get(url, { timeout: 20000 });
  const $ = cheerio.load(data);

  const images = $(".reading-content img")
    .map((_, comic) => {
      return $(comic).attr("src").trim();
    })
    .get();

  return images;
}

async function getShinigami(url) {
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

    return _images;
  } catch (error) {
    return false;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
