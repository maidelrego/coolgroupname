$(document).ready(function () {
  // This file just does a GET request to figure out which user is logged in
  $.get('/api/user_data').then(function (data) {
    console.log(data, 'members')

    // UTC converter to local date and time
    var date = moment.utc().format('YYYY-MM-DD HH:mm:ss')
    var stillUtc = moment.utc(date).toDate(data.updatedAt)
    var local = moment(stillUtc).local().format('MM-DD-YYYY')

    //  places to display data on dash-board
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

    if (data.runnyNose === 'true') {
      var noseList = $('#list')
      var noseLi = $('<li>')
      noseLi.text('Runny Nose')
      noseList.append(noseLi)
    }
  })
  //  function to add commas to the covid data
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
    $('.posIncrease').html('+' + posIncrease)
    $('.neg').html(neg)
    $('.negIncrease').html('+ ' + negIncrease)
    $('.deaths').html(deaths)
    $('.hospitalized').html(hospital)
  })
})
