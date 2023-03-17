const express = require('express');
const router = express.Router();
const db = require('../controllers/databaseGrab')
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })
const { ensureAuthenticated, ensureAdmin } = require("../middleware/checkAuth");


// define a route handler
router.get('/', ensureAuthenticated, async (req, res) => {
  let posts = await db.getPosts(req.user.id)
  res.render('index/index', { posts, title: 'Tween', currentUser:req.user });
});

router.get('/createpost', ensureAuthenticated, async (req, res) => {
  res.render('index/newpost', { title: 'Tween', currentUser:req.user });
});

router.post('/createpost', urlencodedParser, async (req, res) => {
  // console.log(req.body.content)
  await db.createPost(req.user.id, req.body.content)
  res.redirect('/')
});

module.exports = router;