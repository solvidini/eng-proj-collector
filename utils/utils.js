const path = require('path');
const fs = require('fs');

const clearImage = (filePath) => {
  filePath = path.join(__dirname, '..', filePath);
  fs.unlink(filePath, (err) => {
    console.log(err);
  });
};

module.exports.clearImage = clearImage;

// utils.clearImage(
//   'images/mera-0a087b55-1350-4fe9-a7dc-a2fa1d4fe0a0.png'
// );
