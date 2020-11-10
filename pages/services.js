// FIZIA
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
      link: 'http://www.fizia.pl/oferta/4/drzwi-p-poz-i-specjalnego-przeznaczenia',
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

// HOME CONCEPT
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
      link: 'https://homeconcept.com.pl/katowice/uslugi/projektowanie/',
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

// PROJEKT W
const projektW = {
   link: 'http://projektw.pl/',
   scrapeID: 'Projekt W',
   category: 'Usługa (Projekty wnętrz)',
};

// ELMAX
const elmax = {
   link: 'https://www.elmax.tychy.pl/oferta.html',
   scrapeID: 'Elmax',
   category: 'Usługa (Instalacje elektryczne)',
};

// Button
const button = {
   link: 'http://www.pracownia-button.pl/offer',
   scrapeID: 'Button',
   category: 'Usługa + Produkt (Wykonanie / Rekonstrukcja mebli tapicerowanych)',
};

exports.fiziaPages = fiziaPages;
exports.homeConceptPages = homeConceptPages;
exports.projektW = projektW;
exports.elmax = elmax;
exports.button = button;