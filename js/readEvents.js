var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1swvC909BzbpToZLePM6whDvmXavaxEG6eT257dVf-bY/pubhtml';
function init() {
  Tabletop.init( { key: publicSpreadsheetUrl,
                   callback: events_function,
                   simpleSheet: true,
                   prettyColumnNames : false } )
}


var events =  new Array();
function events_function(data) {
  var eventData = data.sort(function(a, b) { return (new Date(a.startdate)) - (new Date(b.startdate)) })
  eventData.forEach(function (event) {
    eventObj = appendEvent(event)
    events.push(eventObj)
  });
  console.log(events);
  return events;
}

function appendEvent( event ) {

  var endDate
  if (event.enddate != ""){
	endDate = new Date(event.enddate).getFullYear() + '-' + new Date(event.enddate).getMonth() + '-' + new Date(event.enddate).getDate()
  } else {
	endDate = event.enddate
  }
  var eventObj = {
  title : event.name,
  start : new Date(event.startdate).getFullYear() + '-' + new Date(event.startdate).getMonth() + '-' + new Date(event.startdate).getDate(),
  end : endDate,
  url  : event.website
  };
  return eventObj;
}

init()
