#!/usr/bin/env node
const Fs = require('fs')
const cmdwatcher = require('./util/cmdwatcher')
const mkdirp = require('mkdirp')

function groupByValue(list, grouper, groupName) {
  var grouped = {}
  groupName = groupName || 'items'
  for (var i = 0; i < list.length; i++) {
    var key = list[i][grouper]
    if (typeof grouped[key] !== "object" || typeof grouped[key].push !== "function") {
      grouped[key] = []
    }
    grouped[key].push(list[i])
  }
  return Object.keys(grouped).map(function (group) {
    var formatted = {}
    formatted[grouper] = group
    formatted.count = grouped[group].length
    formatted[groupName] = grouped[group]
    return formatted
  });
}

function sortByKey(list, key) {
  return list.sort(function (a, b) {
    return a[key] > b[key] ? 1 : 0
  })
}

function sortedGroupByValue(list, grouper, groupName) {
  return sortByKey(groupByValue(list, grouper, groupName), grouper);
}

var chapters = [];

cmdwatcher('build-chapters'
  , './chapters/!(list).json', function (files) {
  files.forEach(function (f) {
    Fs.readFile(f, function (err, buf) {
      if (err) {
        return console.error(err);
      }
      var data = buf.toString();
      try {
        var chapter = JSON.parse(data);
      } catch (e) {
        console.error("JSON parse error: " + f, e);
      }
      chapters.push(chapter);

      if (chapters.length === files.length) {
        writeChapters(chapters);
      }
    });
  });
});

function writeChapters(chapters) {
  data = { 
    total: chapters.length,
    regions: sortedGroupByValue(chapters, 'region', 'chapters') 
  };
  mkdirp.sync('.build/chapters')
  Fs.writeFile('.build/chapters/list.json', JSON.stringify(data, null, 2), function (err) {
    if (err) console.error(err);
  });
}