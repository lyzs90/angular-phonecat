/*--------
  Set Up
--------*/
var path = require('path');
var express = require('express');                               
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override'); 

/* -------------
  Configuration
---------------*/
var app = express();

// set the static files location /public/img will be /img for users
app.use(express.static(path.resolve(__dirname, 'app')));       

// log every request to the console          
app.use(morgan('dev'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({'extended':'true'}));       

// parse application/json     
app.use(bodyParser.json());               

// parse application/vnd.api+json as json                      
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 

// simulate DELETE and PUT (express4)
app.use(methodOverride());

/*------------
  Application
-------------*/
// load the single view file (angular will handle the page changes on the front-end)
app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'app/index.html'));
});

/*--------------------------------------
  Listen (start app with node server.js)
----------------------------------------*/
app.listen(8000);
console.log('Listening on http://localhost:8000');
