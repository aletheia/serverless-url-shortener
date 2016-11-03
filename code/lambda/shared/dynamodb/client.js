"use strict";
var AWS = require("aws-sdk");

function Client(logger, config) {
    var client = new AWS.DynamoDB.DocumentClient(config);
    this.delete = function(params) {
        logger.debug("Executing delete query: " + JSON.stringify(params));
        return client.delete(params).promise();
    };
    this.get = function(params) {
        logger.debug("Executing get query: " + JSON.stringify(params));
        return client.get(params).promise();
    };
    this.put = function(params) {
        logger.debug("Executing put query: " + JSON.stringify(params));
        return client.put(params).promise();
    };

    this.query = function(params) {
        logger.debug("Executing query: " + JSON.stringify(params));
        return client.query(params).promise();
    };

    this.scan = function(params) {
        logger.debug("Executing scan: " + JSON.stringify(params));
        return client.scan(params).promise();
    };

/*    this.update = function(params) {
        logger.debug("Executing update query: " + JSON.stringify(params));
        return client.update(params).promise();
    };*/

}

Client.$inject = ["logger", "dynamodb.config"];

module.exports = Client;
