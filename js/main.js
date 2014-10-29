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
  sorted = addHexcolor(sorted.reverse(), "#F7DA03", "#A09C9C")
  
  // make map
  var optionsJSON = ["name", "tickets", "startdate", "state"]
  var template = "<p class='event'>{{startdate}} <a class='{{state}}' href='{{tickets}}'"
    + " target='_blank'>{{name}}</a><p>"
  var geoJSON = Sheetsee.createGeoJSON(sorted.reverse(), optionsJSON)
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
