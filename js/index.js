try {
  loadEvents()
} catch(e) {
  $('#upcoming-workshops').addClass("error")
  $('#map').css({"background-size": "100%", "background-image": "url(images/hero.jpg)"})
}

function loadEvents() {
  var URL = "https://docs.google.com/spreadsheets/d/1swvC909BzbpToZLePM6whDvmXavaxEG6eT257dVf-bY/pubhtml"
  Tabletop.init({key: URL, callback: showNearEvents, simpleSheet: true})
}

function showNearEvents(data) {
  writeCount(data.length)
  makeMap(data)
  var list = upcomingEvents(data)
  if (list.length == 0) {
    $('#upcoming-workshops').addClass("empty")
  } else {
    var html = Sheetsee.ich.events({
        'rows': list
      })
    $('#upcoming-workshops').addClass("success")
    $('#upcoming-workshops>.success>ul').html(html)
  }
}

function writeCount(count) {
  $('#event-count .cnt').text(count)
}
