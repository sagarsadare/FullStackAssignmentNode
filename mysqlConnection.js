'user strict';

var mysql = require('mysql');
var varConst = require('./constants/constants');

//local mysql db connection
var connection = mysql.createConnection({
    host     : varConst.HOST,
    user     : varConst.USER,
    password : varConst.PASSWORD,
    database : varConst.DATABASE
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;