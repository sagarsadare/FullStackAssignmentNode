
'use strict'
var app = require('./server');
var http = require('http').Server(app);
var url = require('url');
var port = '6060';

app.set('port', port);
http.setTimeout(10*600*1000); // 10 * 60 seconds * 1000 msecs
http.listen(app.get('port'),() => {
    console.log(`server on port ${app.get('port')}`);
});