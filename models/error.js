const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const errorSchema = new Schema(
  {
    scrapeID: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    statusCode: {
      type: Number,
      required: true,
    },
    iteration: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

errorSchema.methods.reset = function () {
  this.iteration = 0;
  return this.save();
};

module.exports = mongoose.model('Error', errorSchema);
