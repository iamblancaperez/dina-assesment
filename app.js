var express = require('express');
var path = require('path');
var app = module.exports.app = exports.app = express();

app.use(express.static('dist'))

app.get('/', function (req, res) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.sendFile(path.join(__dirname + '/dist/index.html'));
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

//app.use(require('connect-livereload')());