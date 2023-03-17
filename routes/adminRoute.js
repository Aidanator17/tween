const express = require('express');
const router = express.Router();
const { ensureAuthenticated, ensureAdmin } = require("../middleware/checkAuth");
const db = require('../controllers/databaseGrab')
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// define a route handler
router.get('/', ensureAuthenticated, (req, res) => {
  // render a view using EJS
  res.redirect('/');
});

router.get('/userlookup', ensureAdmin, async (req, res) => {
    let users = undefined
    res.render('admin/userlookup', {title:'User Lookup',currentUser:req.user, users})
});

router.post('/userlookup', urlencodedParser, async (req, res) => {
    let users = await db.vaultLookup(req.body.method,req.body.value)
    res.render('admin/userlookup', {title:'User Lookup',currentUser:req.user, users})
});

module.exports = router;