'use strict';

var _ = require('lodash');
var Pickup = require('./pickup.model');

// Get list of pickups
exports.index = function(req, res) {
  var query = {};
  if (req.query.userId) {
    query.user = req.query.userId;
  }
  Pickup.find(query).populate('dish').populate('user').exec(function(err, pickups) {
    if (err) {
      return handleError(res, err);
    }

    return res.json(200, pickups);
  });
};

// Get a single pickup
exports.show = function(req, res) {
  Pickup.findById(req.params.id).populate('dish').populate('user').exec(function(err, pickup) {
    if (err) {
      return handleError(res, err);
    }
    if (!pickup) {
      return res.send(404);
    }
    return res.json(pickup);
  });
};

// Creates a new pickup in the DB.
exports.create = function(req, res) {
  Pickup.create(req.body, function(err, pickup) {
    console.log(req.body);
    if (err) {
      return handleError(res, err);
    }
    return res.json(201, pickup);
  });
};

// Updates an existing pickup in the DB.
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Pickup.findById(req.params.id, function(err, pickup) {
    if (err) {
      return handleError(res, err);
    }
    if (!pickup) {
      return res.send(404);
    }
    var updated = _.merge(pickup, req.body);
    updated.save(function(err) {
      if (err) {
        return handleError(res, err);
      }
      return res.json(200, pickup);
    });
  });
};

// Deletes a pickup from the DB.
exports.destroy = function(req, res) {
  Pickup.findById(req.params.id, function(err, pickup) {
    if (err) {
      return handleError(res, err);
    }
    if (!pickup) {
      return res.send(404);
    }
    pickup.remove(function(err) {
      if (err) {
        return handleError(res, err);
      }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}