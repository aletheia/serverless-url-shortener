"use strict";
var _ = require("lodash");

var CONST = {
    MODULE_NAME: "Shared/Shortener/Repository/"
};


var ShortenerRepository = function(logger, client, config) {
    var tableName = config.resourceTableName;
    var indexName = config.resourceIndexName;

    function getDefaultParams() {
        return {
            TableName: tableName
        };
    }

    this.create = function(key, value) {
        logger.verbose(CONST.MODULE_NAME + "Create");
        var params = getDefaultParams();
        params.Item = value;
        params.ConditionExpression = "attribute_not_exists(#uuid)";
        params.ExpressionAttributeNames = {
            "#uuid": "uuid"
        };
        var self = this;
        return client.put(params)
            .then(function() {
                return self.get(key);
            });
    };

    this.delete = function(key) {
        logger.verbose(CONST.MODULE_NAME + "Delete");
        var params = getDefaultParams();
        params.Key = {
            uuid: key
        };
        return client.delete(params)
            .then(function(result) {
                return result;
            });
    };

    this.get = function(key) {
        logger.verbose(CONST.MODULE_NAME + "Get");
        var params = getDefaultParams();
        params.Key = {
            uuid: key
        };
        return client.get(params)
            .then(function(result) {
                return result.Item;
            })
            .then(function(o) {
                return _.isEmpty(o) ? null : o;
            });
    };

    this.list = function() {
        logger.verbose(CONST.MODULE_NAME + "List");
        var params = getDefaultParams();
        return client.scan(params);
    };

    this.resolve = function(trackerId) {
        logger.verbose(CONST.MODULE_NAME + "Resolve");
        var params = getDefaultParams();
        _.assign(params, {
            IndexName: indexName,
            KeyConditionExpression: "#tracker = :tracker",
            ExpressionAttributeNames: {"#tracker": "tracker"},
            ExpressionAttributeValues: {":tracker": trackerId}
        });
        return client.query(params);
    };


    this.touch = function(key, timestamp) {
        logger.verbose(CONST.MODULE_NAME + "Touch");
        var params = getDefaultParams();
        _.assign(params, {
            Key: {
                uuid: key
            },
            UpdateExpression: "set lastModified = :lm",
            ExpressionAttributeValues: {
                ":lm": timestamp
            },
            ReturnValues: "UPDATED_NEW"
        });
        return client.update(params);
    };

    this.update = function(key, value) {
        logger.verbose(CONST.MODULE_NAME + "Update");
        var params = getDefaultParams();
        params.Key = {uuid: key};
        params.Item = value;
        params.ConditionExpression = "attribute_exists(#uuid)";
        params.ExpressionAttributeNames = {"#uuid": "uuid"};
        var self = this;
        return client.put(params)
            .then(function() {
                return self.get(key);
            });
    };


};

ShortenerRepository.$inject = ["logger", "dynamodb.client", "shortener.config"];
module.exports = ShortenerRepository;
