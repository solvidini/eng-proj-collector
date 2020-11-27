const Error = require('../models/error');

const removeProducts = require('./removeProducts');
const removeService = require('./removeService');

module.exports = async (error) => {
   try {
      const exists = await Error.find({
         scrapeID: error.scrapeID,
      }).countDocuments();

      if (exists === 0) {
         const newError = new Error({
            scrapeID: error.scrapeID,
            type: error.type,
            message: error.message,
            statusCode: error.statusCode,
            iteration: 1,
         });

         console.error(
            newError.scrapeID,
            '\n',
            newError.type,
            '\n',
            newError.message,
            '\n',
            newError.statusCode,
            '\n',
            'Iteration number: ' + newError.iteration
         );
         await newError.save();
      } else {
         const oldError = await Error.find({
            scrapeID: error.scrapeID,
         });
         let updatedError = oldError[0]._doc;
         updatedError.iteration += 1;
         updatedError.message = error.message;
         updatedError.statusCode = error.statusCode;

         if (updatedError.iteration > 6) {
            if (updatedError.type === 'products') {
               removeProducts(updatedError.scrapeID);
            } else if (updatedError.type === 'services') {
               removeService(updatedError.scrapeID);
            }
         }

         await Error.updateOne({ _id: updatedError._id }, updatedError);

         console.error(
            updatedError.scrapeID,
            '\n',
            updatedError.type,
            '\n',
            updatedError.message,
            '\n',
            updatedError.statusCode,
            '\n',
            'Iteration number: ' + updatedError.iteration
         );
      }
   } catch (err) {
      console.log(err);
   }
};
