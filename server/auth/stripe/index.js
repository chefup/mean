'use strict';

var express = require('express');
var passport = require('passport');
var auth = require('../auth.service');

var router = express.Router();

router
  .get('/', auth.isAuthenticated(), passport.authenticate('stripe', {
    scope: 'read_write'
  }))

  .get('/callback', auth.isAuthenticated(), passport.authenticate('stripe', {
    scope: 'read_write'
  }), function(req, res, next) {
    res.redirect('/settings');
  })

  .get('/unlink', auth.isAuthenticated(), function(req, res, next) {
    req.user.stripe = undefined;
    req.user.save(function(err) {
      if (err) return next(err);
      res.redirect('/settings');
    });
  });


module.exports = router;
