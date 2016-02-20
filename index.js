var express = require('express');
var app = express();
// var pg = require('pg');
var bodyParser = require('body-parser');
var moment = require('moment');

app.set('port', (process.env.PORT || 5000));

// app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  var result = ''
  response.send(result);
});

app.post('/event', function(request, response) {
	console.log("-------------------------------------" + request.body.text + "-------------------------------------")

	var text = request.body.text;

	var info = text.trim().split(/\s+/);
	var output = "";
	var date_info = "";

	for (i : info){
		if (moment(i).isValid()){
			date_info += (i + " ");
		}
	}
	
	if (info.length >= 3){
		output += ("What: *" + info[0] + "*\n");	//what
		output += ("Where: *" + info[1] + "*\n")	//where
		output += ("When: *" + info[2] + "*")		//date
	}
	if (info.length >= 4){
		output += (" *" + info[3] + "*")			//time
	}
	if (info.length >= 5){
		output += ("<http://" + info[4] + "|LINK>");
	}

	var mom = moment(date_info);
	console.log(mom.get('year'));
	console.log(mom.get('month'));  // 0 to 11
	console.log(mom.get('date'));
	console.log(mom.get('hour'));
	console.log(mom.get('minute'));

	console.log("\n\n-------------------------------------" + mom.format("LLLL") + "-------------------------------------");

    response.send(output);
});


app.post('/api/users', function(req, res) {
    var user_id = req.body.id;

    res.send(user_id);
});

// app.get('/db', function (request, response) {
//   pg.connect(process.env.DATABASE_URL, function(err, client, done) {
//     client.query('SELECT * FROM test_table', function(err, result) {
//       done();
//       if (err)
//        { console.error(err); response.send("Error " + err); }
//       else
//        { response.render('pages/db', {results: result.rows} ); }
//     });
//   });
// })

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


