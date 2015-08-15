'use strict';

var _ = require('lodash');
var Comment = require('./comment.model');

// Get list of comments
exports.index = function(req, res) {
  Comment.find({ request: req.params.requestId }).exec(function (err, comments) {
    if(err) { return handleError(res, err); }
    return res.json(200, comments);
  });
};

// Creates a new comment in the DB.
exports.create = function(req, res) {
  var data = _.extend(req.body, { user: req.user._id, request: req.params.requestId });
  Comment.create(data, function(err, comment) {
    if(err) { return handleError(res, err); }
    return res.json(201, comment);
  });
};
function handleError(res, err) {
  return res.send(500, err);
}
