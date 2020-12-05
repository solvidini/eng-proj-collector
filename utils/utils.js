const path = require('path');
const fs = require('fs');

const clearImage = (filePath) => {
   filePath = path.join(__dirname, '..', filePath);
   fs.unlink(filePath, (err) => {
      console.log(err);
   });
};

const asyncForEach = async (array, callback) => {
   for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
   }
};

const isEqual = (a, b) => {
   // Create arrays of property names
   const aProps = Object.getOwnPropertyNames(a);
   const bProps = Object.getOwnPropertyNames(b);

   // If number of properties is different,
   // objects are not equivalent
   if (aProps.length != bProps.length) {
      return false;
   }

   for (let i = 0; i < aProps.length; i++) {
      let propName = aProps[i];

      // If values of same property are not equal,
      // objects are not equivalent
      if (a[propName] !== b[propName]) {
         return false;
      }
   }

   // If we made it this far, objects
   // are considered equivalent
   return true;
};

const pullColor = (text) => {
   if (/czarn/.test(text)) return 'czarny';
   if (/bial/.test(text)) return 'biały';
   if (/czerw/.test(text)) return 'czerwony';
   if (/niebiesk/.test(text)) return 'niebieski';
   if (/bezow/.test(text)) return 'beżowy';
   if (/blekit/.test(text)) return 'błękitny';
   if (/pomarancz/.test(text)) return 'pomarańczowy';
   if (/rozow/.test(text)) return 'różowy';
   if (/zlot/.test(text)) return 'złoty';
   if (/srebr/.test(text)) return 'srebrny';
   if (/zielon/.test(text)) return 'zielony';
   if (/purpur/.test(text)) return 'purpurowy';
   if (/fiolet/.test(text)) return 'fioletowy';
   if (/karmazyn/.test(text)) return 'karmazynowy';
   if (/zolt/.test(text)) return 'żółty';
   if (/braz/.test(text)) return 'brązowy';
   if (/turkus/.test(text)) return 'turkusowy';
   if (/kremow/.test(text)) return 'kremowy';
   if (/bordow/.test(text)) return 'bordowy';
   if (/szar/.test(text)) return 'szary';
   return '';
};

module.exports = { clearImage, asyncForEach, isEqual, pullColor };
