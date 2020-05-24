const path = require('path');

const schedule = require('node-schedule');
const express = require('express');
const mongoose = require('mongoose');

const meraLampsScraper = require('./targets/mera-lamps');

const app = express();

//static images download
app.use('/images', express.static(path.join(__dirname, 'images')));

//scrapers
const rule = '0 0 * * * *';
// rule.second = 10;

// app.use((req, res, next) => {
//   console.log('inside!');
// });

// schedule.scheduleJob(rule, () => {
// meraLampsScraper();
// });

mongoose
  .connect(
    'mongodb+srv://cyber-admin:1423cezqS7@cluster0-liqat.mongodb.net/database?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((result) => {
    console.log('Connected to database.');
    app.listen(process.env.PORT || 8101);
  })
  .catch((err) => {
    console.log(err);
  });
