
var User = require('../model/UserModel');

exports.login = function(request,response){
  User.loginUsers(request, function(err, data) {
    if (err)
    response.send(err);
    // console.log(data)
    response.json(data);
  });
};

exports.register = function(request,response){
  User.register(request, function(err, data) {
    if (err)
    response.send(err);
    // console.log(data)
    response.json(data);
  });
};



