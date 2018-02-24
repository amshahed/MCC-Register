var express= require('express');
var app = express();
var dotenv = require('dotenv');
var mongo = require('mongodb').MongoClient;
var mongourl =  'mongodb://mccmist:mccmist@ds243768.mlab.com:43768/mistcomputerclub';

var ObjectId = require('mongodb').ObjectID;

dotenv.config({verbose:true});
var port = process.env.PORT || 8080;

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('Views'));

app.post('/register',function(req,res){
	var obj = {};
	obj["name"] = req.body.name.toUpperCase();
	obj["roll"] = req.body.roll;
	obj["email"] = req.body.email;
	obj["phoneno"] = req.body.phoneno;
	obj["level"] = req.body.level;
	obj["dept"] = req.body.dept;
	obj["gender"] =  req.body.gender;
	for(key in obj){
		if(!obj[key]){
			res.send("mara khao tumi");
			return;
		}
	}

	mongo.connect(mongourl,function(err,db){
		if(err){
			console.log(err);
			res.send("errrrr")
			return;
		}
		var collection = db.collection('members');
		collection.update( { roll : obj.roll , dept : obj.dept } , obj , {upsert : true},function(err,documents){
			console.log(documents);
			if(err) res.send("error");
			res.send("OK");
		});

	})


});

app.post('/getdata',function(req,res){
	var id = req.body.id;
	if(!id){
		res.send("error");
	}
	mongo.connect(mongourl , function(err,db){
		if(err) res.send("error");
		var collection =  db.collection("members");
		collection.find( {roll : id}).toArray(function(err,documents){
			if(err) res.send("error");
			else if(documents.length == 0) res.send("not found");
			else {
				res.send(documents[0]);
			}
		});
	});
});	

app.get('/showform',function(req,res){
	res.sendFile(process.cwd() + '/Views/showform.html');
});




app.get('/',function(req,res) {
	res.sendFile(process.cwd() + '/Views/index.html');
});




app.listen(port,function(){
	console.log('Port is listening');
});