'use strict';

var express = require('express');
var passport = require('passport');
var config = require('../config/environment');
var User = require('../api/user/user.model');

// Passport Configuration
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

require('./facebook/passport').setup(User, config);
require('./stripe/passport').setup(User, config);

var router = express.Router();

router.use('/facebook', require('./facebook'));
router.use('/stripe', require('./stripe'));

module.exports = router;
