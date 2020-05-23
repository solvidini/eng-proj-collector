const fetch = require('node-fetch');
const cheerio = require('cheerio');
const request = require('request');

fetch('https://qwe.wiki/')
  .then((response) => {
    return response.text();
  })
  .then((html) => {
    const $ = cheerio.load(html);

    const articleBody = $('#content');

    // console.log(articleBody.text());
    // console.log(articleBody.html());
    // const output = articleBody.find('h1').html();
    // const output = articleBody.find('h1').text();
    // children parent

    // const output = articleBody.find('h1').text();
    articleBody.find('.col-md-3').each((i, el) => {
      const item = $(el).text();
      const link = $(el).children().attr('href');

      console.log(item, link);
    });

    // console.log(output);
  })
  .catch((err) => console.log(err));

// request(
//   'https://github.com/cheeriojs/cheerio',
//   (error, response, html) => {
//     if (!error && response.statusCode == 200) {
//       const $ = cheerio.load(html);

//       const articleBody = $('.markdown-body.entry-content');

//       // console.log(articleBody.text());
//       console.log(articleBody.html());
//     }
//   }
// );
