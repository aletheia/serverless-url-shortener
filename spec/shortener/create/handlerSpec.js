"use strict";

var _ = require("lodash"),
    helper = require("../../helpers/helper.js"),
    Index = require("../../../code/lambda/shortener/create/handler"),
    uuid = require("uuid"),
    config = require("../../../code/lambda/shared/config"),
    AWS = require("aws-sdk");

require("jasmine-expect");


xdescribe("shortener/Create", function() {
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
                body: JSON.stringify(newItem)
            };

            sut.handler(event, helper.getContextMock(
                function(result) {
                    expect(result.statusCode).toBe(201);
                    var r = JSON.parse(result.body);
                    expect(r).toHaveMember("uuid");
                    expect(r).toHaveMember("tracker");
                    expect(r).toHaveMember("url");
                    expect(r.created).toBeIso8601();
                    expect(r.lastModified).toBeIso8601();
                    done();
                },
                function(error) {
                    expect(error).toBeNull();
                    done();
                }
                ));
        });

        it("should throw an error if url is not defined", function(done) {
            var event = {
                body: ""
            };

            sut.handler(event, helper.getContextMock(
                function() {
                },
                function(error) {
                    expect(error).not.toBeNull();
                    expect(error.statusCode).toBe(500);
                    done();
                }
            ));
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
