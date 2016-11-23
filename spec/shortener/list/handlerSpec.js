"use strict";

var _ = require("lodash"),
    helper = require("../../helpers/helper.js"),
    uuid = require("uuid"),
    shortid = require("shortid"),
    config = require("../../../code/lambda/shared/config"),
    fixtures = require("../../fixtures/resources-table.json"),
    Index = require("../../../code/lambda/shortener/list/handler"),
    AWS = require("aws-sdk");

require("jasmine-expect");

xdescribe("shortener/List", function() {
    var dynamoClient = new AWS.DynamoDB.DocumentClient({region: config.dynamodb.region});
    var sut;
    var resources;

    beforeEach(function(done) {
        sut = Index;
        resources = [
            {
                uuid: uuid.v1(),
                url: "http://www.neosperience.com",
                tracker: shortid.generate(),
                created: Date.now(),
                lastModified: Date.now()
            },
            {
                uuid: uuid.v1(),
                url: "http://www.neosperience.com",
                tracker: shortid.generate(),
                created: Date.now(),
                lastModified: Date.now()
            }
        ];

        _.each(resources, function(item) {

            var params = {
                TableName: config.shortener.resourceTableName,
                Item: item
            };

            dynamoClient.put(params).promise()
                .then(function(res) {
                    done();
                });
        });
    });

    describe("handler()", function() {
        it("should list every url into the system", function(done) {
            var event = {};

            sut.handler(event, helper.getContextMock(
                function(result) {
                    expect(result.statusCode).toBe(200);
                    var r = JSON.parse(result.body);
                    expect(r.count).toBe(2);
                    _.each(r.result, function(o) {
                        expect(o).toHaveMember("uuid");
                        expect(o.created).toBeIso8601();
                        expect(o.lastModified).toBeIso8601();
                    });
                    done();
                },
                function(error) {
                    expect(error).toBeNull();
                    done();
                }));
        });
    });


    afterEach(function(done) {
        _.each(resources, function(item) {

            var params = {
                TableName: config.shortener.resourceTableName,
                Key: {
                    uuid: item.uuid
                }
            };

            dynamoClient.delete(params).promise()
                .then(function(res) {
                    done();
                });

        });

    });
});

