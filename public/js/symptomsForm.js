$(document).ready(function () {
  // Getting references to our form and input
  var symptomForm = $('form.form')
  var feverCheck = $('input#fever.checkbox-input')[0]
  var coughCheck = $('input#cough.checkbox-input')[0]
  var breathCheck = $('input#breath.checkbox-input')[0]
  var blueCheck = $('input#blueFace.checkbox-input')[0]

  // When the signup button is clicked, we validate the email and password are not blank
  symptomForm.on('submit', function (event) {
    event.preventDefault()
    console.log('Fever?= ' + feverCheck.checked)
    console.log('Cough?= ' + coughCheck.checked)
    console.log('Shortness of breath?= ' + breathCheck.checked)
    console.log('blue face?= ' + blueCheck.checked)
    // Does a post to the signup route. If successful, we are redirected to the members page
    // Otherwise we log any errors

    $.post('/api/symptoms', {
      fever: feverCheck.checked,
      cough: coughCheck.checked,
      breath: breathCheck.checked,
      blueFace: blueCheck.checked
    })
      .then(function (data) {
        console.log(data)
        window.location.replace('/members')
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr)

    function handleLoginErr (err) {
      $('#alert .msg').text(err.responseJSON)
      $('#alert').fadeIn(500)
    }
  }
  )
})
