
//Create all the functions that will do the routing for app, and the logic of each route.

var express = require('express');

var router = express.Router();
//Import the model (burger.js) to use its database functions.
var burgers = require('../models/burger.js');

module.exports = function(app) {
//Create all our routes and set up logic within those routes where required.
app.get('/', function (req, res) {
	res.redirect('/burgers');
});

app.get('/burgers', function (req, res) {
	burgers.all(function (data) {
		var hbsObject = { burgers: data };
		console.log(hbsObject);
		res.render('index', hbsObject);
	});
});

app.post('/burgers/create', function (req, res) {
	burgers.create(['burger_name'], [req.body.name], function () {
		res.redirect('/burgers');
	});
});

app.put('/burgers/update/:id', function (req, res) {
	var condition = 'id = ' + req.params.id;
	console.log("condition", condition);
	burgers.update({devoured: req.body.devoured}, condition, function () {
		res.redirect('/burgers');
	});
});

app.delete('/burgers/delete/:id', function (req, res) {
	var condition = 'id = ' + req.params.id;

	burgers.delete(condition, function () {
		res.redirect('/burgers');
	});
});
}

