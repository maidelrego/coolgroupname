$(document).ready(function () {
  var feverCheck = $('input#fever.checkbox-input')[0]
  var coughCheck = $('input#cough.checkbox-input')[0]
  var breathCheck = $('input#breath.checkbox-input')[0]
  var noseCheck = $('input#runnyNose.checkbox-input')[0]
  // Getting references to our form and input
  var symptomForm = $('form.form')
  // var allChecks = $('input.checkbox-input')

  symptomForm.on('submit', function (event) {
    event.preventDefault()
    if ($('input:checkbox').filter(':checked').length < 1) {
      $('.required').text('*Must choose at least 1')
      return false
    }
    $('.checkbox').click(function () {
      $('.required').remove()
    })
    $.post('/api/symptoms', {
      fever: feverCheck.checked,
      cough: coughCheck.checked,
      breath: breathCheck.checked,
      runnyNose: noseCheck.checked
    })
      .then(function (data) {
        console.log(data)
        window.location.replace('/members')
      })
  }
  )
})
