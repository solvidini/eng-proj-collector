// IKEA
const ikeaPages = [
   {
      link: 'https://www.ikea.com/pl/pl/cat/fotele-i-szezlongi-fu006/',
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
      link: 'https://www.ikea.com/pl/pl/cat/biblioteczki-i-regaly-st002/',
      scrapeID: 'Ikea Biblioteczki i Regaly',
   },
   {
      link: 'https://www.ikea.com/pl/pl/cat/komody-i-kontenerki-st004/',
      scrapeID: 'Ikea Komody i Kontenerki',
   },
   {
      link: 'https://www.ikea.com/pl/pl/cat/kredensy-bufety-i-konsole-30454/',
      scrapeID: 'Ikea Kredensy Bufety i Konsole',
   },
   {
      link: 'https://www.ikea.com/pl/pl/cat/krzesla-fu002/',
      scrapeID: 'Ikea Krzesla',
   },
   {
      link: 'https://www.ikea.com/pl/pl/cat/meble-dla-dzieci-18767/',
      scrapeID: 'Ikea Meble Dla Dzieci',
   },
   {
      link: 'https://www.ikea.com/pl/pl/cat/meble-ogrodowe-i-na-balkon-od003/',
      scrapeID: 'Ikea Ogrodowe i Na Balkon',
   },
   {
      link: 'https://www.ikea.com/pl/pl/cat/sofy-i-fotele-fu003/',
      scrapeID: 'Ikea Sofy i Fotele',
   },
   {
      link: 'https://www.ikea.com/pl/pl/cat/stoly-i-biurka-fu004/',
      scrapeID: 'Ikea Stoly i Biurka',
   },
   {
      link: 'https://www.ikea.com/pl/pl/cat/stoly-i-stolki-barowe-16244/',
      scrapeID: 'Ikea Szafki i Witryny',
   },
   {
      link: 'https://www.ikea.com/pl/pl/cat/wozki-kuchenne-i-lazienkowe-fu005/',
      scrapeID: 'Ikea Wozki Kuchenne i Lazienkowe',
   },
   {
      link: 'https://www.ikea.com/pl/pl/cat/akcesoria-lazienkowe-10555/',
      scrapeID: 'Ikea Akcesoria Lazienkowe',
   },
   {
      link: 'https://www.ikea.com/pl/pl/cat/baterie-lazienkowe-20724/',
      scrapeID: 'Ikea Baterie Lazienkowe',
   },
   {
      link: 'https://www.ikea.com/pl/pl/cat/lustra-do-lazienki-20490/',
      scrapeID: 'Ikea Lustra Do Lazienki',
   },
   {
      link: 'https://www.ikea.com/pl/pl/cat/oswietlenie-lazienkowe-10736/',
      scrapeID: 'Ikea Oswietlenie Lazienkowe',
   },
   {
      link: 'https://www.ikea.com/pl/pl/cat/prysznice-40690/',
      scrapeID: 'Ikea Prysznice',
   },
   {
      link: 'https://www.ikea.com/pl/pl/cat/toaletki-lazienkowe-20719/',
      scrapeID: 'Ikea Toaletki Lazienkowe',
   },
   {
      link: 'https://www.ikea.com/pl/pl/cat/umywalki-20723/',
      scrapeID: 'Ikea Umywalki',
   },
   {
      link: 'https://www.ikea.com/pl/pl/cat/dywaniki-i-maty-lazienkowe-20519/',
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
      link: 'https://www.ikea.com/pl/pl/cat/wycieraczki-pod-drzwi-10698/',
      scrapeID: 'Ikea Wycieraczki Pod Drzwi',
   },
   {
      link: 'https://www.ikea.com/pl/pl/cat/inteligentny-dom-he002/',
      scrapeID: 'Ikea Inteligentny Dom',
   },
   {
      link: 'https://www.ikea.com/pl/pl/cat/przewody-i-ladowarki-40845/',
      scrapeID: 'Ikea Przewody i Ladowarki',
   },
   {
      link: 'https://www.ikea.com/pl/pl/cat/piekarniki-20810/',
      scrapeID: 'Ikea Piekarniki',
   },
   {
      link: 'https://www.ikea.com/pl/pl/cat/plyty-kuchenne-20812/',
      scrapeID: 'Ikea Plyty Kuchenne',
   },
   {
      link: 'https://www.ikea.com/pl/pl/cat/pralki-20826',
      scrapeID: 'Ikea Pralki',
   },
   {
      link: 'https://www.ikea.com/pl/pl/cat/zmywarki-do-naczyn-20825/',
      scrapeID: 'Ikea Zmywarki Do Naczyn',
   },
   {
      link: 'https://www.ikea.com/pl/pl/cat/okapy-kuchenne-i-wyciagi-20819/',
      scrapeID: 'Ikea Okapy Kuchenne i Wyciagi',
   },
   {
      link: 'https://www.ikea.com/pl/pl/cat/kuchenki-mikrofalowe-i-kombi-20815/',
      scrapeID: 'Ikea Kuchenki Mikrofalowe i Kombi',
   },
   {
      link: 'https://www.ikea.com/pl/pl/cat/zarowki-led-10744/',
      scrapeID: 'Ikea Zarowki LED',
   },
   {
      link: 'https://www.ikea.com/pl/pl/cat/lampy-li002/',
      scrapeID: 'Ikea Lampy',
   },
   {
      link: 'https://www.ikea.com/pl/pl/cat/suszarki-na-pranie-20602/',
      scrapeID: 'Ikea Suszarki Na Pranie',
   },
   {
      link: 'https://www.ikea.com/pl/pl/cat/deski-do-prasowania-20608/',
      scrapeID: 'Ikea Deski Do Prasowania',
   },
];

