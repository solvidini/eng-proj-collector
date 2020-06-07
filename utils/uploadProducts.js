const download = require('node-image-downloader');

const Product = require('../models/product');
const Error = require('../models/error');

module.exports = async (pageData, scrapeID) => {
  let downloadedImages;
  try {
    //Item existance array. 1 = exists, 0 = not exists
    const results = await Promise.all(
      pageData.map((item) =>
        Product.find({
          $and: [{ uri: item.uri }, { title: item.title }],
        }).countDocuments()
      )
    );

    const filteredData = [];

    //filtering
    results.forEach((value, index) => {
      if (value === 0) {
        filteredData.push(pageData[index]);
      }
    });
    console.log(
      `Number of new products of ${scrapeID} to upload: `,
      filteredData.length
    );

    if (filteredData.length >= 1) {
      //download images
      downloadedImages = await download({
        imgs: filteredData,
        dest: './images',
      });

      downloadedImages.forEach((element, index) => {
        delete filteredData[index].filename;
        filteredData[index].path = element.path;
      });

      //save data to database
      filteredData.forEach(async (item) => {
        let productData = {
          title: item.title,
          scrapeID: item.scrapeID,
          path: item.path,
          company: item.company,
          uri: item.uri,
          reference: item.reference,
          category: item.category,
        };
        if (item.description) {
          productData.description = item.description;
        }
        if (item.price) {
          productData.price = item.price;
        }
        const product = new Product(productData);

        await product.save();
      });
    }
    const errorExists = await Error.findOne({
      scrapeID: scrapeID,
    }).countDocuments();
    if (errorExists > 0) {
      const error = await Error.findOne({ scrapeID: scrapeID });
      error.reset();
    }
  } catch (err) {
    downloadedImages.forEach((element) => {
      clearImage(element.path);
    });
    throw err;
  }
};
