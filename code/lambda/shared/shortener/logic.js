"use strict";
var ApplicationError = require("../error/ApplicationError");
var uuid = require("node-uuid");

var CONST = {
    MODULE_NAME: "Shared/Shortener/Logic/"
};


var ShortenerLogic = function(logger, adapter) {

    this.create = function(data) {
        logger.verbose(CONST.MODULE_NAME + "Create");
        data.tracker = uuid.v1();
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
            .then(function() {
                return adapter.delete(id);
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