// MERA
const meraPages = [
   {
      link: 'https://mera.eu/kategorie-produktow/plytki-lazienkowe/',
      scrapeID: 'Mera Plytki Lazienkowe',
   },
   {
      link: 'https://mera.eu/kategorie-produktow/plytki-tarasowe/',
      scrapeID: 'Mera Plytki Tarasowe',
   },
   {
      link: 'https://mera.eu/kategorie-produktow/plytki-podlogowe/',
      scrapeID: 'Mera Plytki Podlogowe',
   },
   {
      link: 'https://mera.eu/kategorie-produktow/plytki-scienne/',
      scrapeID: 'Mera Plytki Scienne',
   },
   {
      link: 'https://mera.eu/kategorie-produktow/plytki-wielkoformatowe/',
      scrapeID: 'Mera Plytki Wielkoformatowe',
   },
   {
      link: 'https://mera.eu/kategorie-produktow/plytki-drewnopodobne/',
      scrapeID: 'Mera Plytki Drewnopodobne',
   },
   {
      link: 'https://mera.eu/kategorie-produktow/plytki-imitujace-kamien/',
      scrapeID: 'Mera Plytki Imitujace Kamien',
   },
   {
      link: 'https://mera.eu/kategorie-produktow/plytki-imitujace-beton/',
      scrapeID: 'Mera Plytki Imitujace Beton',
   },
   {
      link: 'https://mera.eu/kategorie-produktow/plytki-heksagonalne/',
      scrapeID: 'Mera Plytki Heksagonalne',
   },
   {
      link: 'https://mera.eu/kategorie-produktow/plytki-orientalne/',
      scrapeID: 'Mera Plytki Orientalne',
   },
   {
      link: 'https://mera.eu/kategorie-produktow/mozaiki-dekoracje-2/',
      scrapeID: 'Mera Mozaiki',
   },
   {
      link: 'https://mera.eu/kategorie-produktow/wiszace-dekoracyjne/',
      scrapeID: 'Mera Lampy Wiszace',
   },
   {
      link: 'https://mera.eu/kategorie-produktow/wyposazenie-lazienek/',
      scrapeID: 'Mera Wyposazenie Lazienek',
   },
   {
      link: 'https://mera.eu/kategorie-produktow/kabiny-prysznicowe/',
      scrapeID: 'Mera Kabiny Prysznicowe',
   },
   {
      link: 'https://mera.eu/kategorie-produktow/meble-lazienkowe/',
      scrapeID: 'Mera Meble Lazienkowe',
   },
   {
      link: 'https://mera.eu/kategorie-produktow/narozniki/',
      scrapeID: 'Mera Narozniki',
   },
   {
      link: 'https://mera.eu/kategorie-produktow/grzejniki/',
      scrapeID: 'Mera Grzejniki',
   },
   {
      link: 'https://mera.eu/kategorie-produktow/armatura/',
      scrapeID: 'Mera Armatura',
      scrollDownQuantity: 20
   },
   {
      link: 'https://mera.eu/kategorie-produktow/lozka/',
      scrapeID: 'Mera Lozka',
   },
   {
      link: 'https://mera.eu/kategorie-produktow/komody-toaletki/',
      scrapeID: 'Mera Komody Toaletki',
   },
   {
      link: 'https://mera.eu/kategorie-produktow/materace/',
      scrapeID: 'Mera Materace',
   },
   {
      link: 'https://mera.eu/kategorie-produktow/fotele/',
      scrapeID: 'Mera Fotele',
   },
   {
      link: 'https://mera.eu/kategorie-produktow/lawy-stoliki/',
      scrapeID: 'Mera Lawy Stoliki',
   },
   {
      link: 'https://mera.eu/kategorie-produktow/lampy/',
      scrapeID: 'Mera Lampy',
      scrollDownQuantity: 12,
   },
   {
      link: 'https://mera.eu/kategorie-produktow/parasole-ogrodowe/',
      scrapeID: 'Mera Parasole Ogrodowe',
   },
   {
      link: 'https://mera.eu/kategorie-produktow/donice-ogrodowe/',
      scrapeID: 'Mera Donice Ogrodowe',
   },
   {
      link: 'https://mera.eu/kategorie-produktow/krzesla-i-fotele-ogrodowe/',
      scrapeID: 'Mera Krzesla Fotele Ogrodowe',
   },
   {
      link: 'https://mera.eu/kategorie-produktow/krzesla-i-fotele-ogrodowe/',
      scrapeID: 'Mera Krzesla Fotele Ogrodowe',
   },
   {
      link: 'https://mera.eu/kategorie-produktow/lezaki-i-lezanki-ogrodowe/',
      scrapeID: 'Mera Lezaki Lezanki Ogrodowe',
   },
   {
      link: 'https://mera.eu/kategorie-produktow/stoly-ogrodowe//',
      scrapeID: 'Mera Stoly Ogrodowe',
   },
];

exports.ikeaPages = ikeaPages;
exports.meraPages = meraPages;
