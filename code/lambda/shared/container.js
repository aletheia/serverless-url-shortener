"use strict";

var _ = require("lodash"),
    AWS = require("aws-sdk"),
    config = require("./config"),
    intravenous = require("intravenous"),
    loggerFactory = require("./util/logger.js"),
    Promise = require("bluebird");

function registerLogger(container, config) {
    var logger = loggerFactory(config.log);
    container.register("logger", logger, "singleton");
}

function registerResource(container, config) {
    /* istanbul ignore next */
    var c = _.isObject(config.shortener) ? config.shortener : {};

/*    _.assign(c, {
        resourceTableName: config.SHORTENER_TABLE_NAME,
        resourceIndexName: config.SHORTENER_INDEX_NAME
    });*/

    container.register("shortener.adapter", require("./shortener/adapter.js"));
    container.register("shortener.config", c, "singleton");
    container.register("shortener.logic", require("./shortener/logic.js"));
    container.register("shortener.repository", require("./shortener/repository.js"));
    container.register("shortener.translator", require("./shortener/translator.js"));
    container.register("shortener.validator", require("./shortener/validator.js"));
}

function registerDynamoDB(container, config) {
    container.register("dynamodb.client", require(config.dynamodb.clientJS));
    container.register("dynamodb.config", config.dynamodb, "singleton");
}


function createContainer(event, context) {
    /* istanbul ignore next */   //this is the wiring part of the code, it is definitely not possible test every path
    var container = intravenous.create({
        onDispose: function(obj, serviceName) {
            if (obj.dispose !== undefined) {
                container.get("logger").info("Disposing service " + serviceName);
                obj.dispose();
            }
        }
    });
    AWS.config.setPromisesDependency(Promise);
    container.register("event", event);
    container.register("context", context);
    registerLogger(container, config);
    registerResource(container, config);
    registerDynamoDB(container, config);
    return container;
}

module.exports = createContainer;

