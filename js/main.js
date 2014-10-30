var back = document.createElement('button');
back.appendChild(document.createTextNode('Back'));
back.id = 'back';
back.addEventListener('click', function (ev) {
  window.location.hash = '#';
});

var boxContainer = document.querySelector('.boxes');
// boxContainer.parentNode.insertBefore(back, boxContainer);

var boxes = [].slice.call(document.querySelectorAll('.box'));
boxes.forEach(function (box) {
  box.addEventListener('click', function (ev) {
    window.location.hash = '#' + this.getAttribute('data-url');
  });
  box.classList.add('small');
});

var sectionHeaders = [].slice.call(document.querySelectorAll('.section'));

function hideAll() {
  boxes.forEach(function (box) {
    box.style.display = 'none';
  });
  sectionHeaders.forEach(function (header) {
    header.style.display = 'none';
  });
}

function showAll() {
  boxes.forEach(function (box) {
    box.style.display = 'inline-block';
    box.classList.add('small');
  });
  sectionHeaders.forEach(function (header) {
    header.style.display = 'block';
  });
}

window.addEventListener('hashchange', handleHashChange);

function handleHashChange() {
  var hash = window.location.hash.slice(1);

  if (!hash)
    return showIndex();
  showItemByUrl(hash);
}

function showIndex() {
  showAll();
  back.classList.remove('show');
}

function showItemByUrl(frag) {
  var el = document.querySelector('*[data-url="'+frag+'"]');
  if (el && el.classList.contains('small')) {
    hideAll();
    el.style.display = 'block';
    el.classList.remove('small');
    back.classList.add('show');
  }
}

handleHashChange();

function sortDates(data) {
  var today = new Date()

  // add formatted dates
  data.forEach(function(event) {
    event.startUTC = new Date(event.startdate)
    if (event.enddate) event.endUTC = new Date(event.enddate)
  })

  // sort the dates
  var sorted = data
  sorted.sort(function(a,b) {
    return a.startUTC - b.startUTC
  })

  return sorted
}

function upcomingEvents(data) {
  var today = new Date()
  var sorted = sortDates(data)

  // only upcoming events
  var freshies = []
  var todayBuffer = new Date()
  todayBuffer.setHours(today.getHours() - 24)

  sorted.forEach(function(event) {
    if (event.startUTC >= todayBuffer)
      freshies.push(event)
  })

  return freshies
}

function makeMap(data) {

  var sorted = sortDates(data)
                .map(setState)
                // not sure this is needed, given past events are done using image
                .map(addHexColor.bind(this, "#F7DA03", "#A09C9C"))
                .reverse()

  var upcoming = sorted.filter(isFuture)
  var past     = sorted.filter(function (event) { return !isFuture(event) })

  var optionsJSON = ["name", "tickets", "startdate", "state"]
  var template = "<p class='event'>{{startdate}} <a class='{{state}}' href='{{tickets}}'"
    + " target='_blank'>{{name}}</a><p>"

  var map = Sheetsee.loadMap("map")
  Sheetsee.addTileLayer(map, 'examples.map-20v6611k')

  function addMarkers(data) {
    var geoJSON = Sheetsee.createGeoJSON(data, optionsJSON)
    return Sheetsee.addMarkerLayer(geoJSON, map, template)
  }

  addMarkers(upcoming, optionsJSON)
  // known issue: sheetsee will throw "Invalid name: popup." because we addMakerLayer
  // twice and set the template for popup
  // should be revisited given template for past & future events should be different
  var past = addMarkers(past, optionsJSON)
  past.eachLayer(function (marker) {
    marker.setIcon(L.divIcon({
            // Specify a class name we can refer to in CSS.
            className: 'past-event',
            // Set a markers width and height.
            iconSize: [10, 10]
        }))
  })

  map.setZoom(1)
  // disable dragging on mobile/tablet because it makes it hard
  // to scroll the page on full width-ish maps
  if (window.innerWidth <= 768 ) map.dragging.disable()
}

function isFuture(event) {
  return (event.startUTC > new Date())
}

function setState(event) {
  // event should have future state if it starts later that now (duh!)
  event.state = isFuture(event) ? "future" : "past"
  return event
}
function addHexColor(futureColor, pastColor, event) {
  event.hexcolor = isFuture(event) ? futureColor : pastColor
  return event
}
