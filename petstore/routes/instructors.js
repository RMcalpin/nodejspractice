var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/instructors', function(req, res, next) {
  res.send('hello from instructors');
});

module.exports = router;