const path = require('path');

const schedule = require('node-schedule');
const express = require('express');
const mongoose = require('mongoose');

const removeProducts = require('./utils/removeProducts');
const utils = require('./utils/utils');
const meraScraper = require('./targets/mera');
const ikeaScraper = require('./targets/ikea');

const app = express();

//static images download
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

    // PAGES
    const ikeaPages = [
      {
        link:
          'https://www.ikea.com/pl/pl/cat/fotele-i-szezlongi-fu006/?page=15',
        category: 'Ikea Chairs',
      },
      {
        link: 'https://www.ikea.com/pl/pl/cat/szafy-19053/?page=15',
        category: 'Ikea Wardrobes',
      },
      {
        link: 'https://www.ikea.com/pl/pl/cat/meble-rtv-10475/?page=15',
        category: 'Ikea RTV Furniture',
      },
      {
        link: 'https://www.ikea.com/pl/pl/cat/lozka-bm003/?page=15',
        category: 'Ikea Beds',
      },
      {
        link:
          'https://www.ikea.com/pl/pl/cat/biblioteczki-i-regaly-st002/?page=15',
        category: 'Ikea Bookcases and shelves',
      },
    ];
    const meraPages = [
      {
        link: 'https://mera.eu/lampy/lampy-wiszace/',
        category: 'Mera Lampy Wiszace',
      },
      {
        link: 'https://mera.eu/lampy/lampy-stojace/',
        category: 'Mera Lampy Stojace',
      },
    ];

    // SCHEDULE OPTIONS
    const rule = '0 0 0 * * *';

    // SCRAPERS
    schedule.scheduleJob(rule, () => {
      console.log('Data scraping time: ' + new Date());
      ikeaPages.forEach((page) => {
        ikeaScraper(page.link, page.category);
      });

      meraPages.forEach((page) => {
        meraScraper(page.link, page.category);
      });
    });

    // removeProducts('mera');

    app.listen(process.env.PORT || 8101);
  })
  .catch((err) => {
    console.log(err);
  });
