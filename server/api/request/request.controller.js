'use strict';

var _ = require('lodash');
var Request = require('./request.model');
var Dish = require('../dish/dish.model');
var User = require('../user/user.model');
var compose = require('composable-middleware');
var config = require('../../config/environment');
var stripe = require('stripe')(config.stripe.clientSecret);

function createStripeCharge(stripeCardToken, request, res, cb) {
  Dish.findById(request.pickup.dish, function(err, dish) {
    if (err) { return handleError(res, err); }
    User.findById(request.pickup.user, function(err, user) {
      if (err) { return handleError(res, err); }
      stripe.charges.create({
        amount: request.pickup.price,
        currency: 'aud',
        capture: false,
        source: stripeCardToken,
        description: dish.name + ' from ' + user.name + ' (via Chef.up)',
        statement_descriptor: 'CHEF.UP ' + user.name.replace(/<>'"/g, '').substring(0, 14),
        application_fee: 1000 // $1
      }, {
        stripe_account: user.stripe.stripe_user_id
      }, cb);
    });
  });
}

exports.canAccessRequest = function() {
  return compose()
    .use(function(req, res, next) {
      Request.findById(req.params.requestId).populate('pickup').exec(function(err, request) {
        if(err) { return handleError(res, err); }
        if(request.pickup && (request.user.equals(req.user._id) || request.pickup.user.equals(req.user._id))) {
          req.request = request;
          return next();
        }
        res.send(401);
      });
    });
};

// Get list of requests for a pickup
exports.index = function(req, res) {
  var query = { user: req.user._id };
  if (req.params.pickupId) {
    query.pickup = req.params.pickupId;
  }
  Request.find(query).populate('comments').exec(function (err, requests) {
    if(err) { return handleError(res, err); }

    return res.json(200, requests);
  });
};

// Creates a new pickup in the DB.
exports.create = function(req, res) {
  var stripeCardToken = req.body.stripeCardToken;
  delete req.body.stripeCardToken;
  var data = _.extend(req.body, {
    user: req.user._id,
    pickup: req.params.pickupId
  });
  Pickup.findById(req.params.pickupId, function(err, pickup) {
    if(err) { return handleError(res, err); }
    if(!pickup) return res.send(404);
    Request.create(data, function(err, request) {
      if(err) { return handleError(res, err); }
      if(stripeCardToken) {
        request.pickup = pickup;
        createStripeCharge(stripeCardToken, req.request, res, function(err, charge) {
          if (err) { return handleError(res, err); }
          request.status = 'payment_committed';
          request.charge = charge;
          request.save(function(err) {
            if (err) return handleError(res, err);
            res.json(201, req.request);
          });
        });
      } else {
        res.json(201, request);
      }
    });
  });
};


// Updates an existing dish in the DB.
exports.update = function(req, res) {
  if (req.request.status == 'enquiry' && req.body.stripeCardToken) {
    createStripeCharge(req.body.stripeCardToken, req.request, res, function(err, charge) {
      if (err) { return handleError(res, err); }
      req.request.status = 'payment_committed';
      req.request.charge = charge;
      req.request.save(function(err) {
        if (err) return handleError(res, err);
        res.json(200, req.request);
      });
    });
  }
};

function handleError(res, err) {
  return res.send(500, err);
}
