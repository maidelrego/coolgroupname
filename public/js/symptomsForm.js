$(document).ready(function () {
  // Getting references to our form and input
  var symptomForm = $('#symptomForm').val()
  var feverCheck = $('#fever').val()
  var coughCheck = $('#cough').val()
  var breathCheck = $('#breath').val()
  var blueCheck = $('#blueFace').val()
  
  // When the signup button is clicked, we validate the email and password are not blank
  symptomForm.on('submit', function (event) {
    event.preventDefault()
    var userData = {
      fever: feverCheck.val().trim(),
      password: passwordInput.val().trim()
    }

    if (!userData.email || !userData.password) {
      return
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.email, userData.password)
    emailInput.val('')
    passwordInput.val('')
  })

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser (email, password) {
    $.post('/api/signup', {
      email: email,
      password: password
    })
      .then(function (data) {
        window.location.replace('/members')
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr)
  }

  function handleLoginErr (err) {
    $('#alert .msg').text(err.responseJSON)
    $('#alert').fadeIn(500)
  }
})
