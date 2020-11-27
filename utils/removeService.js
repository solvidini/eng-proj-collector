const clearImage = require('./utils.js').clearImage;

const Service = require('../models/service');

module.exports = (scrapeID) => {
   Service.findOne({ scrapeID: scrapeID })
      .then((document) => {
         if (document) {
            if (document.path) {
               clearImage(document.path);
            }
            document.remove();
            console.log('Service removed due to error.');
         }
      })
      .catch((err) => {
         console.log(err);
      });
};
