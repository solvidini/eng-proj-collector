const fetch = require('node-fetch');
const cheerio = require('cheerio');

const scrapeLink = 'https://en.wikipedia.org/wiki/Main_Page';

fetch(scrapeLink)
  .then((response) => {
    if (response.status !== 200) {
      console.log(response.status);
    }
    return response.text();
  })
  .then((html) => {
    const $ = cheerio.load(html);
    const webData = [];

    $('#sister-projects-list')
      .children()
      .each((i, el) => {
        const imgTitle = $(el).find('a').attr('title');
        const link = $(el).find('a').attr('href');
        const title = $(el).children().next().children().text();
        const description = $(el)
          .children()
          .next()
          .text()
          .split(' ')
          .slice(2)
          .join(' ');

        webData.push({
          scrapeLink,
          imgTitle,
          link,
          title,
          description,
        });
      });

    console.log(webData);

    //.text().replace(/\s\s+/g, '');
    //.text().replace(/,/, '');
    // console.log(article);
  })
  .catch((err) => console.log(err));
