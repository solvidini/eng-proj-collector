const download = require('node-image-downloader');
const puppeteer = require('puppeteer');
const uuid = require('uuid');

const scrapeLink = 'https://mera.eu/lampy/lampy-wiszace/';
const scrollDownQuantity = 1;

(async () => {
  try {
    let page;
    const browser = await puppeteer.launch();

    page = await browser.newPage();
    await page.goto(scrapeLink, { waitUntil: 'networkidle2' });

    for (let j = 0; j < scrollDownQuantity; j++) {
      await page.evaluate(() => {
        window.scrollTo(
          0,
          document.querySelector('body > div.page > div.producer')
            .offsetTop -
            document.querySelector('body > footer').offsetHeight
        );
      });
      await page.waitFor(2000);
    }

    let pageData = await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
      let data = [];

      const nodeList = document.querySelector(
        'body > div.page > div.tile.tile--bg-dark > div.tile__row.tile__row--tiles.floatfix'
      ).childNodes;

      nodeList.forEach((node) => {
        const title = node.querySelector('.tile__text').textContent;
        let uri = node.querySelector('.img').getAttribute('style');
        uri = uri.substring(23, uri.length - 3);
        data.push({ title, uri });
      });

      return data;
    });

    pageData = pageData.map((element) => {
      return { ...element, filename: 'mera-' + uuid.v4() };
    });

    download({
      imgs: pageData,
      dest: './images',
    })
      .then((info) => {
        console.log('Download complete', info);
        info.forEach((element, index) => {
          delete pageData[index].filename
          pageData[index].path = element.path;
        });
        console.log(pageData);
      })
      .catch((err) => {
        console.log(err);
      });

    await browser.close();
  } catch (err) {
    console.log(err.message);
  }
})();
