'use strict'
try {
  loadChapters()
} catch(e) {
  console.log('error', e);
  $('#chapter-list').addClass('error')
}



function loadChapters() {
  xhr('/chapters/list.json', function (err, resp, body) {
    if (err) return console.log(err);
    
    var template = $("#tmpl-chapter-list").html();
    console.log(template, JSON.parse(body));
    
    $("#chapter-list").html(Mustache.render(template, JSON.parse(body)));
  })
}