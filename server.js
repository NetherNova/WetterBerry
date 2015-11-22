var express = require('express'),
    dbo = require('./lib/dbo');
var app = express();

var Config = require('./config');
conf = new Config();
 
app.use(express.static('public'));
app.use(express.static('public/images'));

 var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
      
    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};

// all environments
app.set('title', conf.title);
app.use(allowCrossDomain);
dbo.init();

app.get('/sensors', dbo.sensors);
app.get('/images', dbo.images);

app.listen(8000, function() {
	console.log("Server started at port 8000");
});
