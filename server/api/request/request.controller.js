'use strict';

var _ = require('lodash');
var Request = require('./request.model');

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
  var data = _.extend(req.body, {
    user: req.user._id,
    pickup: req.params.pickupId
  });
  Request.create(data, function(err, request) {
    if(err) { return handleError(res, err); }
    return res.json(201, request);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
