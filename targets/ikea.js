const puppeteer = require('puppeteer');
const uuid = require('uuid');

const uploadProducts = require('../utils/uploadProducts');
const errorHandler = require('../utils/errorHandler');

const scraper = async (scrapeLink, scrapeID) => {
  try {
    let page;
    const browser = await puppeteer.launch();

    page = await browser.newPage();
    await page.goto(scrapeLink, { waitUntil: 'networkidle2' });

    await page.waitFor(5000);

    let pageData =
      (await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
        let data = [];

        const nodeList = document.querySelectorAll(
          '.catalog-product-list__fragment'
        );

        nodeList.forEach((node) => {
          const company = 'ikea';
          const category = document.querySelector(
            '.range-page-title__title'
          ).textContent;
          const title = node.querySelector('.product-compact__name')
            .textContent;
          let description = node.querySelector('.product-compact__type')
            .textContent;
          let additionalDescription = node.querySelector(
            '.product-compact__gpr-disclaimer'
          );
          if (additionalDescription) {
            description +=
              ' (' + additionalDescription.textContent + ')';
          }
          const price = node.querySelector(
            '.product-compact__price > span'
          ).textContent;
          const uri = node.querySelector('img').getAttribute('src');
          const reference = node
            .querySelector('a')
            .getAttribute('href');
          data.push({
            title,
            uri,
            company,
            category,
            description,
            price,
            reference,
          });
        });

        return data;
      })) || [];

    pageData = pageData.map((element) => {
      return {
        ...element,
        scrapeID: scrapeID,
        filename:
          scrapeID.toLowerCase().replace(' ', '-') + '-' + uuid.v4(),
        description: element.description.replace(/\s\s+/g, ''),
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
