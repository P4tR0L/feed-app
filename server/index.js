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
      items: '',
      inStock: '',
      incorrectLink: true,
      customLabel0: '',
      customLabel1: '',
      customLabel2: '',
      customLabel3: '',
      customLabel4: ''
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
    feed.items.forEach(item => {
      if (item.stock === "in stock") avCount++;
      if (item.custom_label_0) customLabel0Count++;
      if (item.custom_label_1) customLabel1Count++;
      if (item.custom_label_2) customLabel2Count++;
      if (item.custom_label_3) customLabel3Count++;
      if (item.custom_label_4) customLabel4Count++;
    });

    res.send(JSON.stringify({
      items: feed.items.length,
      inStock: avCount,
      incorrectLink: false,
      customLabel0: customLabel0Count,
      customLabel1: customLabel1Count,
      customLabel2: customLabel2Count,
      customLabel3: customLabel3Count,
      customLabel4: customLabel4Count
    }));
  });
});

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);