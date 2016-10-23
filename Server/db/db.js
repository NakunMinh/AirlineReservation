var mysql = require("mysql");

//Tao ket noi database
var pool = mysql.createPool({
	host: "localhost",
	user: "root",
	password: null,
	database: "test"
});

module.exports = pool;