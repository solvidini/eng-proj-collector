const clearImage = require('./utils.js').clearImage;

const Product = require('../models/product');

module.exports = (scrapeID) => {
  Product.find({ scrapeID: scrapeID })
    .then((documents) => {
      if (documents) {
        documents.forEach((document) => {
          if (document.path) {
            clearImage(document.path);
          }
          document.remove();
        });
        console.log('Products removed due to error.');
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
