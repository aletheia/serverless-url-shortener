"use strict";
var _ = require("lodash");
var ApplicationError = require("../error/ApplicationError");
var shortId = require("shortid");

var CONST = {
    MODULE_NAME: "Shared/Shortener/Logic/"
};


var ShortenerLogic = function(logger, adapter) {

    this.create = function(data) {
        logger.verbose(CONST.MODULE_NAME + "Create");
        data.tracker = shortId.generate();
        data.visited = 0;
        return adapter.create(data)
            .catch(function(e) {
                if (e.code === "ConditionalCheckFailedException") {
                    logger.warn("TrackedResource already exists");
                    throw new ApplicationError(
                        ApplicationError.codes.CONFLICT,
                        "TrackedResource " + data.uuid + " already exists."
                    );
                }
                throw e;
            });
    };

    this.delete = function(id) {
        logger.verbose(CONST.MODULE_NAME + "Delete");
        return adapter.get(id)
            .then(function(result) {
                if (_.isNil(result)) {
                    throw new ApplicationError(ApplicationError.codes.NOT_FOUND, "Resource to be deleted not found");
                }
                return adapter.delete(id);
            });
    };

    this.resolve = function(trackerId) {
        logger.verbose(CONST.MODULE_NAME + "Resolve");
        return adapter.resolve(trackerId)
            .then(function(resource) {
                resource.visited = resource.visited + 1;
                return adapter.update(resource.uuid, resource);
            });
    };


    this.list = function() {
        logger.verbose(CONST.MODULE_NAME + "List");
        var listPromise = adapter.list();
        return listPromise;
    };
};

ShortenerLogic.$inject = ["logger", "shortener.adapter"];
module.exports = ShortenerLogic;
