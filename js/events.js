try {
  loadEvents()
} catch(e) {
  $('#upcoming-workshops').html('Could not load events, sorry!')
  $('#map').css({"background-size": "100%", "background-image": "url(images/hero.jpg)"})
}

function loadEvents() {
  var URL = "https://docs.google.com/spreadsheets/d/1swvC909BzbpToZLePM6whDvmXavaxEG6eT257dVf-bY/pubhtml"
  Tabletop.init({key: URL, callback: showNearEvents, simpleSheet: true})
}

function showNearEvents(data) {
  writeCount(data.length)
  generateCalendar(data)
  makeMap(data)
  var html = Sheetsee.ich.events({
      'rows': sortDates(data)
    })
  $('#upcoming-workshops').html(html)
}

function makeMap(data) {
  data = addHexcolor(data, "#F7DA03", "#A09C9C")
  // make map
  var optionsJSON = ["name", "tickets", "startdate", "state"]
  var template = "<p class='event'><strong>{{startdate}}</strong> <a class='{{state}}' href='{{tickets}}'"
    + " target='_blank'>{{name}}</a><p>"
  var geoJSON = Sheetsee.createGeoJSON(data, optionsJSON)
  var map = Sheetsee.loadMap("map")
  Sheetsee.addTileLayer(map, 'examples.map-20v6611k')
  var markerLayer = Sheetsee.addMarkerLayer(geoJSON, map, template)
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
  $('#event-count').html(count)
}
