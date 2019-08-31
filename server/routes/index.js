var express = require('express');
var router = express.Router();
var todos = require('./todos');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/',todos);

module.exports = router;
