'use strict';

var express = require('express');
var controller = require('./request.controller');
var commentController = require('../comment/comment.controller');
var auth = require('../../auth/auth.service');
var compose = require('composable-middleware');

var router = express.Router();

// router.get('/', controller.index);
// router.get('/:id', controller.show);
router.get('/:requestId/comments', auth.isAuthenticated(), commentController.canAccessRequest(), commentController.index);
router.post('/:requestId/comments', auth.isAuthenticated(), commentController.canAccessRequest(), commentController.create);
// router.put('/:id', controller.update);
// router.patch('/:id', controller.update);
// router.delete('/:id', controller.destroy);

module.exports = router;
