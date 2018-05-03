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

var communityGroups = [];

cmdwatcher('build-community-groups'
  , './community-groups/!(list).json', function (files) {
  files.forEach(function (f) {
    Fs.readFile(f, function (err, buf) {
      if (err) {
        return console.error(err);
      }
      var data = buf.toString();
      try {
        var communityGroup = JSON.parse(data);
      } catch (e) {
        console.error("JSON parse error: " + f, e);
      }
      communityGroups.push(communityGroup);

      if (communityGroups.length === files.length) {
        writeCommunityGroups(communityGroups);
      }
    });
  });
});

function writeCommunityGroups(communityGroups) {
  data = {
    total: communityGroups.length,
    regions: sortedGroupByValue(communityGroups, 'name', 'communityGroups')
  };
  mkdirp.sync('.build/communityGroups')
  Fs.writeFile('.build/communityGroups/list.json', JSON.stringify(data, null, 2), function (err) {
    if (err) console.error(err);
  });
}
