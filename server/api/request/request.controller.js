'use strict';

var _ = require('lodash');
var Request = require('./request.model');
var Dish = require('../dish/dish.model');
var Pickup = require('../pickup/pickup.model');
var User = require('../user/user.model');
var compose = require('composable-middleware');
var config = require('../../config/environment');
var stripe = require('stripe')(config.stripe.clientSecret);

function createStripeCharge(stripeCardToken, pickup, res, cb) {
  Dish.findById(pickup.dish, function(err, dish) {
    if (err) { return handleError(res, err); }
    User.findById(pickup.user, function(err, user) {
      if (err) { return handleError(res, err); }
      stripe.charges.create({
        amount: pickup.price * 100,
        currency: 'aud',
        capture: false,
        source: stripeCardToken,
        description: dish.name + ' from ' + user.name + ' (via Chef.up)',
        statement_descriptor: 'CHEF.UP ' + user.name.replace(/<>'"/g, '').substring(0, 14),
        application_fee: 1000 // $1
      }, { stripe_account: user.stripe.stripe_user_id }, cb);
    });
  });
}

exports.canAccessRequest = function() {
  return compose()
    .use(function(req, res, next) {
      Request.findById(req.params.requestId).populate('pickup').populate('comments').exec(function(err, request) {
        if(err) { return handleError(res, err); }
        if(!request) { return res.send(404); }
        if(request.pickup && (request.user.equals(req.user._id) || request.pickup.user.equals(req.user._id))) {
          req.request = request;
          return next();
        }
        res.send(403);
      });
    });
};

// Get list of requests for a pickup
exports.index = function(req, res) {
  var cb = function(query) {
    Request.find(query).populate('comments').exec(function (err, requests) {
      if(err) { return handleError(res, err); }

      return res.json(200, requests);
    });
  };
  var query = { };

  if (req.params.pickupId) {
    query.pickup = req.params.pickupId;
    Pickup.findById(query.pickup, function(err, pickup) {
      if(err) { return handleError(res, err); }
      if(!pickup.user.equals(req.user._id)) { // if current user does not pickup
        query.user = req.user._id;
      }
      cb(query);
    });
  } else {
    cb(query);
  }
};

// Get a single request
exports.show = function(req, res) {
  Request.findById(req.params.requestId, function (err, request) {
    if(err) { return handleError(res, err); }
    if(!request) { return res.send(404); }
    return res.json(200, request);
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
        createStripeCharge(stripeCardToken, pickup, res, function(err, charge) {
          if (err) { return handleError(res, err); }
          request.status = 'payment_committed';
          request.charge = charge;
          request.save(function(err) {
            if (err) return handleError(res, err);
            res.json(201, request);
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
    createStripeCharge(req.body.stripeCardToken, req.request.pickup, res, function(err, charge) {
      if (err) { return handleError(res, err); }
      req.request.status = 'payment_committed';
      req.request.charge = charge;
      req.request.save(function(err) {
        if (err) return handleError(res, err);
        res.json(200, req.request);
      });
    });
  }
  if (req.request.status == 'payment_committed' && req.body.status == 'accepted') {
    if (!req.request.pickup.user.equals(req.user._id)) return res.send(403);
    req.request.status = req.body.status;
    req.request.save(function(err) {
      if (err) return handleError(res, err);
      res.json(200, req.request);
    });
  }
};


// Deletes a request from the DB.
exports.destroy = function(req, res) {
  if (req.request.status != 'payment_committed') return res.send(400);
  req.request.remove(function(err) {
    if (err) {
      return handleError(res, err);
    }
    return res.send(204);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
