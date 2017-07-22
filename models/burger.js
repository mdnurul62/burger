
var orm = require('../config/orm.js');
//Burger model
var burger = {
	all: function (cb) {     
		orm.all('burgers', function (res) {
			cb(res);
		});
	},
	// cols and vals are arrays
	create: function (column, values, cb) {
		orm.create('burgers', column, values, function (res) {
			cb(res);
		});
	},
	update: function (column, newValue, condition, cb) {
		orm.update('burgers', column, newValue, condition, function (res) {
			cb(res);
		});
	},
	delete: function (condition, cb) {
		orm.delete('burgers',condition, function (res) {
			cb(res);
		});
	}
};


module.exports = burger;