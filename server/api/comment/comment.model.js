'use strict';

var mongoose = require('mongoose'),
    appRoot = require('app-root-path');

module.exports = mongoose.model('Comment', appRoot.require('/common/mongular-schema/comment.js'));
