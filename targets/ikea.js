const puppeteer = require('puppeteer');
const uuid = require('uuid');

const uploadProducts = require('../utils/uploadProducts');
const errorHandler = require('../utils/errorHandler');
const pullColor = require('../utils/utils').pullColor;

const scraper = async (pgData) => {
   const { link, scrapeID } = pgData;
   try {
      let page;
      const browser = await puppeteer.launch();

      page = await browser.newPage();
      await page.goto(link, { waitUntil: 'networkidle2' });

      await page.waitFor(5000);

      try {
         for (let i = 0; i < 70; i++) {
            await page.evaluate(() => {
               document
                  .querySelector(
                     'body > div.plp-page-container > div > div > div.plp-main-container > div > div > div.catalog-bottom-container > a'
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
               let description = node.querySelector(
                  '.range-revamp-header-section__description-text'
               ).textContent;
               let measurements = node.querySelector(
                  '.range-revamp-header-section__description-measurement'
               )
                  ? ' ' +
                    node.querySelector('.range-revamp-header-section__description-measurement')
                       .textContent
                  : '';
               description += measurements;
               let variants = node.querySelector('.plp-product-thumbnails')
                  ? node.querySelector('.plp-product-thumbnails').querySelectorAll('a')
                  : [];
               const colors = [];
               variants.forEach((el) => colors.push(el.href));
               let price = node.querySelector('.range-revamp-compact-price-package__price-wrapper')
                  .textContent;
               const uri = node.querySelector('img') ? node.querySelector('img').src : '';
               const reference = node.querySelector('a').href;

               if (uri.length > 0 && !data.some((item) => item.reference === reference)) {
                  data.push({
                     title,
                     uri,
                     company,
                     category,
                     description,
                     price,
                     reference,
                     colors,
                  });
               }
            });

            return data;
         })) || [];

      pageData = pageData.map((element) => {
         const { title, uri, company, category, description, price, reference, colors } = element;
         let newDescription = description.replace(/\s\s+/g, ' ');

         if (colors.length > 0) {
            let colorsDescription = '';
            const colorsArray = [];

            colors.forEach((text) => {
               if (pullColor(text) && !colorsArray.includes(pullColor(text))) {
                  colorsArray.push(pullColor(text));
               }
            });

            colorsArray.forEach((color, index) => {
               if (index < colorsArray.length - 1) {
                  colorsDescription += color + ', ';
               } else {
                  colorsDescription += color;
               }
            });

            if (colorsArray.length) {
               colorsDescription = ` (${colorsDescription})`;
               newDescription += colorsDescription;
            }
         }

         delete element.color;

         return {
            title,
            uri,
            company,
            category,
            description: newDescription,
            price,
            reference,
            scrapeID,
            filename: scrapeID.toLocaleLowerCase().replace(/\s+/g, '-') + '-' + uuid.v4(),
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
