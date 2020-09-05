const path = require('path');

const schedule = require('node-schedule');
const express = require('express');
const mongoose = require('mongoose');

// const removeSpecProducts = require('./utils/removeSpecProducts');
const { asyncForEach } = require('./utils/utils');
const meraScraper = require('./targets/mera');
const ikeaScraper = require('./targets/ikea');
const projektwScraper = require('./targets/projektW');
const fiziaScraper = require('./targets/fizia');
const elmaxScraper = require('./targets/elmax');
const homeConceptScraper = require('./targets/homeConcept');

const Product = require('./models/product');
const removeSpecProducts = require('./utils/removeSpecProducts');

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
          'https://www.ikea.com/pl/pl/cat/fotele-i-szezlongi-fu006/',
        scrapeID: 'Ikea Fotele i Szezlongi',
      },
      {
        link: 'https://www.ikea.com/pl/pl/cat/szafy-19053/',
        scrapeID: 'Ikea Szafy',
      },
      {
        link: 'https://www.ikea.com/pl/pl/cat/meble-rtv-10475/',
        scrapeID: 'Ikea Meble RTV',
      },
      {
        link: 'https://www.ikea.com/pl/pl/cat/lozka-bm003/',
        scrapeID: 'Ikea Lozka',
      },
      {
        link:
          'https://www.ikea.com/pl/pl/cat/biblioteczki-i-regaly-st002/',
        scrapeID: 'Ikea Biblioteczki i Regaly',
      },
      {
        link:
          'https://www.ikea.com/pl/pl/cat/komody-i-kontenerki-st004/',
        scrapeID: 'Ikea Komody i Kontenerki',
      },
      {
        link:
          'https://www.ikea.com/pl/pl/cat/kredensy-bufety-i-konsole-30454/',
        scrapeID: 'Ikea Kredensy Bufety i Konsole',
      },
      {
        link: 'https://www.ikea.com/pl/pl/cat/krzesla-fu002/',
        scrapeID: 'Ikea Krzesla',
      },
      {
        link:
          'https://www.ikea.com/pl/pl/cat/meble-dla-dzieci-18767/',
        scrapeID: 'Ikea Meble Dla Dzieci',
      },
      {
        link:
          'https://www.ikea.com/pl/pl/cat/meble-ogrodowe-i-na-balkon-od003/',
        scrapeID: 'Ikea Ogrodowe i Na Balkon',
      },
      {
        link:
          'https://www.ikea.com/pl/pl/cat/sofy-i-fotele-fu003/',
        scrapeID: 'Ikea Sofy i Fotele',
      },
      {
        link:
          'https://www.ikea.com/pl/pl/cat/stoly-i-biurka-fu004/',
        scrapeID: 'Ikea Stoly i Biurka',
      },
      {
        link:
          'https://www.ikea.com/pl/pl/cat/stoly-i-stolki-barowe-16244/',
        scrapeID: 'Ikea Szafki i Witryny',
      },
      {
        link:
          'https://www.ikea.com/pl/pl/cat/wozki-kuchenne-i-lazienkowe-fu005/',
        scrapeID: 'Ikea Wozki Kuchenne i Lazienkowe',
      },
      {
        link:
          'https://www.ikea.com/pl/pl/cat/akcesoria-lazienkowe-10555/',
        scrapeID: 'Ikea Akcesoria Lazienkowe',
      },
      {
        link:
          'https://www.ikea.com/pl/pl/cat/baterie-lazienkowe-20724/',
        scrapeID: 'Ikea Baterie Lazienkowe',
      },
      {
        link:
          'https://www.ikea.com/pl/pl/cat/lustra-do-lazienki-20490/',
        scrapeID: 'Ikea Lustra Do Lazienki',
      },
      {
        link:
          'https://www.ikea.com/pl/pl/cat/oswietlenie-lazienkowe-10736/',
        scrapeID: 'Ikea Oswietlenie Lazienkowe',
      },
      {
        link: 'https://www.ikea.com/pl/pl/cat/prysznice-40690/',
        scrapeID: 'Ikea Prysznice',
      },
      {
        link:
          'https://www.ikea.com/pl/pl/cat/toaletki-lazienkowe-20719/',
        scrapeID: 'Ikea Toaletki Lazienkowe',
      },
      {
        link: 'https://www.ikea.com/pl/pl/cat/umywalki-20723/',
        scrapeID: 'Ikea Umywalki',
      },
      {
        link:
          'https://www.ikea.com/pl/pl/cat/dywaniki-i-maty-lazienkowe-20519/',
        scrapeID: 'Ikea Dywaniki i Maty Lazienkowe',
      },
      {
        link: 'https://www.ikea.com/pl/pl/cat/dywany-10653/',
        scrapeID: 'Ikea Dywany',
      },
      {
        link: 'https://www.ikea.com/pl/pl/cat/dywany-10653/',
        scrapeID: 'Ikea Dywany',
      },
      {
        link:
          'https://www.ikea.com/pl/pl/cat/wycieraczki-pod-drzwi-10698/',
        scrapeID: 'Ikea Wycieraczki Pod Drzwi',
      },
      {
        link:
          'https://www.ikea.com/pl/pl/cat/inteligentny-dom-he002/',
        scrapeID: 'Ikea Inteligentny Dom',
      },
      {
        link:
          'https://www.ikea.com/pl/pl/cat/przewody-i-ladowarki-40845/',
        scrapeID: 'Ikea Przewody i Ladowarki',
      },
      {
        link: 'https://www.ikea.com/pl/pl/cat/piekarniki-20810/',
        scrapeID: 'Ikea Piekarniki',
      },
      {
        link:
          'https://www.ikea.com/pl/pl/cat/plyty-kuchenne-20812/',
        scrapeID: 'Ikea Plyty Kuchenne',
      },
      {
        link: 'https://www.ikea.com/pl/pl/cat/pralki-20826',
        scrapeID: 'Ikea Pralki',
      },
      {
        link:
          'https://www.ikea.com/pl/pl/cat/zmywarki-do-naczyn-20825/',
        scrapeID: 'Ikea Zmywarki Do Naczyn',
      },
      {
        link:
          'https://www.ikea.com/pl/pl/cat/okapy-kuchenne-i-wyciagi-20819/',
        scrapeID: 'Ikea Okapy Kuchenne i Wyciagi',
      },
      {
        link:
          'https://www.ikea.com/pl/pl/cat/kuchenki-mikrofalowe-i-kombi-20815/',
        scrapeID: 'Ikea Kuchenki Mikrofalowe i Kombi',
      },
      {
        link:
          'https://www.ikea.com/pl/pl/cat/zarowki-led-10744/',
        scrapeID: 'Ikea Zarowki LED',
      },
      {
        link: 'https://www.ikea.com/pl/pl/cat/lampy-li002/',
        scrapeID: 'Ikea Lampy',
      },
      {
        link:
          'https://www.ikea.com/pl/pl/cat/suszarki-na-pranie-20602/',
        scrapeID: 'Ikea Suszarki Na Pranie',
      },
      {
        link:
          'https://www.ikea.com/pl/pl/cat/deski-do-prasowania-20608/',
        scrapeID: 'Ikea Deski Do Prasowania',
      },
    ];
    const meraPages = [
      {
        link: 'https://mera.eu/lampy/lampy-wiszace/',
        scrapeID: 'Mera Lampy Wiszace',
        deepLevel: 3,
      },
      {
        link: 'https://mera.eu/lampy/lampy-stojace/',
        scrapeID: 'Mera Lampy Stojace',
        deepLevel: 3,
      },
      {
        link: 'https://mera.eu/dekoracje/lustra/',
        scrapeID: 'Mera Lustra',
        deepLevel: 3,
      },
      {
        link: 'https://mera.eu/dekoracje/beton-architektoniczny/',
        scrapeID: 'Mera Beton Architektoniczny',
        deepLevel: 3,
      },
      {
        link: 'https://mera.eu/dekoracje/stiuki/',
        scrapeID: 'Mera Tynki Dekoracyjne',
        deepLevel: 3,
      },
      {
        link: 'https://mera.eu/dekoracje/mozaiki/',
        scrapeID: 'Mera Mozaiki',
        deepLevel: 3,
      },
      {
        link: 'https://mera.eu/dekoracje/sztukateria/',
        scrapeID: 'Mera Sztukateria',
        deepLevel: 3,
      },
      {
        link: 'https://mera.eu/dekoracje/okadziny-naturalne/',
        scrapeID: 'Mera Okladziny Naturalne',
        deepLevel: 3,
      },
      {
        link: 'https://mera.eu/lazienki/toalety-myjace/',
        scrapeID: 'Mera Toalety Myjace',
        deepLevel: 3,
      },
      {
        link:
          'https://mera.eu/lazienki/armatura-lazienkowa/deszczownice/',
        scrapeID: 'Mera Deszczownice',
        deepLevel: 4,
      },
      {
        link:
          'https://mera.eu/lazienki/ceramika-lazienkowa/umywalki-nablatowe/',
        scrapeID: 'Mera Umywalki Nablatowe',
        deepLevel: 4,
      },
      {
        link:
          'https://mera.eu/lazienki/ceramika-lazienkowa/miski-wc-wiszace/',
        scrapeID: 'Mera Miski WC Wiszace',
        deepLevel: 4,
      },
      {
        link:
          'https://mera.eu/lazienki/ceramika-lazienkowa/bidety-wiszace/',
        scrapeID: 'Mera Bidety Wiszace',
        deepLevel: 4,
      },
      {
        link: 'https://mera.eu/meble/salon/fotele/fotele/',
        scrapeID: 'Mera Fotele',
        deepLevel: 4,
      },
      {
        link: 'https://mera.eu/meble/salon/fotele/krzesla/',
        scrapeID: 'Mera Krzesla',
        deepLevel: 5,
      },
      {
        link: 'https://mera.eu/meble/salon/fotele/pufy/',
        scrapeID: 'Mera Pufy',
        deepLevel: 5,
      },
      {
        link: 'https://mera.eu/meble/sypialnie/lozka/tapicerowane/',
        scrapeID: 'Mera Lozka Tapicerowane',
        deepLevel: 4,
      },
      {
        link: 'https://mera.eu/meble/sypialnie/lozka/kontynentalne/',
        scrapeID: 'Mera Lozka Kontynentalne',
        deepLevel: 4,
      },
      {
        link: 'https://mera.eu/meble/sypialnie/lozka/drewniane/',
        scrapeID: 'Mera Lozka Drewniane',
        deepLevel: 4,
      },
      {
        link: 'https://mera.eu/meble/sypialnie/materace/',
        scrapeID: 'Mera Materace',
        deepLevel: 4,
      },
      {
        link: 'https://mera.eu/meble/kuchnie/',
        scrapeID: 'Mera Kuchnia',
        deepLevel: 3,
      },
      {
        link: 'https://mera.eu/meble/salon/komody/',
        scrapeID: 'Mera Komody',
        deepLevel: 4,
      },
      {
        link: 'https://mera.eu/meble/salon/narozniki/',
        scrapeID: 'Mera Narozniki',
        deepLevel: 4,
      },
      {
        link: 'https://mera.eu/meble/salon/sofy/',
        scrapeID: 'Mera Sofy',
        deepLevel: 4,
      },
      {
        link: 'https://mera.eu/dekoracje/lustra/',
        scrapeID: 'Mera Lustra',
        deepLevel: 3,
      },
      {
        link: 'https://mera.eu/lampy/lampy-stolowe/',
        scrapeID: 'Mera Lampy Stolowe',
        deepLevel: 3,
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
    const homeConceptPages = [
      {
        link: 'https://homeconcept.com.pl/katowice/uslugi/doradztwo/',
        scrapeID: 'Home Concept Doradztwo',
        category: 'Usługa (Porada specjalisty)',
      },
      {
        link: 'https://homeconcept.com.pl/katowice/uslugi/pomiar/',
        scrapeID: 'Home Concept Pomiar',
        category: 'Usługa (Pomiar elementów)',
      },
      {
        link:
          'https://homeconcept.com.pl/katowice/uslugi/projektowanie/',
        scrapeID: 'Home Concept Projektowanie',
        category: 'Usługa (Projekty wnętrz)',
      },
      {
        link: 'https://homeconcept.com.pl/katowice/uslugi/transport/',
        scrapeID: 'Home Concept Transport',
        category: 'Usługa (Transport produktów)',
      },
      {
        link: 'https://homeconcept.com.pl/katowice/uslugi/montaz/',
        scrapeID: 'Home Concept Montaz',
        category: 'Usługa (Montaż)',
      },
    ];
    const projektW = {
      link: 'http://projektw.pl/',
      scrapeID: 'Projekt W',
      category: 'Usługa (Projekty wnętrz)',
    };
    const elmax = {
      link: 'https://www.elmax.tychy.pl/oferta.html',
      scrapeID: 'Elmax',
      category: 'Usługa (Instalacje elektryczne)',
    };

    // SCHEDULE OPTIONS
    const rule = '0 0 2 * * 1,3,5,7';
    const productsDropRule = '0 0 4 2 * *';
    const productsRefreshRule = '0 30 4 2 * *';

    // SCRAPERS
    // UPDATE
    schedule.scheduleJob(rule, async () => {
      console.log('Data scraping time: ' + new Date());
      //   await asyncForEach(homeConceptPages, async (page, index) => {
      //     await homeConceptScraper(
      //       page.link,
      //       page.scrapeID,
      //       page.category
      //     );
      //     console.log('Page ' + index + '(' + page.scrapeID + ')');
      //   });
      //   await asyncForEach(fiziaPages, async (page, index) => {
      //     await fiziaScraper(
      //       page.link,
      //       page.scrapeID,
      //       page.imgNumber,
      //       page.category
      //     );
      //     console.log('Page ' + index + '(' + page.scrapeID + ')');
      //   });
      //   await asyncForEach(ikeaPages, async (page, index) => {
      //     await ikeaScraper(page.link, page.scrapeID);
      //     console.log('Page ' + index + '(' + page.scrapeID + ')');
      //   });
      //   await asyncForEach(meraPages, async (page, index) => {
      //     await meraScraper(page.link, page.scrapeID, page.deepLevel);
      //     console.log('Page ' + index + '(' + page.scrapeID + ')');
      //   });
      //   await projektwScraper(
      //     projektW.link,
      //     projektW.scrapeID,
      //     projektW.category
      //   );
      //   await asyncForEach(homeConceptPages, async (page, index) => {
      //     await homeConceptScraper(
      //       page.link,
      //       page.scrapeID,
      //       page.category
      //     );
      //     console.log('Page ' + index + '(' + page.scrapeID + ')');
      //   });
    });
    // //PRODUCTS REFRESH
    schedule.scheduleJob(productsRefreshRule, async () => {
      console.log('(Refreshing) Data scraping time: ' + new Date());
      // await Product.collection.drop();
      //   await asyncForEach(ikeaPages, async (page, index) => {
      //     await ikeaScraper(page.link, page.scrapeID);
      //     console.log('Page ' + index + '(' + page.scrapeID + ')');
      //   });
      //   await asyncForEach(meraPages, async (page, index) => {
      //     await meraScraper(page.link, page.scrapeID, page.deepLevel);
      //     console.log('Page ' + index + '(' + page.scrapeID + ')');
      //   });
    });

    //TESTING PART
    // (async () => {
    //   console.log('(Testing) Data scraping time: ' + new Date());
    //   await asyncForEach(ikeaPages, async (page, index) => {
    //     await ikeaScraper(page.link, page.scrapeID);
    //     console.log('Page ' + index + '(' + page.scrapeID + ')');
    //   });
    // })();

    app.listen(process.env.PORT || 8101);
  })
  .catch((err) => {
    console.log(err);
  });
