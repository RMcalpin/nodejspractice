var express = require('express');
var router = express.Router();

/* GET home page. */
//router.get('/', function(req, res, next) {
//  res.render('index', { title: 'Express' });
//});

const sections = [
  {id:0, section1:"Intro to Programming"},
  {id:1, section2:"Data Structures"},
  {id:2, section3:"Computer Organization I"},
  {id:3, section4:"Internet-based Programming"},
  {id:4, section5:"Algorithms and Data Structures"},
]

router.get('/', function (req, res, next) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write("<h1 style='color:green; text-align:center;'>Sections</h1>");
  return res.end();
});

//app.listen(port, () => {
//  console.log(`Example app listening on port ${port}`)
//})

module.exports = router;
