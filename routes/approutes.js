const express = require('express');
const fs = require('fs');
var app = express();
const router = express.Router();
var multer = require('multer');
var crypto = require('crypto');
let User = require('../controller/UserController');

// ********* User Routes **************
router.route('/login').post(User.login);
// router.route('/test').post(User.testTokenCheck);
router.route('/register').post(User.register);


module.exports = router;
