"use strict";

var _ = require("lodash"),
    ApplicationError = require("../error/ApplicationError"),
    Promise = require("bluebird");

var CONST = {
    MODULE_NAME: "Shared/Shortener/Validator/"
};

var ShortenerValidator = function(logger, event, translator) {

    this.create = function() {
        logger.verbose(CONST.MODULE_NAME + "Create");
        return Promise.try(
            function() {
                if (_.isNil(event.body)) {
                    throw new ApplicationError(ApplicationError.codes.UNPROCESSABLE, "Missing event body");
                }
                return translator.create();
            }
        );
    };

    this.delete = function() {
        logger.verbose(CONST.MODULE_NAME + "Delete");
        return Promise.try(
            function() {
                if (_.isNil(event.pathParameters)) {
                    throw new ApplicationError(ApplicationError.codes.UNPROCESSABLE, "Missing uuid in path");
                } else if (_.isNil(event.pathParameters.uuid)) {
                    throw new ApplicationError(ApplicationError.codes.UNPROCESSABLE, "Missing uuid in path");
                }
                return translator.delete();
            }
        );
    };

    this.list = function() {
        logger.verbose(CONST.MODULE_NAME + "List");
        return Promise.try(
            function() {
                return translator.list();
            }
        );
    };


};

module.exports = ShortenerValidator;