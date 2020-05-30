const Error = require('../models/error');

module.exports = async (error) => {
  const newError = new Error({
    where: error.where,
    message: error.message,
    statusCode: error.statusCode,
  });

  console.log(
    error.where,
    '\n',
    error.message,
    '\n',
    error.statusCode,
    '\n'
  );
  await newError.save();
};
