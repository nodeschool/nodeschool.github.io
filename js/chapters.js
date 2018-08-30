'use strict'

var Mustache = require('mustache')
var xhr = require('xhr')

try {
  loadChapters()
} catch(e) {
  console.log('error', e)
  $('#chapter-list').addClass('error')
}

function loadChapters() {
  xhr('/chapters/list.json', function (err, resp, body) {
    if (err) return console.log(err)
    
    var template = $("#tmpl-chapter-list").html()
    $("#chapter-list").html(Mustache.render(template, JSON.parse(body)))
  })
}

var cant = function () {
  $(".chapter-list")
    .find("h2")
    .each(
      function () {
        var cont = $(this).parent().find("li").length;
        $(this).html($(this).html() + " (" + cont + ")");
      }
    );
}