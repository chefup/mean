'use strict';

var _ = require('lodash');
var Review = require('./review.model');

// Get list of reviews
exports.index = function(req, res) {
  var otherUser = req.request.user.equals(req.user._id) ? req.request.pickup.user : req.request.user;
  Review.find({ dish: req.request.pickup.dish, user: otherUser._id, reviewer: req.user._id }).exec(function (err, reviews) {
    if(err) { return handleError(res, err); }
    return res.json(200, reviews);
  });
};

// Creates a new review in the DB.
exports.create = function(req, res) {
  var otherUser = req.request.user.equals(req.user._id) ? req.request.pickup.user : req.request.user;
  var data = _.extend(req.body, { dish: req.request.pickup.dish, user: otherUser._id, reviewer: req.user._id });
  Review.create(data, function(err, review) {
    if(err) { return handleError(res, err); }
    return res.json(201, review);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
