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

  function addCommas (nStr) {
    nStr += ''
    var x = nStr.split('.')
    var x1 = x[0]
    var x2 = x.length > 1 ? '.' + x[1] : ''
    var rgx = /(\d+)(\d{3})/
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + ',' + '$2')
    }
    return x1 + x2
  }
  var queryURL = 'https://covidtracking.com/api/us/daily'

  $.ajax({
    url: queryURL,
    method: 'GET'
  }).then(function (response) {
    console.log(response)
    var pos = addCommas(response[0].positive)
    var posIncrease = addCommas(response[0].positiveIncrease)
    var neg = addCommas(response[0].negative)
    var negIncrease = addCommas(response[0].negativeIncrease)
    var deaths = addCommas(response[0].death)
    var hospital = addCommas(response[0].hospitalized)

    $('.pos').html(pos)
    $('.posIncrease').html('+ ' + posIncrease)
    $('.neg').html(neg)
    $('.negIncrease').html('+ ' + negIncrease)
    $('.deaths').html(deaths)
    $('.hospitalized').html(hospital)
  })
  // HOSPITAL API
  // get users current position
  function getLocation () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(logPosition)
    } else {
      $('.errorOption').hide()
    }
  }
  // logs cooridantes and passes to fetch for api.
  function logPosition (position) {
    localStorage.setItem('latitude', position.coords.latitude)
    localStorage.setItem('longitude', position.coords.longitude)

    var lat = localStorage.latitude
    var long = localStorage.longitude

    console.log(lat, long)
    fetch(
      `https://api.foursquare.com/v2/venues/explore?client_id=P3NLBCAU42TU4OS2SATALIQNS0X3BVOGWEJMQDD5FNMUJ0EU&client_secret=LQDM0HB2OFTGVHOY0SNDHD4BL2X2TEI5XZC5YT0TYLLJ0LTE&v=20180323&limit=5&ll=${lat},${long}&query=emergency`)
      .then(res => res.json())
      .then(data => fiveHospitals(data))
      .catch(function (err) {
        throw err
        // Code for handling errors
      })
  }
  function fiveHospitals (data) {
    var arrayHospitals = (data.response.groups[0].items)
    console.log(arrayHospitals)
    var address = arrayHospitals[0].venue.location.formattedAddress[0]
    var city = arrayHospitals[0].venue.location.formattedAddress[1]
    var address2 = arrayHospitals[1].venue.location.formattedAddress[0]
    var city2 = arrayHospitals[1].venue.location.formattedAddress[1]
    var distance1 = arrayHospitals[0].venue.location.distance * 0.00062137
    var distance2 = arrayHospitals[1].venue.location.distance * 0.00062137
    $('.hospital1').append(arrayHospitals[0].venue.name)
    $('.address1').html(address + ' ')
    $('.city1').html(city + ' ')
    $('.distance1').html(distance1.toFixed(2) + ' miles away')
    $('.hospital2').append(arrayHospitals[1].venue.name)
    $('.address2').html(address2 + ' ')
    $('.city2').html(city2 + ' ')
    $('.distance2').html(distance2.toFixed(2) + ' miles away')
  }
  getLocation()
})
