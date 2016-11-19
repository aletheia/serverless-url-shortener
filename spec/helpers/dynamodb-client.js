"use strict";
var Promise = require("bluebird");
var fixtures = require("../fixtures/resources-table.json");

function Client(logger, config) {

    this.delete = function(params) {
        logger.debug("Executing delete query: " + JSON.stringify(params));
        return Promise.resolve(fixtures.deleteItem);
    };
    this.get = function(params) {
        logger.debug("Executing get query: " + JSON.stringify(params));
        return Promise.resolve(fixtures.getItem);
    };
    this.put = function(params) {
        logger.debug("Executing put query: " + JSON.stringify(params));
        return Promise.resolve(fixtures.putItem);
    };

    this.query = function(params) {
        logger.debug("Executing query: " + JSON.stringify(params));
        return Promise.resolve(fixtures.listItems);
    };

    this.scan = function(params) {
        logger.debug("Executing scan: " + JSON.stringify(params));
        return Promise.resolve(fixtures.listItems);
    };

}

Client.$inject = ["logger"];

module.exports = Client;
