const puppeteer = require('puppeteer');
const uuid = require('uuid');

const uploadProducts = require('../utils/uploadProducts');
const errorHandler = require('../utils/errorHandler');

const scrollDownQuantity = 6;

const scraper = async (scrapeLink, scrapeID) => {
  try {
    let page;
    const browser = await puppeteer.launch();

    page = await browser.newPage();
    await page.goto(scrapeLink, { waitUntil: 'networkidle2' });

    for (let j = 0; j < scrollDownQuantity; j++) {
      await page.evaluate(() => {
        window.scrollTo(
          0,
          document.querySelector('body > div.page > div.producer')
            .offsetTop -
            document.querySelector('body > footer').offsetHeight
        );
      });
      await page.waitFor(3000);
    }

    let pageData =
      (await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
        let data = [];

        const nodeList = document.querySelector(
          'body > div.page > div.tile.tile--bg-dark > div.tile__row.tile__row--tiles.floatfix'
        ).childNodes;

        nodeList.forEach((node) => {
          const company = 'mera';
          const category = document.querySelector(
            'body > div.breadcrumb > div > div.breadcrumb__row.breadcrumb__row--nav > a:nth-child(3)'
          ).textContent;
          const title = node.querySelector('.tile__text').textContent;
          let uri = node.querySelector('.img').getAttribute('style');
          uri = uri.substring(23, uri.length - 3);
          data.push({ title, uri, company, category });
        });

        return data;
      })) || [];

    pageData = pageData.map((element) => {
      return {
        ...element,
        scrapeID: scrapeID,
        filename:
          scrapeID.toLowerCase().replace(' ', '-') + '-' + uuid.v4(),
        reference: scrapeLink,
      };
    });

    await uploadProducts(pageData, scrapeID);
    console.log(`Successfully scrapped ${scrapeID} products.`);
    await browser.close();
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    err.where = scrapeID;
    errorHandler(err);
  }
};

module.exports = scraper;
