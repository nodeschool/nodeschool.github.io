var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1swvC909BzbpToZLePM6whDvmXavaxEG6eT257dVf-bY/pubhtml';
function init() {
  Tabletop.init( { key: publicSpreadsheetUrl,
                   callback: parse_events,
                   simpleSheet: true,
                   prettyColumnNames : false } )
}

var events =  [];
function parse_events(data) {
  var eventData = data.sort(function(a, b) { return (new Date(a.startdate)) - (new Date(b.startdate)) })
  eventData.forEach(function (event) {
    eventObj = appendEvent(event)
    events.push(eventObj)
  });

  $(document).ready(function() {
  // page is now ready, initialize the calendar...
    $('#eventCalendar').fullCalendar({
      themeSystem: 'jquery-ui',
      header:{
        left:   '',
        center: 'title',
        right:  'today prevYear,prev,next,nextYear'
      },
      //height: 650,
      fixedWeekCount: false,
      eventLimit: true, // allow "more" link when too many events,
      events: events,
      eventColor: 'gray',
      eventClick: function(eventObj) {
        if (eventObj.url) {
          window.open(eventObj.url);
          return false; // prevents browser from following link in current tab.
        }
      },
      eventRender : function(event, element) {
    	   element[0].title = event.title;
    	}
    })
  });
}

function appendEvent( event ) {

  // Those 'if statements' fix the invalid event entries so as to avoid problems on calendar
  if (event.name == "NodeSchool LA" && event.enddate == '2/6/2016'){
    event.startdate = '2/6/2016'
  }
  if (event.name == "JavaScript Meetup" && event.enddate == '7/31/2016'){
    event.startdate = '7/31/2016'
  }
  if (event.name == "NodeSchool San Salvador" && event.startdate == '11/25/2017'){
    event.enddate = '11/25/2017'
  }
  if (event.name == "Saint Petersburg Nodeschool" && event.startdate == '10/29/2017'){
    event.enddate = '10/29/2017'
  }
  if (event.name == "NodeSchool PortHarcourt" && event.startdate == '9/3/2018'){
    event.startdate = '3/9/2018'
    event.enddate = '3/10/2018'
  }

  //Format the day and month. e.g "7/7/2017" need to be "07/07/2017"
  var endMonth = ("0" + (new Date(event.enddate).getMonth() + 1)).slice(-2)
  var endDay = ("0" + (new Date(event.enddate).getDate()+1)).slice(-2)
  var endDate
  if (event.enddate != ""){
    endDate = new Date(event.enddate).getFullYear() + '-' + endMonth + '-' + endDay
  } else {
    endDate = ""
  }

  var startMonth = ("0" + (new Date(event.startdate).getMonth() + 1)).slice(-2)
  var startDay = ("0" + (new Date(event.startdate).getDate())).slice(-2)
  var startDate = new Date(event.startdate).getFullYear() + '-' + startMonth + '-' + startDay

  var eventObj = {
    title : event.name,
    start : startDate,
    end : endDate,
    url  : event.website
  };
  return eventObj;
}

window.addEventListener('DOMContentLoaded', init())
