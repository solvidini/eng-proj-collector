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

      try {
         for (let i = 0; i < 70; i++) {
            await page.evaluate(() => {
               document
                  .querySelector(
                     'body > div.plp-page-container > div > div > div.plp-main-container.plp-main-container > div > div > div.catalog-bottom-container > div.pagination.pagination--center > a'
                  )
                  .click();
            });
            await page.waitFor(500);
         }
      } catch (err) {
         console.log('Products end.');
      }

      let pageData =
         (await page.evaluate(() => {
            window.scrollTo(0, document.body.scrollHeight);
            let data = [];

            const nodeList = document.querySelectorAll('div.plp-product-list__fragment');

            nodeList.forEach((node) => {
               const company = 'ikea';
               const category = document.querySelector(
                  'body > div.plp-page-container > div > div > div.plp-page-title > h1'
               ).textContent;
               const title = node.querySelector('.range-revamp-header-section__title--small')
                  .textContent;
               let description = node.querySelector('.range-revamp-header-section__description')
                  .textContent;
               let additionalDescription = node.querySelectorAll('.plp-color-dots__dot');
               if (additionalDescription.length > 0) {
                  description += ' (';
                  additionalDescription.forEach((color) => {
                     description += color.ariaLabel + ', ';
                  });
                  description = description.slice(0, -2);
                  description += ')';
               }
               let price = node.querySelector('.range-revamp-price').textContent;
               const uri = node.querySelector('img') ? node.querySelector('img').src : '';
               const reference = node.querySelector('a').href;

               if (uri.length > 0) {
                  data.push({
                     title,
                     uri,
                     company,
                     category,
                     description,
                     price,
                     reference,
                  });
               }
            });

            return data;
         })) || [];

      pageData = pageData.map((element) => {
         return {
            ...element,
            scrapeID: scrapeID,
            filename: scrapeID.toLocaleLowerCase().replace(/\s+/g, '-') + '-' + uuid.v4(),
            description: element.description.replace(/\s\s+/g, ' '),
         };
      });

      await uploadProducts(pageData, scrapeID);
      console.log(`Successfully scrapped ${scrapeID} products.`);
      await browser.close();
   } catch (err) {
      if (!err.statusCode) {
         err.statusCode = 500;
      }
      err.scrapeID = scrapeID;
      err.type = 'products';
      errorHandler(err);
   }
};

module.exports = scraper;
