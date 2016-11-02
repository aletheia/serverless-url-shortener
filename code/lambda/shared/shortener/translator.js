"use strict";
/** @module shared/shortener/translator */
/**
 * @typedef {Object} TrackedResource
 * @property {string} uuid
 * @property {Date} created
 * @property {Date} lastModified
 */

var _ = require("lodash");

var CONST = {
    MODULE_NAME: "Shared/Shortener/Translator/"
};


var ShortenerTranslator = function(logger, event, logic) {

    function toDomainObject(resource) {
        resource.created = new Date(resource.created).toISOString();
        resource.lastModified = new Date(resource.lastModified).toISOString();
        return resource;
    }

    this.create = function() {
        logger.verbose(CONST.MODULE_NAME + "Create");
        event.body = JSON.parse(event.body);
        return logic.create(event.body)
            .then(function(result) {
                return toDomainObject(result);
            });
    };
    this.delete = function() {
        logger.verbose(CONST.MODULE_NAME + "Delete");
        return logic.delete(event.pathParameters.uuid);
    };

    this.list = function() {
        logger.verbose(CONST.MODULE_NAME + "List");
        var data = {};
        return logic.list()
            .then(function(result) {
                result.result = _.map(result.result, function(item) {
                    return toDomainObject(item);
                });
                return result;
            });
    };

    this.resolve = function() {
        logger.verbose(CONST.MODULE_NAME + "Resolve");
        return logic.resolve(event.pathParameters.tracker);
    };


};

ShortenerTranslator.$inject = ["logger", "event", "shortener.logic"];
module.exports = ShortenerTranslator;
