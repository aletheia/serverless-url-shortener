"use strict";

var _ = require("lodash"),
    helper = require("../../helper.js"),
    Index = require("../../../code/lambda/shortener/delete/handler"),
    uuid = require("node-uuid"),
    shortid = require("shortid"),
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
            url: "http://www.neosperience.com",
            tracker: shortid.generate(),
            created: (new Date()).getMilliseconds(),
            lastModified: (new Date()).getMilliseconds()
        };


        var params = {
            TableName: config.shortener.resourceTableName,
            Item: newItem
        };

        dynamoClient.put(params).promise()
            .then(function(res) {
                done();
            });

    });
    describe("handler()", function() {
        it("should delete a resource", function(done) {
            var event = {
                pathParameters: {
                    uuid: newItem.uuid
                }
            };

            sut.handler(event, helper.getContextMock(), function(err, result) {
                expect(err).toBeNull();
                expect(result.statusCode).toBe(410);
/*
                var r = JSON.parse(result);
                expect(r).toHaveMember("uuid");
                expect(r.created).toBeIso8601();
                expect(r.lastModified).toBeIso8601();
*/
                done();
            });
        });
    });

});
