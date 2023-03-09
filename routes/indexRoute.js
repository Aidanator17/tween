const express = require('express');
const router = express.Router();

// define a route handler
router.get('/', (req, res) => {
  // render a view using EJS
  res.render('index', { title: 'My Page' });
});

module.exports = router;