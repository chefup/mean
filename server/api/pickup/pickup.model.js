'use strict';

var mongoose = require('mongoose'),
    appRoot = require('app-root-path');
    
module.exports = mongoose.model('Pickup', appRoot.require('/common/mongular-schema/pickup.js'));
