const fetch = require('node-fetch');
const cheerio = require('cheerio');
const uuid = require('uuid');

const uploadProducts = require('../utils/uploadProducts');
const errorHandler = require('../utils/errorHandler');

const scrapeLink =
  'https://www.ikea.com/pl/pl/cat/fotele-i-szezlongi-fu006/?page=15';

const scraper = async () => {
  try {
    const response = await fetch(scrapeLink);

    if (response.status !== 200) {
      throw new Error('Something went wrong. Response status != 200');
    }
    const html = await response.text();

    const $ = cheerio.load(html);
    const pageData = [];

    const page = $('.range-page-title__title').length;
    //   .each((i, el) => {
    //     const imgTitle = $(el).find('a').attr('title');
    //     const imgSrc = $(el).find('img').attr('src');
    //     const link = $(el).find('a').attr('href');
    //     const title = $(el).children().next().children().text();
    //     const description = $(el)
    //       .children()
    //       .next()
    //       .text()
    //       .split(' ')
    //       .slice(2)
    //       .join(' ');

    //     pageData.push({
    //       scrapeLink,
    //       imgTitle,
    //       imgSrc,
    //       link,
    //       title,
    //       description,
    //     });
    //   });

    console.log($.html(), page);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    err.where = 'Mera Lamps';
    console.log(err);
  }
};

module.exports = scraper;
