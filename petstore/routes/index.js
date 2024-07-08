var express = require('express');
var router = express.Router();

/* GET home page. */
//router.get('/', function(req, res, next) {
//  res.render('index', { title: 'Express' });
//});

const sections = [
  {id:0, section:"Intro to Programming"},
  {id:1, section:"Data Structures"},
  {id:2, section:"Computer Organization I"},
  {id:3, section:"Internet-based Programming"},
  {id:4, section:"Algorithms and Data Structures"},
]

const instructors = [
  {id:0, instructor:"Zhang"},
  {id:1, instructor:"Maniccam"},
  {id:2, instructor:"Bahorski"},
  {id:3, instructor:"Evett"},
  {id:4, instructor:"Panja"},
]

function getSection(req, res, next) {
  var sec = sections[req.params.id];
  if (sec) {
    req.sec = sec;
    next();
  } else {
    next(new Error('Failed to load user ' + req.params.id));
  }
}

function getInstructor(req, res, next) {
  var inst = instructors[req.params.id];
  if (inst) {
    req.inst = inst;
    next();
  } else {
    next(new Error('Failed to load user ' + req.params.id));
  }
}

router.get('/index/:id', getSection, function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write("<h1 style='color:green; text-align:center;'>Sections</h1>");
  res.write("This section is " + req.sec.section);
  return res.end();
});

router.get('/instructors/:id', getInstructor, function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write('hello from instructors<br>');
  res.write("This instructor is " + req.inst.instructor);
  return res.end();
});

//app.listen(port, () => {
//  console.log(`Example app listening on port ${port}`)
//})

module.exports = router;
