const download = require('node-image-downloader');

const { isEqual } = require('../utils/utils');
const errorHandler = require('../utils/errorHandler');
const Service = require('../models/service');

module.exports = async (pageData, scrapeID) => {
  try {
    const exists = await Service.find({
      description: pageData.description,
    }).countDocuments();

    if (exists === 0) {
      if (pageData.uri) {
        //download image
        const array = [];
        array.push(pageData);
        const info = await download({
          imgs: array,
          dest: './images',
        });

        delete pageData.filename;
        pageData.path = info[0].path;
      }

      //save data to database
      const service = new Service(pageData);

      await service.save();
      console.log('Uploaded new service.');
    } else {
      const service = await Service.find(
        {
          scrapeID: scrapeID,
        },
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
        }
      );
      const updatedService = service[0]._doc;
      delete updatedService.path;
      delete pageData.filename;

      if (!isEqual(updatedService, pageData)) {
        await Service.updateOne({ scrapeID: scrapeID }, pageData);
        console.log('Updated ' + scrapeID + ' service.');
      }
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    err.where = scrapeID + ' uploadService';
    errorHandler(err);
  }
};
