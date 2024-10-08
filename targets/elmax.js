const fetch = require('node-fetch');
const cheerio = require('cheerio');

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

      const title = 'Wykonanie instalacji elektrycznych';
      const description = $(
         'body > table > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(1) > td:nth-child(2) > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(3) > td:nth-child(2) > table > tbody > tr > td > table > tbody > tr'
      ).text();
      const company = 'Elmax';
      const reference = link;

      pageData = {
         scrapeID,
         title,
         description,
         company,
         reference,
         category,
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
