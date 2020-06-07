const clearImage = require('./utils.js').clearImage;

const Product = require('../models/product');

module.exports = async (removeBy) => {
  Product.find(removeBy)
    .then((documents) => {
      documents.forEach((document) => {
        if (document.path) {
          clearImage(document.path);
        }
        document.remove();
      });
      console.log('Products removed');
    })
    .catch((err) => {
      console.log(err);
    });
};
