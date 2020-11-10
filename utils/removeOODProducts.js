// Remove out of dated products
const fetch = require('node-fetch');

const Product = require('../models/product');
const { asyncForEach } = require('./utils.js');
const clearImage = require('./utils.js').clearImage;

module.exports = async () => {
   try {
      const products = await Product.find();
      await asyncForEach(products, async (product) => {
         const response = await fetch(product.reference);
         if (
            response.redirected ||
            response.status === 302 ||
            response.status === 404 ||
            response.status === 410
         ) {
            if (product.path) {
               clearImage(product.path);
            }
            product.remove();
            console.log(`Product ${product.reference} removed.`);
         }
      });
   } catch (err) {
      console.log(err);
   }
};
