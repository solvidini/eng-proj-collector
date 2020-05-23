const request = require('request');
const cheerio = require('cheerio');
const download = require('node-image-downloader');
const puppeteer = require('puppeteer');

const scrapeLink = 'https://mera.eu/lampy/lampy-wiszace/';
const webData = [];

(async () => {
  try {
    let page;
    const browser = await puppeteer.launch({ headless: false });

    page = await browser.newPage();
    await page.goto(scrapeLink, { waitUntil: 'networkidle2' });

    for (let j = 0; j < 5; j++) {
      await page.evaluate(() => {
        window.scrollTo(
          0,
          document.querySelector('body > div.page > div.producer')
            .offsetTop -
            document.querySelector('body > footer').offsetHeight
        );
      });
      await page.waitFor(5000);
    }

    let pageData = await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
      let data = [];

      const nodeList = document.querySelector(
        'body > div.page > div.tile.tile--bg-dark > div.tile__row.tile__row--tiles.floatfix'
      ).childNodes;

      nodeList.forEach((node) => {
        const title = node.querySelector('.tile__text').textContent;
        data.push({ title });
      });

      return data;
    });

    console.log(pageData);

    await browser.close();
  } catch (err) {
    console.log(err.message);
  }

  // const data = page.$('tile').then((element, next) => {
  //   console.log(element, next);
  // });
})();

// request(scrapeLink, (error, response, html) => {
//   if (!error && response.statusCode == 200) {
//     const $ = cheerio.load(html);

//     const articleBody = $('.tile');

//     console.log(articleBody.html());
//   } else {
//     console.log(error);
//   }
// });
