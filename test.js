
const { data } = await axios.get(_getScrap.link_chapter, { timeout: 20000 });

  const $ = cheerio.load(data);

  // const clist = $(".readerarea > img")
  //   .map((_, comic) => {
  //     return $(comic).attr("src");
  //   })
  //   .get();

  return Response.json(data);