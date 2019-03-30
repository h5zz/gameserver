var https = require('https');
var express = require('express');

var fs = require('fs');

var options = {
  key: fs.readFileSync('../shared/server.key'),
  cert: fs.readFileSync('../shared/server.crt')
};

var app = express();

// app.use(express.static('public'));
// app.configure(function () {
//   app.use(express.methodOverride());
//   app.use(express.bodyParser());
//   app.use(app.router);

// });

app.set('view engine', 'jade');
app.set('views', __dirname + '/public');
app.set('view options', { layout: false });
app.set('basepath', __dirname + '/public');

// app.configure('development', function () {
//   app.use(express.static(__dirname + '/public'));
//   app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
// });
let env = process.env.NODE_ENV || 'development';

let errorhandler = express.errorHandler;

if('development' == env){
  app.use(express.static(__dirname + '/public'));
  app.use(errorhandler({log:false}));
}


if('production' == env) {
  var oneYear = 31557600000;
  app.use(express.static(__dirname + '/public', { maxAge: oneYear }));
  app.use(errorhandler());
};



//var httpsServer = https.createServer(options, app);

app.listen(3001, () => {
  console.log("Web server has started.");
});