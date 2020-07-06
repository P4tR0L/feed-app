const express = require('express');
const bodyParser = require('body-parser');
const Parser = require('rss-parser');
const pino = require('express-pino-logger')();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

let parser = new Parser({
  customFields: {
    item: [
      ['g:availability', 'stock'],
      ['g:custom_label_0', 'custom_label_0'],
      ['g:custom_label_1', 'custom_label_1'],
      ['g:custom_label_2', 'custom_label_2'],
      ['g:custom_label_3', 'custom_label_3'],
      ['g:custom_label_4', 'custom_label_4'],
    ]
  }
});

app.get('/api/feed', (req, res) => {
  const url = req.query.url;
  
  if (url.includes('xml') === false) {
    res.send(JSON.stringify({
      incorrectLink: true
    }));
    return;
  }

  parser.parseURL(url, (err, feed) => {
    if (err) throw err;
    
    let avCount = 0;
    let customLabel0Count = 0;
    let customLabel1Count = 0;
    let customLabel2Count = 0;
    let customLabel3Count = 0;
    let customLabel4Count = 0;
    let customLabel0Items = [];
    let customLabel1Items = [];
    let customLabel2Items = [];
    let customLabel3Items = [];
    let customLabel4Items = [];
    
    feed.items.forEach(item => {
      if (item.stock === "in stock") avCount++;
      
      if (item.custom_label_0) {
        customLabel0Items.push(item.custom_label_0);
        customLabel0Count++;
      }

      if (item.custom_label_1) {
        customLabel1Items.push(item.custom_label_1);
        customLabel1Count++;
      }
      
      if (item.custom_label_2) {
        customLabel2Items.push(item.custom_label_2);
        customLabel2Count++;
      }
      
      if (item.custom_label_3) {
        customLabel3Items.push(item.custom_label_3);
        customLabel3Count++;
      }

      if (item.custom_label_4) {
        customLabel4Items.push(item.custom_label_4);
        customLabel4Count++;
      }
    });

    let customLabelCounts0 = {};
    customLabel0Items.forEach(el => customLabelCounts0[el] = 1 + (customLabelCounts0[el] || 0))
    let customLabelCountsArray0 = Object.entries(customLabelCounts0);
    
    let customLabelCounts1 = {};
    customLabel1Items.forEach(el => customLabelCounts1[el] = 1 + (customLabelCounts1[el] || 0))
    let customLabelCountsArray1 = Object.entries(customLabelCounts1);
    
    let customLabelCounts2 = {};
    customLabel2Items.forEach(el => customLabelCounts2[el] = 1 + (customLabelCounts2[el] || 0))
    let customLabelCountsArray2 = Object.entries(customLabelCounts2);
    
    let customLabelCounts3 = {};
    customLabel3Items.forEach(el => customLabelCounts3[el] = 1 + (customLabelCounts3[el] || 0))
    let customLabelCountsArray3 = Object.entries(customLabelCounts3);

    let customLabelCounts4 = {};
    customLabel4Items.forEach(el => customLabelCounts4[el] = 1  + (customLabelCounts4[el] || 0))
    let customLabelCountsArray4 = Object.entries(customLabelCounts4);

    for (let i = 0; i < customLabelCountsArray0.length; i++) {
      let counter = 0;

      feed.items.forEach(item => {
        if (item.custom_label_0 === customLabelCountsArray0[i][0] && item.stock === "in stock") counter++;
      });

      customLabelCountsArray0[i].push(counter);
    }

    for (let i = 0; i < customLabelCountsArray1.length; i++) {
      let counter = 0;

      feed.items.forEach(item => {
        if (item.custom_label_1 === customLabelCountsArray1[i][0] && item.stock === "in stock") counter++;
      });

      customLabelCountsArray1[i].push(counter);
    }

    for (let i = 0; i < customLabelCountsArray2.length; i++) {
      let counter = 0;

      feed.items.forEach(item => {
        if (item.custom_label_2 === customLabelCountsArray2[i][0] && item.stock === "in stock") counter++;
      });

      customLabelCountsArray2[i].push(counter);
    }

    for (let i = 0; i < customLabelCountsArray3.length; i++) {
      let counter = 0;

      feed.items.forEach(item => {
        if (item.custom_label_3 === customLabelCountsArray3[i][0] && item.stock === "in stock") counter++;
      });

      customLabelCountsArray3[i].push(counter);
    }

    for (let i = 0; i < customLabelCountsArray4.length; i++) {
      let counter = 0;

      feed.items.forEach(item => {
        if (item.custom_label_4 === customLabelCountsArray4[i][0] && item.stock === "in stock") counter++;
      });

      customLabelCountsArray4[i].push(counter);
    }

    res.send(JSON.stringify({
      items: feed.items.length,
      inStock: avCount,
      incorrectLink: false,
      customLabel0: customLabel0Count,
      customLabel1: customLabel1Count,
      customLabel2: customLabel2Count,
      customLabel3: customLabel3Count,
      customLabel4: customLabel4Count,
      customLabelCounts0: customLabelCountsArray0,
      customLabelCounts1: customLabelCountsArray1,
      customLabelCounts2: customLabelCountsArray2,
      customLabelCounts3: customLabelCountsArray3,
      customLabelCounts4: customLabelCountsArray4
    }));
  });
});

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);