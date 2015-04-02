var fs = require('fs');
var cheerio = require('cheerio');
var afterAll = require('after-all');

/* Aggregates the object with keys of data-i18n values found in dirname/*.html files */
/* and the values of corresponding DOM nodes content */
module.exports = function (dirname, cb) {
  fs.readdir(dirname, function (err, files) {
    if (err) cb(err);
    var lang = {};
    var next = afterAll(function (err) {
      if (err) cb(err);
      cb(null, lang)
    });
    files.filter(RegExp.prototype.test.bind(/\.html$/)).forEach(function (filename) {
      processFile(lang, filename, next());
    });
  });
}

function processFile(lang, filename, callback) {
  fs.readFile(filename, function (err, data) {
    if (err) return callback(err);
    var $ = cheerio.load(data);
    $('[data-i18n]').each(function () {
      var text = ($(this).html() || $(this).text()).trim();
      var key = $(this).attr('data-i18n');
      if (!(key in lang)) lang[key] = null;
      lang[key] = text;
    });
    callback();
  });
};