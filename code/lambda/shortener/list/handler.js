"use strict";

/** @module shortener/create **/

var createContainer = require("../../shared/container.js");

/**
 * @callback module:shortener/list/handler.lambdaCallback
 * @param {Error} error
 * @param {module:shared/shortener/validator} result
 */

/**
 * Lambda handler for shortener Create
 * @param {Object} event
 * @param {Object} event.body Schema body
 * @param {Object} context
 * @param {module:shortener/create.lambdaCallback} callback
 */
exports.handler = function(event, context, callback) {
    context.callbackWaitsForEmptyEventLoop = false;
    var container = createContainer(event, context);
    var logger = container.get("logger");

    logger.info("Lambda running for event: " + JSON.stringify(event));
    return container.get("shortener.validator").list()
        .then(function(result) {
            logger.info("Success: %s", JSON.stringify(result));
            callback(null, JSON.stringify(result));
        })
        .catch(function(err) {
            var errors = JSON.stringify(err, Object.getOwnPropertyNames(err));
            logger.error("Fail: %s", errors);
            callback(errors);
        });
};
