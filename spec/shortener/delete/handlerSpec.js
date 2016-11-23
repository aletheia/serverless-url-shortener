"use strict";

var _ = require("lodash"),
    helper = require("../../helpers/helper.js"),
    Index = require("../../../code/lambda/shortener/delete/handler"),
    uuid = require("uuid"),
    shortid = require("shortid"),
    config = require("../../../code/lambda/shared/config"),
    AWS = require("aws-sdk");

require("jasmine-expect");


xdescribe("shortener/Create", function() {
    var dynamoClient = new AWS.DynamoDB.DocumentClient({region: config.dynamodb.region});
    var sut;
    var newItem;


    describe("handler()", function() {
        describe("should delete a resource", function() {
            beforeEach(function(done) {
                sut = Index;
                newItem = {
                    uuid: uuid.v1(),
                    url: "http://www.neosperience.com",
                    tracker: shortid.generate(),
                    created: Date.now(),
                    lastModified: Date.now()
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

            it("if it exists", function(done) {
                var event = {
                    pathParameters: {
                        uuid: newItem.uuid
                    }
                };

                sut.handler(event, helper.getContextMock(
                    function(result) {
                        expect(result.statusCode).toBe(410);
                        done();
                    },
                    function(error) {
                        expect(error).toBeNull();
                    }));
            });
        });

        describe("should throw an error", function() {
            it("if resource does not exist", function(done) {
                var event = {
                    pathParameters: {
                        uuid: "notExistingUUID"
                    }
                };

                sut.handler(event, helper.getContextMock(
                    function() {
                    },
                    function(error) {
                        expect(error).not.toBeNull();
                        expect(error.statusCode).toBe(500);
                        done();
                    }));
            });
        });

    });

});
