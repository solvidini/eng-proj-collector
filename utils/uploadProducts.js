const download = require('node-image-downloader');

const Product = require('../models/product');

module.exports = async (pageData) => {
  const info = await download({
    imgs: pageData,
    dest: './images',
  });

  info.forEach((element, index) => {
    delete pageData[index].filename;
    pageData[index].path = element.path;
  });

  //Item existance array. 1 = exists, 0 = not exists
  const results = await Promise.all(
    pageData.map((item) =>
      Product.find({
        $and: [{ uri: item.uri }, { title: item.title }],
      }).countDocuments()
    )
  );

  const filteredData = [];

  results.forEach((value, index) => {
    if (value === 0) {
      filteredData.push(pageData[index]);
    }
  });

  console.log(filteredData);

  filteredData.forEach(async (item) => {
    const product = new Product({
      title: item.title,
      path: item.path,
      company: item.company,
      uri: item.uri,
      reference: item.reference,
      category: item.category,
    });
    try {
      await product.save();
      console.log('Product saved to database!');
    } catch (err) {
      throw err;
    }
  });
};
