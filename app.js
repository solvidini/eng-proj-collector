const path = require('path');

const schedule = require('node-schedule');
const express = require('express');
const mongoose = require('mongoose');

const utils = require('./utils/utils');
const meraLampsScraper = require('./targets/mera-lamps');
const ikeaScraper = require('./targets/ikea');

const app = express();

//static images download
app.use('/images', express.static(path.join(__dirname, 'images')));

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

    //scrapers
    const rule = '0 0 * * * *';

    // app.use((req, res, next) => {
    //   console.log('inside!');
    // });

    schedule.scheduleJob(rule, () => {
      console.log('Data scraping time: ' + new Date());
      ikeaScraper(
        'https://www.ikea.com/pl/pl/cat/fotele-i-szezlongi-fu006/?page=15',
        'Ikea Chairs'
      );
      meraLampsScraper();
    });

    app.listen(process.env.PORT || 8101);
  })
  .catch((err) => {
    console.log(err);
  });
