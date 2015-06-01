var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var models = require('./models');


var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(express.static(__dirname + '/public'));

app.get('/angular/', function (req, res) {
  res.sendfile('./public/index.html');
});

app.get('/angular/jelenletek', function (req, res) {
  console.log("app-get-req: " + req);
  models.Jelenlet.find(function (err, jelenletek) {
    console.log("jelenletek: " + jelenletek);
    // if there is an error retrieving, send the error. nothing after res.send(err) will execute
    if (err)
      res.send(err);

    res.json(jelenletek); // return all todos in JSON format
    console.log("app-get-res: " + res);
  });
});

app.post('/angular/jelenletek', function (req, res) {
  console.log("post-text: " + req.body.text);
  // create a todo, information comes from AJAX request from Angular
  models.Jelenlet.create({
    name: req.body.text,
    done: false
  }, function (err, jelenlet) {
    if (err)
      res.send(err);

    // get and return all the todos after you create another
    models.Jelenlet.find(function (err, jelenletek) {
      if (err)
        res.send(err);
      res.json(jelenletek);
    });
  });

});

app.delete('/angular/jelenletek/:jelenlet_id', function (req, res) {
  models.Jelenlet.remove({
    id: req.params.jelenlet_id
  }, function (err, jelenlet) {
    if (err)
      res.send(err);

    // get and return all the todos after you create another
    models.Jelenlet.find(function (err, jelenletek) {
      if (err)
        res.send(err);
      res.json(jelenletek);
    });
  });
});

module.exports = app;