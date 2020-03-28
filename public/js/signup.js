$(document).ready(function () {
  // Getting references to our form and input
  var signUpForm = $('form.signup')
  var userName = $('input#firstName')
  var userLast = $('input#lastName')
  var emailInput = $('input#email-input')
  var passwordInput = $('input#password-input')

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on('submit', function (event) {
    event.preventDefault()
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      firstName: userName.val().trim(),
      lastName: userLast.val().trim()
    }

    if (!userData.email || !userData.password) {
      return
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.email, userData.password, userData.firstName, userData.lastName)
    emailInput.val('')
    passwordInput.val('')
    userName.val('')
    userLast.val('')
  })

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser (email, password, firstName, lastName) {
    $.post('/api/signup', {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName
    })
      .then(function (data) {
        window.location.replace('/members')
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr)
  }

  function handleLoginErr () {
    $('#account').show()
    $('#account').fadeOut(5500)
  }
})
