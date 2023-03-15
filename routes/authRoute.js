const express = require('express');
const router = express.Router();
const { forwardAuthenticated, ensureAuthenticated } = require("../middleware/checkAuth");
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
  res.render('auth/login',{title:"Login", currentUser:req.user});
});

router.post('/login', urlencodedParser, passport.authenticate('local', { failureRedirect: '/auth/login', failureMessage: true }), async function(req, res) {
    console.log("LOGIN -",req.user.first_name,req.user.last_name)
    res.redirect('/');
  });

  router.get('/signup', forwardAuthenticated, (req, res) => {
    // render a view using EJS
  //   console.log(req.session.messages)
    res.render('auth/signup',{title:"Sign Up", currentUser:req.user});
  });

  router.get('/logout', ensureAuthenticated, (req,res) => {
    console.log("LOGOUT -",req.user.first_name,req.user.last_name)
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  })

module.exports = router;