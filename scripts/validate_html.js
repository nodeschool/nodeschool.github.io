#!/usr/bin/env node

// Check, whether you have any duplicated i18n values on the pages
var fs = require('fs');
var cheerio = require('cheerio');
var afterAll = require('after-all');
var path = require('path')

validateDirectory(path.join(__dirname, '..'))

function validateDirectory(dirname, cb) {
  fs.readdir(dirname, function (err, files) {
    if (err) cb(err);
    var result = []
    var next = afterAll(function (err) {
      if (err) cb(err);
      if (result.length === 0) {
        console.log('everything seems nice')
      } else {
        console.log('While inspecting files: ' + files + ', we have found issues')
        console.log(result.join('\n'))
      }
    });
    files.filter(RegExp.prototype.test.bind(/\.html$/)).forEach(function (filename) {
      validateFile(result, filename, next());
    });
  });
}

function validateFile(result, filename, callback) {
  fs.readFile(filename, function (err, data) {
    var seenOnThisPage = {};
    if (err) return callback(err);
    var $ = cheerio.load(data);
    $('[data-i18n]').each(function () {
      var text = ($(this).html() || $(this).text()).trim();
      var key = $(this).attr('data-i18n');
      if ((key in seenOnThisPage) && seenOnThisPage[key] !== text) {
        var errMsg = filename + ': ' + key + ' is associated both with \n' + seenOnThisPage[key] + '\n -- AND -- \n' + text
        result.push(errMsg)
      }
      seenOnThisPage[key] = text
    });
    callback();
  });
};

