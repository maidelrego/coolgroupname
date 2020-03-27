$(document).ready(function () {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get('/api/user_data').then(function (data) {
    console.log(data, 'members')
    $('.member-name').text(data.firstName)
    $('.member-lastname').text(data.lastName)
    $('.member-email').text(data.email)

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
})
