"use strict";

var _ = require("lodash"),
    helper = require("../../helpers/helper.js"),
    uuid = require("uuid"),
    shortid = require("shortid"),
    config = require("../../../code/lambda/shared/config"),
    fixtures = require("../../fixtures/resources-table.json"),
    Index = require("../../../code/lambda/resolver/get/handler"),
    AWS = require("aws-sdk");

require("jasmine-expect");

xdescribe("resolver/Get", function() {
    //var dynamoClient = new AWS.DynamoDB.DocumentClient({region: config.dynamodb.region});
    var sut;
    var itemToResolve;

    beforeEach(function(done) {
        sut = Index;
        itemToResolve = fixtures.getItem;
        /*
         itemToResolve = {
         uuid: uuid.v1(),
         url: "http://www.neosperience.com",
         tracker: shortid.generate(),
         visited: 0,
         created: Date.now(),
         lastModified: Date.now()
         };

         var params = {
         TableName: config.shortener.resourceTableName,
         Item: itemToResolve
         };

         dynamoClient.put(params).promise()
         .then(function(res) {
         done();
         });
         */
        done();

    });

    describe("handler()", function() {
        it("should resolve an url starting from its tracker", function(done) {
            var event = {
                pathParameters: {
                    tracker: itemToResolve.tracker
                }
            };

            sut.handler(event, helper.getContextMock(
                function(result) {
                    expect(result.statusCode).toBe(302);
                    expect(result.headers.Location).toBe(itemToResolve.url);

/*
                    var params = {
                        TableName: config.shortener.resourceTableName,
                        Key: {
                            uuid: itemToResolve.uuid
                        }
                    };
                    dynamoClient.get(params).promise()
                        .then(function(result) {
                            done();
                        });
*/

                },
                function(error) {
                    expect(error).toBeNull();
                    done();
                }));
        });
        it("should throw an error if tracker does not exist", function(done) {
            var event = {
                pathParameters: {
                    tracker: "notExistingTracker"
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


    afterEach(function(done) {

/*
        var params = {
            TableName: config.shortener.resourceTableName,
            Key: {
                uuid: itemToResolve.uuid
            }
        };

        dynamoClient.delete(params).promise()
            .then(function(res) {
                done();
            });
*/
    });

});

