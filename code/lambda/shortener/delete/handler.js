"use strict";

/** @module shortener/create **/

var createContainer = require("../../shared/container.js");

/**
 * @callback module:xobject/create.lambdaCallback
 * @param {Error} error
 * @param {module:shared/shortener/translator~shortener} result
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
    var apiResponseEvent;

    logger.info("Lambda running for event: " + JSON.stringify(event));
    return container.get("shortener.validator").delete()
        .then(function(result) {
            logger.info("Success: %s", JSON.stringify(result));

            apiResponseEvent = {
                "statusCode": 410
            };

            context.succeed(apiResponseEvent);
        })
        .catch(function(err) {
            var errors = JSON.stringify(err, Object.getOwnPropertyNames(err));
            logger.error("Fail: %s", errors);
            apiResponseEvent = {
                "statusCode": 500,
                "body": JSON.stringify(errors)
            };
            context.fail(apiResponseEvent);
        });
};
