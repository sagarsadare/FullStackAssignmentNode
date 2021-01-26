'user strict';
var connection = require('./../mysqlConnection.js');
var bcrypt = require('bcryptjs');
var async = require('async');
var crypto = require('crypto');
const jwt = require("jsonwebtoken");
var fs = require('fs');
const { json } = require('express');
var moment = require('moment');

var User = function () {

}
User.loginUsers = function (req, res) {

    try {
        console.log('req--------------------------->>', req.body);
        var email = req.body.logindata.email;
        var password = req.body.logindata.password;
        let ipAddress = req.body.ipAddress
        var algorithm = 'aes256'; // or any other algorithm supported by OpenSSL
        var key = 'password';
        var text = password;
        var query = `SELECT * FROM file_users WHERE EMAIL = '${email}'`;
        connection.query(query, (error, results) => {
            if (error) {
                console.log("error ocurred", error);
                res(null, { "code": 400, "failed": "error ocurred" })
            } else {
                console.log('first else----', results);

                if (results.length > 0) {
                    if (results[0].password == password) {
                        let data = {
                            Email: email,
                            Password: password
                        }
                        const token = jwt.sign({ userData: data }, "mykey", { expiresIn: "3 hours" }); //we need to verify this token with each upcoming req.
                        var query = `insert into user_log (EMAIL,PASSWORD,TOKEN,IP_ADDRESS) values ('${email}','${results[0].password}','${token}','${ipAddress}')`;
                        connection.query(query, (error, result) => {
                            if (error || result.length == 0) {
                                console.log("error: ", error);
                                var json = {
                                    status: 'failure',
                                    message: 'something went wrong'
                                }
                                res(null, json)
                            } else {

                                var query2 = `select firstName,lastName,EMAIL,IP_ADDRESS,AGE,GENDER,SKILLS,MOB  from file_users where email='${email}'`;
                                console.log('query2==>>', query2);
                                connection.query(query2, (error, result2) => {
                                    if (error || result.length == 0) {
                                        console.log("error: ", error);
                                        var json = {
                                            status: 'failure',
                                            message: 'something went wrong'
                                        }
                                        res(null, json)
                                    } else {
                                        json = {
                                            status: 'success',
                                            userData: result2,
                                            Token: token
                                        }
                                        res(null, json)
                                    }
                                })

                            }
                        });

                    }
                    else {
                        console.log('second else----');
                        res(null, {
                            status: 'failure',
                            message: "Email and password does not match"

                        });
                    }
                }
                else {
                    console.log('last else----');
                    res(null, {
                        status: 'failure',
                        message: "Email does not exits please sign up"
                    });
                }
            }
        });



    } catch (error) {
        console.log('error----->>>', error);
    }


}

User.register = function (request, results) {
    try {
        console.log('inside register--------------->>>', request.body);
        let password = request.body.userdata.password
        var newpassword = bcrypt.hashSync(password, 8);
        let input = request.body.userdata;
        let FirstName = input.firstName;
        let LastName = input.lastName;
        let Email = input.email;
        let Password = input.password;
        let IP_ADRESS = request.body.ipAddress;
        let dob = request.body.userdata.Dob
        let age = moment().diff(dob, 'years', false);
        let gender = request.body.userdata.gender;
        let skills = JSON.stringify(request.body.userdata.skills);
        let mobileNo = request.body.userdata.mobileNo;
        console.log('age===>>', age);
        console.log('age===>>', skills);
        var algorithm = 'aes256'; // or any other algorithm supported by OpenSSL
        var key = 'password';
        var text = password;
        var cipher = crypto.createCipher(algorithm, key);
        // var encryptedPassword = cipher.update(text, 'utf8', 'hex') + cipher.final('hex');

        async.waterfall(
            [
                function (callback) {
                    var checkUserQuery = `SELECT * FROM file_users WHERE EMAIL = '${Email}'`;
                    connection.query(checkUserQuery, (err, res1) => {
                        if (err) console.log("Err", err);
                        else callback(null, res1);
                    });
                },
                function (res1, callback) {
                    console.log('arg1------------>>>>', res1.length);
                    if (res1.length > 0) {
                        var json = {
                            status: 'Failure',
                            message: 'Email already exist try to login or signup with new email'
                        }
                        callback(null, json)

                    } else {
                        // VALUES ('${FirstName}','${encryptedPassword}', '${Email}', '${IP_ADRESS}');`;
                        var insertUserQuery = `INSERT INTO file_users (firstName,lastName,PASSWORD, EMAIL, IP_ADDRESS,AGE,GENDER,SKILLS,MOB)
                        VALUES ('${FirstName}','${LastName}','${password}', '${Email}', '${IP_ADRESS}', '${age}', '${gender}', '${skills}', '${mobileNo}');`;
                        connection.query(insertUserQuery, (err, result) => {
                            if (err) {
                                console.log("Err", err);
                            } else callback(null, result); {
                            }
                        });

                    }

                }

            ],
            function (err, finalResult) {

                result2 = {
                    FirstName: FirstName,
                    LastName: LastName,
                    Email: Email,
                    IP_ADRESS: IP_ADRESS,
                    age: age,
                    gender: gender,
                    skills: skills,
                    mobileNo: mobileNo
                }
                var json = {
                    status: 'success',
                    data: result2
                }
                var finalResult = json;
                console.log('res2------------------------------>>>>', finalResult);
                results(null, finalResult);
            }
        );













    } catch (error) {
        console.log('error-------->>>', error);
    }
    // console.log(JSON.stringify(request.body))

}


module.exports = User;