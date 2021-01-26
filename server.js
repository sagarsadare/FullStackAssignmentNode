var express = require('express');
var bodyParser = require('body-parser');
const cors = require('cors');
app = express();
var http = require('http').Server(app);
var v8= require('v8');
var multer = require('multer');
var fs = require('fs');
var accessToken = 'SagarTempToken!@#';
path = require('path');


app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, httpx-thetatech-accesstoken,accesstoken');

    if ( req.method === 'OPTIONS') {
        //respond with 200
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, httpx-thetatech-accesstoken,accesstoken');
        res.sendStatus(204);
    } 
    else {
        //move on
        next();
    }
});

var appRoutes = require('./routes/approutes');
var connection = require('./mysqlConnection');


app.use(bodyParser.urlencoded({ extended: true, limit:'10Mb' }));
app.use(bodyParser.json({limit:'10Mb'}));

const totalHeapSize = v8.getHeapStatistics().total_available_size;
let totalHeapSizeInGB = (totalHeapSize/1024/1024/1024).toFixed(2);

console.log(`Total heap size (bytes) ${totalHeapSize} ,(GB ~${totalHeapSizeInGB})`);

let upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      let type = req.params.type;
      let path = `./public/uploads/`;
      callback(null, path);
    },
    filename: (req, file, callback) => {
      //originalname is the uploaded file's name with extn
      callback(null, file.originalname);
    }
  })
});

app.set('views',(path.join(__dirname + '/public/views')));
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});


app.use(cors({origin:'*'}));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true ,limit:'10mb'}));
app.use(bodyParser.json({limit:'10mb'}));
app.use('/', appRoutes);



module.exports = app;