$(document).ready(function () {
  // This file just does a GET request to figure out which user is logged in
  $.get('/api/user_data').then(function (data) {
    // console.log(data)
    // and updates the HTML on the page
    $('.member-name').text(data.firstName)
    $('.member-lastname').text(data.lastName)
    $('.member-email').text(data.email)
    $('div#time').text(data.updatedAt)
    // $('div#symp').html(symptoms)
  })
})
