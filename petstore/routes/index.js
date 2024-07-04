var express = require('express');
var fs = require('fs');
var router = express.Router();
const app = express()
const port = 3010

/* GET home page. */
//router.get('/', function(req, res, next) {
//  res.render('index', { title: 'Express' });
//});

router.get('/', function (req, res, next) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write("Hello from /");
  return res.end();
});

//app.listen(port, () => {
//  console.log(`Example app listening on port ${port}`)
//})

module.exports = router;
