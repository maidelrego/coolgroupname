$(document).ready(function () {
  // Getting references to our form and input
  var signUpForm = $('form.signup')
  var userName = $('input#firstName')
  var userLast = $('input#lastName')
  var emailInput = $('input#email-input')
  var passwordInput = $('input#password-input')
  //  password validation
  $(function () { $('input,select,textarea').jqBootstrapValidation() })

  $('#password-input').password({

    // custom messages

    shortPass: 'Your password is too short',

    steps: {
      13: 'Insecure: try adding Uppercase letters',

      33: 'Weak: try combining letters & numbers',

      67: 'Medium: try using special characters',

      94: 'Strong password'

    },

    // show text
    showText: true,

    // enable animation
    animate: true,
    animateSpeed: 'fast',

    // whether to check for partials in field
    fieldPartialMatch: true,

    // minimum length
    minimumLength: 6,

    // closest selector
    closestSelector: 'div',

    // use the old colorbar image
    useColorBarImage: true,

    // set custom rgb color ranges for colorbar
    customColorBarRGB: {
      red: [0, 240],
      green: [0, 240],
      blue: 10
    }
  })
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

  function handleLoginErr (err) {
    $('#alert .msg').text(err.responseJSON)
    $('#alert').fadeIn(500)
  }
})
