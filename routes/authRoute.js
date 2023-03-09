const express = require('express');
const router = express.Router();

// define a route handler
router.get('/', (req, res) => {
  // render a view using EJS
  res.redirect('/');
});

module.exports = router;