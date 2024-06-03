/* eslint-disable no-undef */
const mysql = require("mysql");
require("dotenv").config();

const conn = mysql.createConnection({
	host: "localhost",
	user: process.env.user,
	password: process.env.password,
	database: process.env.database,
});

conn.connect((err) => {
	if (err) throw err;
	console.log("connected to the database");
});

exports.dbUpdate = (params, cb) => {
	conn.query(params.query, params, (err, result) => {
		if (err) throw err;
		return cb(null, result);
	});
};

exports.dbInsert = (params, cb) => {
	conn.query(params.query, params, (err, result) => {
		if (err) throw err;
		return cb(null, result);
	});
};

module.exports = conn;
