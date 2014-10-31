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
  var list = sortDates(data)
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

function makeMap(data) {
  data = addHexcolor(data, "#F7DA03", "#A09C9C")
  // make map
  var optionsJSON = ["name", "tickets", "startdate", "state"]
  var template = "<p class='event'>{{startdate}} <a class='{{state}}' href='{{tickets}}'"
    + " target='_blank'>{{name}}</a><p>"
  var geoJSON = Sheetsee.createGeoJSON(data, optionsJSON)
  var map = Sheetsee.loadMap("map")
  Sheetsee.addTileLayer(map, 'examples.map-20v6611k')
  var markerLayer = Sheetsee.addMarkerLayer(geoJSON, map, template)
  map.setZoom(1)
  // disable dragging on mobile/tablet because it makes it hard
  // to scroll the page on full width-ish maps
  if (window.innerWidth <= 768 ) map.dragging.disable()
}

function addHexcolor(data, color, color2) {
  data.forEach(function(event) {
    event.state = "past"
    event.startUTC = new Date(event.startdate)
    if (event.startUTC > new Date()) {
      event.hexcolor = color
      event.state = "future"
    }
    else event.hecolor = color2
  })
  return data
}

function writeCount(count) {
  $('#event-count .cnt').text(count)
}
