var express = require('express');
var app = express();
// var pg = require('pg');
var bodyParser = require('body-parser');
var moment = require('moment');
moment().format();

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
	var mom = moment(text);
	console.log("-------------------------------------" + mom + "-------------------------------------")

	var info = text.trim().split(/\s+/);
	var what = "nothing";
	var where = "nowhere";
	var when = "never";
	var link = "nowhere.com";
	if (info.length == 4){
		what = info[0];
		where = info[1];
		when  = info[2];
		link = info[3];
	}

    response.send("What: *" + what + "* Where: *" + where + "* When: *" + when + "* <http://" + link + "|LINK>  :transcend:");
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


