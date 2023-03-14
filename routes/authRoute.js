const express = require('express');
const router = express.Router();
const { forwardAuthenticated } = require("../middleware/checkAuth");
const passport = require("../middleware/passport");
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/', forwardAuthenticated, (req, res) => {
  // render a view using EJS
  res.redirect('/auth/login');
});

router.get('/login', forwardAuthenticated, (req, res) => {
  // render a view using EJS
//   console.log(req.session.messages)
  res.render('login',{title:"Login"});
});

router.post('/login', urlencodedParser, passport.authenticate('local', { failureRedirect: '/auth/login', failureMessage: true }), async function(req, res) {
    console.log("LOGIN -",req.user.first_name,req.user.last_name)
    res.redirect('/');
  });

module.exports = router;