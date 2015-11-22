var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/sensors');
Schema = mongoose.Schema;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var fs = require('fs');

mongoose.model('SensorData', new Schema({
    	temp1 : Number,
    	temp2 : Number,
    	hum : Number,
		press : Number,
		alt : Number,
		sealevel_press : Number,
		date : Date,
		pic : String
	}), 'sensorData');

mongoose.model('Images', new Schema({
    	pic : Buffer,
	}, {id : true, autoIndex : false }  
        ), 'images');

var sensors =  mongoose.model('SensorData');
var images = mongoose.model('Images');

exports.init = function (req, res)
{
	db.once('open', function (callback) {
		console.log('Database connection established');	
	});
}

exports.sensors = function(req, res)
{
	sensors.find({}, null, {sort : {date : 1}}, 
            function(err, data) { res.json(data) });
}

exports.images = function(req, res)
{
	images.find({}, function(err, data) { //add sorted to get latest pic
	data.forEach(function(d)
        {
            console.log(d.id);
            //TODO: Check if file already exists (OID) -> don't write
            fs.writeFile("public/images/" + d.id + ".png", d.pic, function(err) {
            if(err) {
        	return console.log(err);
            }}
            );
        })	 
	});
	res.json({"status" : "okay"});
}
