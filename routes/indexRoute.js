const express = require('express');
const router = express.Router();
const db = require('../controllers/databaseGrab')
var bodyParser = require('body-parser')
const { ensureAuthenticated, ensureAdmin } = require("../middleware/checkAuth");

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// define a route handler
router.get('/', ensureAuthenticated, async (req, res) => {
  let posts = await db.getPosts(req.user.id)
  res.render('index', { posts, title: 'Tween' });
});

router.get('/createpost', ensureAuthenticated, async (req, res) => {
  res.render('newpost', { title: 'Tween' });
});

router.post('/createpost', urlencodedParser, async (req, res) => {
  // console.log(req.body.content)
  await db.createPost(req.user.id, req.body.content)
  res.redirect('/')
});

module.exports = router;