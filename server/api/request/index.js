'use strict';

var express = require('express');
var controller = require('./request.controller');
var commentController = require('../comment/comment.controller');
var reviewController = require('../review/review.controller');
var auth = require('../../auth/auth.service');
var compose = require('composable-middleware');

var router = express.Router();

router.get('/:requestId', auth.isAuthenticated(), controller.canAccessRequest(), controller.show);
router.get('/:requestId/comments', auth.isAuthenticated(), controller.canAccessRequest(), commentController.index);
router.post('/:requestId/comments', auth.isAuthenticated(), controller.canAccessRequest(), commentController.create);
router.get('/:requestId/reviews', auth.isAuthenticated(), controller.canAccessRequest(), reviewController.index);
router.post('/:requestId/reviews', auth.isAuthenticated(), controller.canAccessRequest(), reviewController.create);
router.put('/:requestId', auth.isAuthenticated(), controller.canAccessRequest(), controller.update);
router.delete('/:requestId',  auth.isAuthenticated(), controller.canAccessRequest(), controller.destroy);

module.exports = router;
