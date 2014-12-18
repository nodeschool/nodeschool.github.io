function generateCalendar (eventData) {
  monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]
  weekdays   = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  today      = new Date()
  months = []
  generateAllTheMonths(eventData)

  $.each(eventData, function(i, event){
    appendEvent(event)
  })

  // Highlight today
  $('#' + formattedDate(today)).removeClass('no-event').addClass('today')
  addMonthMenu()
}

function addMonthMenu() {
  $('#calendar-goes-here').prepend('<div id="cal-controls">')
  $('.month-table').each(function(_, table) {
    month = $(table).data('month')
    $('#cal-controls').append('<a class="month-menuitem" data-target="' + month + '" href="#' + month + '">' + month + '</a>')
  })

  $(document).on('click', '.month-menuitem', function(e) {
    $('[data-month]').hide()
    $('[data-month="' + $(this).data('target') + '"]').show()
    $(this).addClass('active').siblings().removeClass('active')
    e.preventDefault()
  })

  // Get current month and click it
  currentMonth = $('[data-target=' + monthNames[(new Date()).getMonth()] + ']')
  if( currentMonth.length ) {
    currentMonth.click()
  } else {
    $('[data-target]').first().click()
  }
}

function appendEvent( event ) {
  eventStartDate = new Date(event.startdate)
  eventEndDate   = new Date(event.enddate)
  eventElement   = $('<div class="event"><a target="_blank" href="' + event.website + '" title="' + event.name + '">' + event.name + '</a></div>')

  // Handle multi-days
  if( eventEndDate.getDate() ) {
    date         = eventStartDate
    spacerNumber = $('#' + formattedDate(eventStartDate)).find('.event').length
    eventElement.addClass('multi-days')

    while( eventEndDate > date ) {
      // If reached end of month, go to first day of the next month
      // Else go to the next day
      if(date == new Date(date.getFullYear(), date.getMonth() + 1, 0)) {
        date == new Date(date.getFullYear(), date.getMonth() + 1, 1)
      } else {
        date = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1 )
      }

      // Add spacer to line up the event
      dateElement = $('#' + formattedDate(date))
      steps = dateElement.find('.event').length
      loopForTimes( spacerNumber - steps, function() {
        dateElement.append('<div class="event spacer">&nbsp;</div>')
      })

      dateElement.removeClass('no-event').append('<div class="event multi-days following-days" title="' + event.name + '"><a target="_blank" href="' + event.website + '">' + event.name + '</a></div>')
    }
  }

  $('#' + formattedDate(eventStartDate)).removeClass('no-event').append(eventElement)
}

function generateAllTheMonths( eventData ) {
  dates  = eventData.map(function(e) { return [e.startdate, e.enddate] })
  dates  = [].concat.apply([], dates).filter(function(n) { return n })
  months = []
  $.each( dates, function(_, date) {
    date = new Date(date)
    if( months.indexOf(date.getMonth()) < 0 ) {
      months.push(date.getMonth())
      generateMonthTable(date)
    }
  })
}

function generateMonthTable( date ) {
  eventMonthName = monthNames[date.getMonth()]
  monthTable     = $('<table cellspacing=0 class="month-table" data-month="' + eventMonthName + '" id="month-' + date.getMonth() + '"></table>')
  monthTableBody = monthTable.append('<tbody>')
  today          = new Date()
  endOfToday     = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 00, 00, 00)
  firstDay       = new Date(date.getFullYear(), date.getMonth(), 1)
  numberOfDays   = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  weekDayNumber  = firstDay.getDay()

  $('#calendar-goes-here').append(monthTable)
  monthTable.before('<h2 data-month="' + eventMonthName + '">' + eventMonthName + ' ' + date.getFullYear() + '</h2>')

  // Add month calendar header
  monthTableBody.append('<tr class="header"></tr>')
  headerRow = monthTableBody.find('.header')
  loopForTimes( 7, function(i) {
    headerRow.append('<td>' + weekdays[i] + '</td>')
  })

  // Add empty days from previous month
  loopForTimes( weekDayNumber - 1, function() {
    getFirstAvailableRow(monthTable).append('<td class="empty"></td>')
  })

  // Filling the month with days
  loopForTimes( numberOfDays, function(daynumber) {
    thisDay = new Date(date.getFullYear(), date.getMonth(), (daynumber + 1))
    id = formattedDate(thisDay)
    pastClass = endOfToday > thisDay ? "past" : ""
    getFirstAvailableRow(monthTableBody).append('<td class="no-event ' + pastClass + '" id=' + id + '><div class=day>'+ (daynumber + 1) +'</div></td>')
  })

  // Add empty days from next month
  lastRow = monthTable.find('tr:last')
  cellsInLastRow = lastRow.find('td').length
  // Check if this is necessary
  if( cellsInLastRow < 7 ) {
    loopForTimes( (7 - cellsInLastRow), function() {
      lastRow.append('<td class="empty"></td>')
    })
  }

}

// Because I don't like ot write for()
function loopForTimes( times, callback ) {
  for( var i=0; i < times; i++ ){
    callback(i)
  }
}

// This is handy: getting the first row with available cell space
function getFirstAvailableRow( table ) {
  row = table.find('tr.days').filter(function(i, thisRow) {
    return ($(thisRow).find('td').length) < 7
  })
  // If no available row, create a new one
  if( row.length == 0 ) {
    table.append('<tr class=days>')
    row = table.find('tr').last()
  }
  return row
}

// Create an unique date string for cell lookup
function formattedDate( date ) {
  return monthNames[date.getMonth()] + '-' + date.getDate()
}
