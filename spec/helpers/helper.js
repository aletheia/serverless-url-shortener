"use strict";
var _ = require("lodash"),
    AWS = require("aws-sdk"),
    config = require("../../code/lambda/shared/config.js"),
    createContainer = require("../../code/lambda/shared/container.js"),
    Promise = require("bluebird");


module.exports.getContextMock = function(succeedFunction, failFunction) {
    return {
        succeed: succeedFunction,
        fail: failFunction
    };
};
module.exports.getEventMock = function() {
    return {};
};

module.exports.getLoggerMock = function() {
    return {
        silly: function() {
        },
        debug: function() {
        },
        verbose: function() {
        },
        info: function() {
        },
        warn: function() {
        },
        error: function() {
        }
    };
};

module.exports.createContainer = function(event, context) {
    return createContainer(event, context);
};