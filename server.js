var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  var str = "uppercase";
  var res2 = str.toUpperCase();
  res.write(res2);
  console.log(res)
  res.end();
}).listen(8080);