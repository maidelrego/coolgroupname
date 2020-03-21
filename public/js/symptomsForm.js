$(document).ready(function () {
  // Getting references to our form and input
  var symptomForm = $('#symptomForm').val()
  var feverCheck = $('#fever').is(':checked')
  var coughCheck = $('#cough').val()
  var breathCheck = $('#breath').val()
  var blueCheck = $('#blueFace').val()

  // When the signup button is clicked, we validate the email and password are not blank
  symptomForm.on('submit', function (event) {
    event.preventDefault()

    // Does a post to the signup route. If successful, we are redirected to the members page
    // Otherwise we log any errors

    $.post('/api/symptoms', {
      fever: feverCheck,
      cough: coughCheck,
      breath: breathCheck,
      blueFace: blueCheck
    })
      .then(function (data) {
        console.log(data)
        window.location.replace('/members')
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch()
  })
})
