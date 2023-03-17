const express = require('express');
const router = express.Router();
const { ensureAuthenticated, ensureAdmin } = require("../middleware/checkAuth");
const db = require('../controllers/databaseGrab')

// define a route handler
router.get('/', ensureAuthenticated, (req, res) => {
  // render a view using EJS
  res.redirect('/');
});

router.get('/:id', ensureAuthenticated, async (req, res) => {
  let searchUser = await db.getUserById(req.params.id)
  searchUser.posts = await db.getUserPostsById(searchUser.id)
  let followinfo = await db.getFollowersAndFollowing(searchUser.id)
  searchUser.followers = followinfo.Followers
  searchUser.following = followinfo.Following
  // console.log(searchUser)

  res.render('user/userprofile', {title:searchUser.username+"'s Profile",currentUser:req.user, searchUser });
});

module.exports = router;