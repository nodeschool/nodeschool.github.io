#!/usr/bin/env node

var getStrings = require('./get-i18n-list');
var fs = require('fs');
var read = require('read');
var path = require('path');

read({prompt: 'What language code do you want to generate untranslated json? (e.g. en-US):'}, function(err, language) {
  if (err) {
    throw err;
  }
  getStrings(path.join(__dirname, '..'), function (err, newStrings) {
    if (err) {
      throw err;
    }
    var langFile = path.join(__dirname, '..', 'languages', language + '.json');
    var outFile = path.join(__dirname, '..', 'languages', language + '.untranslated.json');
    var oldStrings = require(langFile);
    var untranslated = {};
    for(var key in newStrings) {
      if (!oldStrings.hasOwnProperty(key)) {
        untranslated[key] = newStrings[key];
      }
    }
    var data = JSON.stringify(untranslated, null, 2);
    fs.writeFile(outFile, data, function (err) {
      if (err) {
        throw err;
      }
      console.log('Successfully created', outFile);
    });
  });
});
