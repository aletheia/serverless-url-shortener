"use strict";

var _ = require("lodash"),
    helper = require("../../helper.js"),
    Index = require("../../../code/lambda/shortener/create/handler"),
    uuid = require("node-uuid"),
    config = require("../../../code/lambda/shared/config"),
    AWS = require("aws-sdk");

require("jasmine-expect");


describe("shortener/Create", function() {
    var dynamoClient = new AWS.DynamoDB.DocumentClient({region: config.dynamodb.region});
    var sut;
    var newItem;

    beforeEach(function(done) {
        sut = Index;
        newItem = {
            uuid: uuid.v1(),
            url: "http://www.neosperience.com"
        };
        done();
    });

    describe("handler()", function() {
        it("should create a new resource", function(done) {
            var event = {
                body: newItem
            };

            sut.handler(event, helper.getContextMock(), function(err, result) {
                expect(err).toBeNull();
                var r = JSON.parse(result);
                expect(r).toHaveMember("uuid");
                expect(r.created).toBeIso8601();
                expect(r.lastModified).toBeIso8601();
                done();
            });
        });
    });

    afterEach(function(done) {
        var params = {
            TableName: config.shortener.resourceTableName,
            Key: {
                uuid: newItem.uuid
            }
        };

        dynamoClient.delete(params).promise()
            .then(function(res) {
                done();
            });
    });
});
