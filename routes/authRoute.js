const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  // render a view using EJS
  res.redirect('/auth/login');
});

router.get('/login', (req, res) => {
  // render a view using EJS
  res.render('login',{title:"Login"});
});

module.exports = router;