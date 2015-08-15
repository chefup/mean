'use strict';

var mongoose = require('mongoose'),
    appRoot = require('app-root-path');

module.exports = mongoose.model('Request', appRoot.require('/common/mongular-schema/request.js'));
