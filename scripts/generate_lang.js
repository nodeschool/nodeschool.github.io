#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var cheerio = require('cheerio');
var find = require('cheerio-eq');
var afterAll = require('after-all');
var read = require('read')
var selectors = require('../languages/selectors.json');

read({prompt: 'What language code do you want to generate? (e.g. en-US):'}, function(err, language) {
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
})

var processFile = function (lang, filename, callback) {
  fs.readFile(filename, function (err, data) {
    if (err) return callback(err);
    var $ = cheerio.load(data);
    Object.keys(selectors).forEach(function (selector) {
      var text = (find($, selector).html() || find($, selector).text()).trim();
      var key = selectors[selector];
      if (!(key in lang)) lang[key] = null;
      if (!text) return; // maybe this selector doesn't match the current file
      lang[selectors[selector]] = text;
    });
    callback();
  });
};
