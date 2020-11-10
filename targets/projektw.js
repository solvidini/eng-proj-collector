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

      const title = 'Projektowanie wnętrz';
      const description = $('meta[name="description"]').attr('content');
      const company = 'Projekt W';
      const reference = link;
      const uri = reference + $('link[rel="icon"]').attr('href');

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
