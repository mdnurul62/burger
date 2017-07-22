// Import MySQL connection.
var connection = require("../config/connection.js");

// Helper function for SQL syntax.
// Let's say we want to pass 3 values into the mySQL query.
// In order to write the query, we need 3 question marks.
// The above helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
// ["?", "?", "?"].toString() => "?,?,?";
function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
  var arr = [];

  // loop through the keys and push the key/value as a string int arr
  for (var key in ob) {
    var value = ob[key];
    // check to skip hidden properties
    if (ob.hasOwnProperty(key)) {
      // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
      //if (typeof value === "string" && value.indexOf(" ") >= 0) {
        //value = "'" + value + "'";
      //}
      // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
      // e.g. {sleepy: true} => ["sleepy=true"]
      arr.push(key + "=" + value);
    }
  }

  // translate array of strings to a single comma-separated string
  return arr.toString();
}

// Object for all our SQL statement functions.
var orm = {
	all: function (tableInput, cb) {
		var queryString = 'SELECT * FROM ' + tableInput + ';';
		connection.query(queryString, function (err, result) {
			if (err) throw err;
			cb(result);
		});
	},

	create: function (table, column, values, cb) {
		var columnString = column.toString();
		var valuesString = "'"+values +"'";
		var queryString = 'INSERT INTO ' + table + ' (' + columnString + ') ' + 'VALUES(' + "'" + values + "'" + ');'

		connection.query(queryString, values, function (err, result) {
			if (err) throw err;
			cb(result);
		});
	},
	update: function  (table, column, newValue, condition, cb) {
		var queryString = 'UPDATE ' + table + ' SET ' + column + '=' + newValue + ' WHERE ' + condition + ';'

		connection.query(queryString, function (err, result) {
			if (err) throw err;
			cb(result);
		});
	},


	delete: function (table, condition, cb) {
		var queryString = 'DELETE FROM ' + table;
		queryString = queryString + ' WHERE ';
		queryString = queryString + condition;

		connection.query(queryString, function (err, result) {
			if (err) throw err;
			cb(result);
		});
	}
};

// Export the orm object for the model (cat.js).
module.exports = orm;
