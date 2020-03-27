// Requiring our models and passport as we've configured it
var db = require('../models')
var passport = require('../config/passport')
var isAuthenticated = require('../config/middleware/isAuthenticated')

module.exports = function (app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error

  app.post('/api/symptoms', isAuthenticated, function (req, res) {
    console.log(req.body.fever)
    var data = {
      fever: req.body.fever,
      cough: req.body.cough,
      breath: req.body.breath,
      blueFace: req.body.blueFace
    }
    var where = {

      where: {
        id: req.user.id
      }
    }
    db.User.update(data, where)
      .then(function () {
        res.redirect('/api/members')
      })
      .catch(function (err) {
        console.error(JSON.stringify(err), data, where)
        console.trace()
        res.status(401).json(err)
      })
  })

  app.get('/api/members', isAuthenticated, function (req, res) {
    res.json({
      email: req.user.email,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      id: req.user.id
    })
  })

  app.post('/api/login', passport.authenticate('local'), function (req, res) {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    })
  })

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post('/api/signup', function (req, res) {
    db.User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password
    })
      .then(function () {
        res.redirect(307, '/api/login')
      })
      .catch(function (err) {
        res.status(401).json(err)
      })
  })

  // Route for logging user out
  app.get('/logout', function (req, res) {
    req.logout()
    res.redirect('/')
  })

  // Route for getting some data about our user to be used client side
  app.get('/api/user_data', isAuthenticated, function (req, res) {
    db.User.findAll({
      where: {
        id: req.user.id
      }
    }).then(data => {
      res.json(data[0])
    })
  })
}
