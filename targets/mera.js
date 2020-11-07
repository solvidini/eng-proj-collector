const puppeteer = require('puppeteer');
const uuid = require('uuid');

const uploadProducts = require('../utils/uploadProducts');
const errorHandler = require('../utils/errorHandler');

const scraper = async (scrapeLink, scrapeID, scrollDownQuantity = 6) => {
   try {
      let page;
      const browser = await puppeteer.launch(); // {headless: false}

      page = await browser.newPage();
      await page.goto(scrapeLink, { waitUntil: 'networkidle2' });

      await page.waitFor(3000);

      for (let j = 0; j < scrollDownQuantity; j++) {
         await page.evaluate(() => {
            window.scrollTo(
               0,
               document.querySelector('body > div.p-product-category.p-product-category--bright')
                  ? document.querySelector(
                       'body > div.p-product-category.p-product-category--bright'
                    ).clientHeight -
                       document.querySelector('body > footer').offsetHeight / 2
                  : 0
            );
         });
         await page.waitFor(2000);
      }

      let pageData =
         (await page.evaluate(() => {
            window.scrollTo(0, document.body.scrollHeight);
            let data = [];

            const nodeList = document.querySelectorAll(
               'div.col.col-12.col-sm-6.col-md-6.col-lg-3.col-xl-3'
            );
            nodeList.forEach((node) => {
               const company = 'mera';
               const category = node.querySelector('.c-tile__text--label-details')
                  ? node.querySelector('.c-tile__text--label-details').textContent
                  : '';
               const title = node.querySelector('.c-tile__text--sku')
                  ? node.querySelector('.c-tile__text--sku').textContent
                  : '';
               let description = node.querySelector('.c-tile__text--dimensions')
                  ? node.querySelector('.c-tile__text--dimensions').textContent
                  : '';
               description = description.replace(/ \|/, 'wymiary: ');
               let price = node.querySelector('.c-tile__text--price-bright')
                  ? node.querySelector('.c-tile__text--price-bright').textContent.slice(0, -2)
                  : '';
               const uri = node.querySelector('img') ? node.querySelector('.c-tile__image').src : '';
               const reference = node.querySelector('a') ? node.querySelector('a').href : '';

               if (uri.length > 0 && reference.length > 0 && title.length > 0) {
                  data.push({ title, uri, company, category, description, price, reference });
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
