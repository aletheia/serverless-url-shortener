"use strict";
var _ = require("lodash"),
    uuid = require("uuid");

var CONST = {
    MODULE_NAME: "Shared/Shortener/Adapter/"
};

var ShortenerAdapter = function(logger, repository) {

    function fixUuid(xObject) {
        _.defaults(xObject, {
            uuid: uuid.v1()
        });
    }

    this.create = function(resource) {
        logger.verbose(CONST.MODULE_NAME + "Create");
        fixUuid(resource);
        var now = Date.now();
        resource.lastModified = now;
        resource.created = now;
        return repository.create(resource.uuid, resource);
    };

    this.list = function() {
        logger.verbose(CONST.MODULE_NAME + "List");

        return repository.list()
            .then(function(result) {
                return {
                    count: result.Count,
                    result: result.Items
                };
            });
    };

    this.get = function(id) {
        logger.verbose(CONST.MODULE_NAME + "Get");
        return repository.get(id);
    };

    this.resolve = function(trackerId) {
        logger.verbose(CONST.MODULE_NAME + "Resolve");
        return repository.resolve(trackerId)
            .then(function(result) {
                return result.Items[0];
            });
    };

    this.delete = function(id) {
        logger.verbose(CONST.MODULE_NAME + "Delete");
        return repository.delete(id);
    };

    this.touch = function(id) {
        logger.verbose(CONST.MODULE_NAME + "Touch");
        var now = Date.now();
        return repository.touch(id, now);
    };

    this.update = function(id, resource) {
        logger.verbose(CONST.MODULE_NAME + "Update");
        var now = Date.now();
        resource.lastModified = now;
        return repository.update(id, resource);
    };

};

ShortenerAdapter.$inject = ["logger", "shortener.repository"];
module.exports = ShortenerAdapter;
