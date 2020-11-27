const download = require('node-image-downloader');

const Product = require('../models/product');
const Error = require('../models/error');
const { asyncForEach, isEqual, clearImage } = require('./utils');

module.exports = async (pageData, scrapeID) => {
   let downloadedImages = [];
   try {
      //Item existence array. 1 = exists, 0 = not exists
      const results = await Promise.all(
         pageData.map((item) =>
            Product.find({
               $and: [{ scrapeID: scrapeID }, { reference: item.reference }],
            }).countDocuments()
         )
      );

      //filtering old data
      const updatedData = [];
      results.forEach((value, index) => {
         if (value === 1) {
            updatedData.push(pageData[index]);
         }
      });

      await asyncForEach(updatedData, async (updatedProduct) => {
         const product = await Product.find(
            { $and: [{ scrapeID: scrapeID }, { reference: updatedProduct.reference }] },
            {
               _id: 0,
               scrapeID: 1,
               title: 1,
               company: 1,
               category: 1,
               path: 1,
               uri: 1,
               reference: 1,
               description: 1,
               price: 1,
            }
         );
         const oldDataProduct = product[0]._doc;
         delete updatedProduct.filename;
         updatedProduct.path = oldDataProduct.path;

         if (!isEqual(oldDataProduct, updatedProduct)) {
            await Product.updateOne({ reference: updatedProduct.reference }, updatedProduct);
            console.log('Updated a product! URL: ', updatedProduct.reference);
         }
      });

      //filtering new data
      const newData = [];
      results.forEach((value, index) => {
         if (value === 0) {
            newData.push(pageData[index]);
         }
      });
      console.log(`Number of new products of ${scrapeID} to upload: `, newData.length);

      if (newData.length > 0) {
         //download images
         downloadedImages = await download({
            imgs: newData,
            dest: './images',
         });

         downloadedImages.forEach((element, index) => {
            delete newData[index].filename;
            newData[index].path = element.path;
         });

         //save data to database
         newData.forEach(async (item) => {
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
