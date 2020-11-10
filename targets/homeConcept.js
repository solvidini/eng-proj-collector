const fetch = require('node-fetch');
const cheerio = require('cheerio');
const uuid = require('uuid');

const uploadService = require('../utils/uploadService');
const errorHandler = require('../utils/errorHandler');

const scraper = async (pgData) => {
   const { link, scrapeID, category } = pgData;
   try {
      response = await fetch(link);
      if (response.status !== 200) {
         console.log(response.status);
      }
      const html = await response.text();

      const $ = cheerio.load(html);
      let pageData;

      const title = $('body > div.wrapper > main > div > div.col-md-8.col-12.mb-2.editor-text > h1')
         .text()
         .replace(/\n/g, '');
      let description = $(
         'body > div.wrapper > main > div > div.col-md-8.col-12.mb-2.editor-text > p:nth-child(3)'
      ).text();

      const company = 'Home Concept';
      const reference = link;
      let uri = $(
         'body > div.wrapper > main > div > div.col-md-4.col-12.row-custom.mb-2.editor-text > div > img'
      ).attr('data-src');

      pageData = {
         scrapeID,
         title,
         description,
         uri,
         company,
         reference,
         category,
      };

      pageData = {
         ...pageData,
         filename: scrapeID.toLocaleLowerCase().replace(/\s+/g, '-') + '-' + uuid.v4(),
      };

      await uploadService(pageData, scrapeID);
      console.log(`Successfully scrapped ${scrapeID} service.`);
   } catch (err) {
      if (!err.statusCode) {
         err.statusCode = 500;
      }
      err.scrapeID = scrapeID;
      err.type = 'services';
      errorHandler(err);
   }
};

module.exports = scraper;
