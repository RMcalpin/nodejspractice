var express = require('express');
var router = express.Router();

const instructors = [
  {id:0, instructor1:"Zhang"},
  {id:1, instructor2:"Maniccam"},
  {id:2, instructor3:"Bahorski"},
  {id:3, instructor4:"Evett"},
  {id:4, instructor5:"Panja"},
]

/* GET users listing. */
router.get('/instructors', function(req, res, next) {
  res.send('hello from instructors');
});

module.exports = router;