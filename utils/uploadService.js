const download = require('node-image-downloader');

const { isEqual, clearImage } = require('../utils/utils');
const Service = require('../models/service');
const Error = require('../models/error');

module.exports = async (pageData, scrapeID) => {
  let downloadedImages; //
  try {
    const exists = await Service.find({
      scrapeID: scrapeID,
    }).countDocuments();

    if (exists === 0) {
      if (pageData.uri) {
        //download image
        const array = [];
        array.push(pageData);
        downloadedImages = await download({
          imgs: array,
          dest: './images',
        });

        delete pageData.filename;
        pageData.path = downloadedImages[0].path;
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
      const oldDataService = service[0]._doc;
      const oldImagePath = oldDataService.path;
      const newImageFilename = pageData.filename;
      delete oldDataService.path;
      delete pageData.filename;

      if (!isEqual(oldDataService, pageData)) {
        if (oldDataService.uri !== pageData.uri) {
          //remove old image
          clearImage(oldImagePath);
          //download new image
          pageData.filename = newImageFilename;
          const array = [];
          array.push(pageData);
          downloadedImages = await download({
            imgs: array,
            dest: './images',
          });

          delete pageData.filename;
          pageData.path = downloadedImages[0].path;
        }
        await Service.updateOne({ scrapeID: scrapeID }, pageData);
        console.log('Updated ' + scrapeID + ' service.');
      }
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
