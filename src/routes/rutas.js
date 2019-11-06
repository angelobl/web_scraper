const express = require('express');
const krowdy = express.Router();

const scraperWong = require('../scraper/scraper')
const scraperEbay = require('../scraper/scraper_ebay')

krowdy.get('/', async (req,res) => {
    const scrap = await scraper();
    res.json(scrap);
  });

  krowdy.get('/wong', async (req,res) => {
    const scrapWong = await scraperWong();
    res.render('scraper/scraper_wong',{scrap:scrapWong});
  });

  krowdy.get('/ebay', async (req,res) => {
    const scrapEbay = await scraperEbay();
    res.render('scraper/scraper_ebay',{scrap:scrapEbay});
  });

module.exports = krowdy;