var fs = require('fs');
var path = require('path');
var cheerio = require('cheerio');
var afterAll = require('after-all');
var selectors = require('../languages/selectors.json');

var language = process.argv[2];
if (!language) {
  console.log('Usage:\nnpm run language [language-code]');
  process.exit(1);
}

fs.readdir(path.join(__dirname, '..'), function (err, files) {
  if (err) throw err;
  var lang = {};
  var next = afterAll(function (err) {
    if (err) throw err;
    var data = JSON.stringify(lang, null, 2);
    var outFile = path.join(__dirname, '..', 'languages', language + '.json');
    fs.writeFile(outFile, data, function (err) {
      if (err) throw err;
      console.log('Successfully created', outFile);
      process.exit();
    });
  });
  files.filter(RegExp.prototype.test.bind(/\.html$/)).forEach(function (filename) {
    processFile(lang, filename, next());
  });
});

// cheerio doesn't care much for :eq() selectors, let's take care of that
var cheeriofySelector = function ($, selector) {
  var regex = /^(.*?)(?:\:eq\((\d+)\))(.*)/;
  var parts = [];
  var match;
  while (match = selector.match(regex)) {
    parts.push(match[1]);
    parts.push(parseInt(match[2], 10));
    selector = match[3];
  }
  parts.push(selector);

  var cursor = $(parts.shift());
  parts.forEach(function (selector) {
    cursor = typeof selector === 'number' ? cursor.eq(selector) : cursor.find(selector);
  });

  return cursor;
};

var processFile = function (lang, filename, callback) {
  fs.readFile(filename, function (err, data) {
    if (err) return callback(err);
    var $ = cheerio.load(data);
    Object.keys(selectors).forEach(function (selector) {
      var text = cheeriofySelector($, selector).text().trim();
      var key = selectors[selector];
      if (!(key in lang)) lang[key] = null;
      if (!text) return; // maybe this selector doesn't match the current file
      lang[selectors[selector]] = text;
    });
    callback();
  });
};
