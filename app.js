const download = require('node-image-downloader');
const puppeteer = require('puppeteer');

const scrapeLink = 'https://mera.eu/lampy/lampy-wiszace/';
const webData = [];

(async () => {
  try {
    let page;
    const browser = await puppeteer.launch();

    page = await browser.newPage();
    await page.goto(scrapeLink, { waitUntil: 'networkidle2' });

    for (let j = 0; j < 5; j++) {
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

    download({
      imgs: pageData,
      dest: './images',
    })
      .then((info) => {
        console.log('Download complete');
        // process.exit(1);
      })
      .catch((err) => console.log(err));

    console.log(pageData);

    await browser.close();
  } catch (err) {
    console.log(err.message);
  }
})();
