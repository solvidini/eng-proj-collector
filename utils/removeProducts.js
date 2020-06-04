const clearImage = require('./utils.js').clearImage;

const errorHandler = require('../utils/errorHandler');
const Product = require('../models/product');

module.exports = async (removeBy) => {
  Product.find(removeBy)
    .then((documents) => {
      documents.forEach((document) => {
        clearImage(document.path);
        document.remove();
      });
      console.log('Products removed');
    })
    .catch((err) => {
      console.log(err);
      errorHandler(err);
    });
};
