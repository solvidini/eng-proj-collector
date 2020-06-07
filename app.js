const path = require('path');

const schedule = require('node-schedule');
const express = require('express');
const mongoose = require('mongoose');

const removeProducts = require('./utils/removeProducts');
const { asyncForEach } = require('./utils/utils');
const meraScraper = require('./targets/mera');
const ikeaScraper = require('./targets/ikea');
const projektwScraper = require('./targets/projektw');
const fiziaScraper = require('./targets/fizia');

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
    // PRODUCTS
    const ikeaPages = [
      {
        link:
          'https://www.ikea.com/pl/pl/cat/fotele-i-szezlongi-fu006/?page=15',
        scrapeID: 'Ikea Fotele',
      },
      {
        link: 'https://www.ikea.com/pl/pl/cat/szafy-19053/?page=15',
        scrapeID: 'Ikea Szafy',
      },
      {
        link: 'https://www.ikea.com/pl/pl/cat/meble-rtv-10475/?page=15',
        scrapeID: 'Ikea Meble RTV',
      },
      {
        link: 'https://www.ikea.com/pl/pl/cat/lozka-bm003/?page=15',
        scrapeID: 'Ikea Lozka',
      },
      {
        link:
          'https://www.ikea.com/pl/pl/cat/biblioteczki-i-regaly-st002/?page=15',
        scrapeID: 'Ikea Biblioteczki',
      },
    ];
    const meraPages = [
      {
        link: 'https://mera.eu/lampy/lampy-wiszace/',
        scrapeID: 'Mera Lampy Wiszace',
      },
      {
        link: 'https://mera.eu/lampy/lampy-stojace/',
        scrapeID: 'Mera Lampy Stojace',
      },
    ];
    // SERVICES
    const fiziaPages = [
      {
        link: 'http://www.fizia.pl/oferta/1/drzwi-wewnetrzne',
        scrapeID: 'Fizia Drzwi Wewnetrzne',
        imgNumber: 5,
        category: 'Usługa + Produkt (Wykonanie drzwi)',
      },
      {
        link: 'http://www.fizia.pl/oferta/5/meble',
        scrapeID: 'Fizia Meble',
        imgNumber: 6,
        category: 'Usługa + Produkt (Wykonanie mebli)',
      },
      {
        link: 'http://www.fizia.pl/oferta/3/schody',
        scrapeID: 'Fizia Schody',
        imgNumber: 4,
        category: 'Usługa + Produkt (Wykonanie schodów)',
      },
      {
        link:
          'http://www.fizia.pl/oferta/4/drzwi-p-poz-i-specjalnego-przeznaczenia',
        scrapeID: 'Fizia Drzwi Specjalne',
        imgNumber: 3,
        category: 'Usługa + Produkt (Wykonanie drzwi)',
      },
      {
        link: 'http://www.fizia.pl/oferta/2/drzwi-zewnetrzne',
        scrapeID: 'Fizia Drzwi Zewnetrzne',
        imgNumber: 2,
        category: 'Usługa + Produkt (Wykonanie drzwi)',
      },
    ];
    const projektW = {
      link: 'http://projektw.pl/',
      scrapeID: 'Projekt W',
      category: 'Usługa (Projekt wnętrza)',
    };

    // SCHEDULE OPTIONS
    const rule = '0 0 0 * * *';

    // SCRAPERS
    // schedule.scheduleJob(rule, async () => {
    //   console.log('Data scraping time: ' + new Date());
    (async () => {
      // await projektwScraper(
      //   projektW.link,
      //   projektW.scrapeID,
      //   projektW.category
      // );

      // await asyncForEach(fiziaPages, async (page, index) => {
      //   await fiziaScraper(
      //     page.link,
      //     page.scrapeID,
      //     page.imgNumber,
      //     page.category
      //   );
      //   console.log('Page ' + index + '(' + page.scrapeID + ')');
      // });

      await asyncForEach(ikeaPages, async (page, index) => {
        await ikeaScraper(page.link, page.scrapeID);
        console.log('Page ' + index + '(' + page.scrapeID + ')');
      });

      // await asyncForEach(meraPages, async (page, index) => {
      //   await meraScraper(page.link, page.scrapeID);
      //   console.log('Page ' + index + '(' + page.scrapeID + ')');
      // });
    })();
    // });

    // removeProducts('mera'); // DON'T TOUCH

    app.listen(process.env.PORT || 8101);
  })
  .catch((err) => {
    console.log(err);
  });
