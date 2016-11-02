"use strict";
var _ = require("lodash"),
    uuid = require("node-uuid");

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
        var now = (new Date()).getMilliseconds();
        resource.visited = 0;
        resource.lastModified = now;
        resource.created = now;
        return repository.create(resource.uuid, resource);
    };

    this.delete = function(id) {
        logger.verbose(CONST.MODULE_NAME + "Delete");
        return repository.delete(id);
    };

    this.touch = function(id) {
        logger.verbose(CONST.MODULE_NAME + "Touch");
        var now = (new Date()).getMilliseconds();
        return repository.touch(id, now);
    };

};

ShortenerAdapter.$inject = ["logger", "shortener.repository"];
module.exports = ShortenerAdapter;