"use strict";
var Repository = require("../../../code/lambda/shared/shortener/repository.js"),
    helper = require("../../helpers/helper.js"),
    Promise = require("bluebird");

require("jasmine-expect");

describe("shared/shortener/ShortenerRepository", function() {
    var sut, client;
    var config = {
        resourceTableName: "shortener-table",
        resourceIndexName: "owner-id-index"
    };

    beforeEach(function() {
        client = {
            delete: function() {
            },
            get: function() {
            },
            put: function() {
            },
            query: function() {
            },
            scan: function() {
            },
            update: function() {
            }
        };
        sut = new Repository(helper.getLoggerMock(), client, config);
    });

    describe("create()", function() {
        it("should return a promise", function(done) {
            var params = {
                TableName: config.resourceTableName,
                Item: {
                    uuid: "id"
                },
                ConditionExpression: "attribute_not_exists(#uuid)",
                ExpressionAttributeNames: {
                    "#uuid": "uuid"
                }
            };
            var item = {
                Item: {
                    uuid: "id"
                }
            };
            spyOn(client, "put").and.returnValue(Promise.resolve({}));
            spyOn(client, "get").and.returnValue(Promise.resolve(item));
            sut.create("id", {uuid: "id"})
                .then(function(result) {
                    expect(client.put).toHaveBeenCalledWith(params);
                    expect(result.uuid).toBe("id");
                })
                .then(done);
        });
    });

    describe("delete()", function() {
        it("should return a promise", function(done) {
            var params = {TableName: config.resourceTableName, Key: {uuid: "id"}};
            spyOn(client, "delete").and.returnValue(Promise.resolve({}));
            sut.delete("id")
                .then(function(result) {
                    expect(client.delete).toHaveBeenCalledWith(params);
                    expect(result).toBeEmptyObject();
                })
                .then(done);
        });
    });

    describe("get()", function() {
        it("should return a promise", function(done) {
            var params = {TableName: config.resourceTableName, Key: {uuid: "id"}};
            var item = {
                Item: {

                }
            };
            spyOn(client, "get").and.returnValue(Promise.resolve(item));
            sut.get("id")
                .then(function(result) {
                    expect(client.get).toHaveBeenCalledWith(params);
                })
                .then(done);
        });
        it("should return a promise", function(done) {
            var params = {TableName: config.resourceTableName, Key: {uuid: "id"}};
            var item = {
                Item: {}
            };
            spyOn(client, "get").and.returnValue(Promise.resolve(item));
            sut.get("id")
                .then(function(result) {
                    expect(client.get).toHaveBeenCalledWith(params);
                    expect(result).toBeNull();
                })
                .then(done);
        });
    });

    describe("list()", function() {

        it("should return a promise", function(done) {
            var params = {
                TableName: config.resourceTableName,
            };
            spyOn(client, "scan").and.returnValue(Promise.resolve());
            sut.list()
                .then(function() {
                    expect(client.scan).toHaveBeenCalledWith(params);
                    done();
                });
        });


    });

    describe("touch()", function() {
        it("should return a promise", function(done) {
            var params = {
                TableName: config.resourceTableName,
                Key: {uuid: "id"},
                UpdateExpression: "set lastModified = :lm",
                ExpressionAttributeValues: {
                    ":lm": 123
                },
                ReturnValues: "UPDATED_NEW"
            };
            spyOn(client, "update").and.returnValue(Promise.resolve());
            sut.touch("id", 123)
                .then(function() {
                    expect(client.update).toHaveBeenCalledWith(params);
                    done();
                });
        });
    });
});
