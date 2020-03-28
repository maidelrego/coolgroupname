$(document).ready(function () {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get('/api/user_data').then(function (data) {
    // eslint-disable-next-line no-undef
    var date = moment.utc().format('YYYY-MM-DD HH:mm:ss')
    // eslint-disable-next-line no-undef
    var stillUtc = moment.utc(date).toDate(data.updatedAt)
    // eslint-disable-next-line no-undef
    var local = moment(stillUtc).local().format('MM-DD-YYYY')

    $('.member-name').text(data.firstName)
    $('.member-lastname').text(data.lastName)
    $('.member-email').text(data.email)
    $('td#date').text(local)

    if (data.fever === 'true') {
      var feverList = $('#list')
      var feverLi = $('<li>')
      feverLi.text('Fever')
      feverList.append(feverLi)
    }

    if (data.cough === 'true') {
      var coughList = $('#list')
      var coughLi = $('<li>')
      coughLi.text('Coughing')
      coughList.append(coughLi)
    }

    if (data.breath === 'true') {
      var breathList = $('#list')
      var breathLi = $('<li>')
      breathLi.text('Shortness of Breath')
      breathList.append(breathLi)
    }

    if (data.blueFace === 'true') {
      var blueList = $('#list')
      var blueLi = $('<li>')
      blueLi.text('Blue Face')
      blueList.append(blueLi)
    }
  })
})
