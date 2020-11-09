// Remove out of date products
const fetch = require('node-fetch');

const Product = require('../models/product');
const clearImage = require('./utils.js').clearImage;

module.exports = removeOODProducts = () => {
   Product.find()
      .then((documents) => {
         if (documents) {
            documents.forEach((document) => {
               fetch(document.reference).then((response) => {
                  if (
                     response.redirected ||
                     response.status === 302 ||
                     response.status === 404 ||
                     response.status === 410
                  ) {
                     if (document.path) {
                        clearImage(document.path);
                     }
                     document.remove();
                     console.log(`Product ${document.reference} removed.`);
                  }
               });
            });
         }
      })
      .catch((err) => {
         console.log(err);
      });
};
