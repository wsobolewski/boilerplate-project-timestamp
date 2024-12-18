// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

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

app.get("/api/", (req, res) => {
  const dt = new Date();
  res.json({ unix: dt.getTime(), utc: dt.toUTCString() });
});

// If date parameter is provided, parse it and return accordingly
app.get("/api/:date", (req, res) => {
  let dateString = req.params.date;
  
  // Check if the string is numeric, then treat as timestamp
  if (/^\d+$/.test(dateString)) {
    const dt = new Date(parseInt(dateString));
    if (isNaN(dt.getTime())) {
      res.json({ error: "Invalid Date" });
    } else {
      res.json({ unix: dt.getTime(), utc: dt.toUTCString() });
    }
  } 
  // Otherwise, treat as date string
  else {
    const dt = new Date(dateString);
    if (isNaN(dt.getTime())) {
      res.json({ error: "Invalid Date" });
    } else {
      res.json({ unix: dt.getTime(), utc: dt.toUTCString() });
    }
  }
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
