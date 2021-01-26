// var connection = require('../../mysqlConnection.js');
// var varConst = require('../../constants/constants');
var debug = require('debug');
var verify = function (verify) {
};

let jwt = require('jsonwebtoken');
let fs = require('fs');

verify.checkToken = function (req, res, next) {
  console.log('Hostname :', req.hostname)
  if (req.hostname == 'localhost') {
    let token = req.headers['x-access-token'] || req.headers['authorization'] || req.headers["httpx-meru-accesstoken"]; // Express headers are auto converted to lowercase
    // if (token.startsWith('Bearer ')) {
    //   token = token.slice(7, token.length);
    // }
    console.log('Token :',token);

    if (token) {
      // var privateKEY  = fs.readFileSync('private.key', 'utf8');
      var publicKEY = fs.readFileSync('public.key', 'utf8');
      jwt.verify(token, publicKEY, (err, decoded) => {
        if (err) {
          console.log('Access Token :', token);
          return res.json({
            success: false,
            message: 'Token is not valid'
          });
        } else {
          console.log('Access Token :', token);
          req.decoded = decoded;
          next();
        }
      });
    } else {
      console.log('Invalid Token');

      return res.json({
        success: false,
        message: 'Auth token is not supplied'
      });
    }
  } else {
    console.log("Something :",req.hostname)
    return res.json({
      success: false,
      message: '<h1>Page not found</h1>'
    });
  }
};

module.exports = verify;