#!/usr/bin/env node

var getStrings = require('./get-i18n-list')
var fs = require('fs')
var read = require('read')
var path = require('path')

read({prompt: 'What language code do you want to generate? (e.g. en-US):'}, function(err, language) {
  if (!language) {
    console.log('Usage:\nnpm run language [language-code]');
    process.exit(1);
  }  
  getStrings(path.join(__dirname, '..'), function (err, lang) {
    if (err) throw err
    var data = JSON.stringify(lang, null, 2)
    var outFile = path.join(__dirname, '..', 'languages', language + '.json');
    fs.writeFile(outFile, data, function (err) {
      if (err) throw err;
      console.log('Successfully created', outFile);
      process.exit();
    });
  })
})


