const express = require('express');
const krowdy = express.Router();

const scraper = require('../scraper/scraper')

krowdy.get('/', async (req,res) => {
    const scrap = await scraper();
    res.json(scrap);
  });

  krowdy.get('/wong', async (req,res) => {
    const scrap = await scraper();
    res.render('scraper/scraper_wong',{scrap:scrap});
  });

module.exports = krowdy;