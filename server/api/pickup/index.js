'use strict';

var express = require('express');
var controller = require('./pickup.controller');
var auth = require('../../auth/auth.service');
var requestController = require('../request/request.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.get('/:pickupId/requests', auth.isAuthenticated(), requestController.index);
router.post('/:pickupId/requests', auth.isAuthenticated(), requestController.create);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
