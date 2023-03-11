const express = require('express');
const router = express.Router();
const db = require('../controllers/databaseGrab')
var bodyParser = require('body-parser')

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// define a route handler
router.get('/', async (req, res) => {
  let posts = await db.getPosts(390)
  res.render('index', { posts, title: 'Tween' });
});

router.get('/createpost', async (req, res) => {
  res.render('newpost', { title: 'Tween' });
});

router.post('/createpost', urlencodedParser, async (req, res) => {
  // console.log(req.body.content)
  await db.createPost(1, req.body.content)
  res.redirect('/')
});

module.exports = router;