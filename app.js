const path = require('path');

const schedule = require('node-schedule');
const express = require('express');
const mongoose = require('mongoose');

const { asyncForEach } = require('./utils/utils');
const removeSpecProducts = require('./utils/removeSpecProducts');
const removeOODProducts = require('./utils/removeOODProducts');

// SCRAPERS
const meraScraper = require('./targets/mera');
const ikeaScraper = require('./targets/ikea');
const projektwScraper = require('./targets/projektW');
const fiziaScraper = require('./targets/fizia');
const elmaxScraper = require('./targets/elmax');
const homeConceptScraper = require('./targets/homeConcept');
const buttonScraper = require('./targets/button');

// PAGES
const { ikeaPages, meraPages } = require('./pages/products');
const { elmax, fiziaPages, homeConceptPages, projektW, button } = require('./pages/services');

const app = express();

// Static images download
app.use('/images', express.static(path.join(__dirname, 'images')));

mongoose
   .connect(
      'mongodb+srv://cyber-admin:1423cezqS7@cluster0-liqat.mongodb.net/database?retryWrites=true&w=majority',
      {
         useNewUrlParser: true,
         useUnifiedTopology: true,
      }
   )
   .then((result) => {
      console.log('Connected to database.');

      // SCHEDULE OPTIONS
      const updateRule = '0 0 2 * * 1,4,6';
      const removeOODProductsRule = '0 30 4 1 * *';

      // *SCRAPERS*
      // UPDATE
      schedule.scheduleJob(updateRule, async () => {
         console.log('Data scraping time: ' + new Date());

         // await asyncForEach(meraPages, async (pageData, index) => {
         //    await meraScraper(pageData);
         //    console.log('Page ' + index + '(' + pageData.scrapeID + ')');
         // });

         // await asyncForEach(ikeaPages, async (pageData, index) => {
         //    await ikeaScraper(pageData);
         //    console.log('Page ' + index + '(' + pageData.scrapeID + ')');
         // });

         // await asyncForEach(homeConceptPages, async (pageData, index) => {
         //    await homeConceptScraper(pageData);
         //    console.log('Page ' + index + '(' + pageData.scrapeID + ')');
         // });

         // await asyncForEach(fiziaPages, async (pageData, index) => {
         //    await fiziaScraper(pageData);
         //    console.log('Page ' + index + '(' + pageData.scrapeID + ')');
         // });

         // await projektwScraper(projektW);

         // await buttonScraper(button);
      });

      // REMOVE OUT OF DATED PRODUCTS
      schedule.scheduleJob(removeOODProductsRule, async () => {
         console.log('(Refreshing) Data scraping time: ' + new Date());

         // removeOODProducts();
      });

      // TESTING
      (async () => {
         console.log('(Testing) Data scraping time: ' + new Date());
         // await ikeaScraper('https://www.ikea.com/pl/pl/cat/stoly-i-stolki-barowe-16244/', 'Ikea Szafki i Witryny');

         // await removeSpecProducts({uri: /svg/, company: 'mera'});
         
         // removeOODProducts();
      })();

      app.listen(process.env.PORT || 8101);
   })
   .catch((err) => {
      console.log(err);
   });
