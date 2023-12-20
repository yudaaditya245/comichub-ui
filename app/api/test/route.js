// import prisma from "@/lib/prismaClient";
import { PrismaClient } from "@prisma/client";

import axios from "axios";
const prisma = new PrismaClient();

import * as cheerio from "cheerio";

export async function GET(request) {
  try {
    const link = "https://drakescans.com/series/i-am-the-final-boss-2/chapter-26/";
    const { data } = await axios.get(link, { timeout: 20000 });
    const $ = cheerio.load(data);

    const clist = $(".reading-content img")
      .map((_, comic) => {
        const _image = $(comic).attr("src");
        return _image.match(/(https?:\/\/[^\s]+)/)[1];
      })
      .get();

    return Response.json(clist);
  } catch (error) {
    return Response.error(error.message);
  } finally {
    await prisma.$disconnect();
  }
}
