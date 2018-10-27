// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api/timestamp/:date_string?', function(req, res) {
  console.log(req.params.date_string);
  var date = "";
  if (req.params.date_string === undefined) {
    console.log("date string is empty");
    date = new Date();    
  } else if (req.params.date_string.includes('-')) {
    console.log("date string has - in it");
    date = new Date(req.params.date_string);
  } else {
    console.log("date string does not have -");
    var input = parseInt(req.params.date_string, 10);
    // if date_string is not a number parseInt returns NaN
    // new Date(NaN); returns Invalid Date
    date = new Date(input);
  }
  res.json({"unix": date.getTime(), "utc": date.toUTCString()});
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
