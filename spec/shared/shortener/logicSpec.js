"use strict";

var Logic = require("../../../code/lambda/shared/shortener/logic.js"),
    helper = require("../../helpers/helper.js"),
    ApplicationError = require("../../../code/lambda/shared/error/ApplicationError"),
    Promise = require("bluebird");

require("jasmine-expect");

describe("shared/shortener/ShortenerLogic", function() {
    var sut, adapter;

    beforeEach(function() {
        adapter = {
            create: function() {
            },
            delete: function() {
            },
            get: function() {
            },
            list: function() {
                return Promise.resolve([]);
            },
            update: function() {
            }
        };
        sut = new Logic(helper.getLoggerMock(), adapter);
    });

    describe("create()", function() {

        it("should throw a conflict error", function(done) {
            spyOn(adapter, "create").and.returnValue(Promise.reject({
                message: "The conditional request failed",
                code: "ConditionalCheckFailedException",
                statusCode: 400,
                retryable: false,
                retryDelay: 0
            }));
            var data = {
                uuid: "id",
                name: "name"
            };
            sut.create(data)
                .catch(function(err) {
                    expect(adapter.create).toHaveBeenCalledWith(data);
                    expect(err).toEqual(new ApplicationError(
                        ApplicationError.codes.CONFLICT,
                        "TrackedResource id already exists."
                    ));
                })
                .then(done);
        });

        it("should throw a generic error", function(done) {
            spyOn(adapter, "create").and.returnValue(Promise.reject(new Error("Generic error.")));
            var data = {
                uuid: "id",
                name: "name"
            };
            sut.create(data)
                .catch(function(err) {
                    expect(adapter.create).toHaveBeenCalledWith(data);
                    expect(err).toEqual(new Error("Generic error."));
                })
                .then(done);
        });
        it("should create a resource", function(done) {
            spyOn(adapter, "create").and.returnValue(Promise.resolve("dummyObject"));
            var data = {
                url: "http://test.me"
            };
            sut.create(data)
                .then(function(result) {
                    expect(adapter.create).toHaveBeenCalledWith(data);
                    expect(result).toBe("dummyObject");
                })
                .then(done);
        });
    });
    describe("delete()", function() {
        it("should throw a not found error", function(done) {
            spyOn(adapter, "get").and.returnValue(Promise.resolve(null));
            var data = "id";
            sut.delete(data)
                .catch(function(err) {
                    expect(adapter.get).toHaveBeenCalledWith("id");
                    expect(err).toEqual(new ApplicationError(
                        ApplicationError.codes.NOT_FOUND,
                        "Resource to be deleted not found"
                    ));
                })
                .then(done);
        });
        it("should throw a not found error", function(done) {
            spyOn(adapter, "get").and.returnValue(Promise.resolve({
                uuid: "id", name: "name"
            }));
            var data = "id";
            sut.delete(data)
                .catch(function(err) {
                    expect(adapter.get).toHaveBeenCalledWith("id");
                    expect(err).toEqual(new ApplicationError(
                        ApplicationError.codes.NOT_FOUND,
                        "TrackedResource id not found."
                    ));
                })
                .then(done);
        });
        it("should delete an xobject", function(done) {
            spyOn(adapter, "get").and.returnValue(Promise.resolve({
                uuid: "id",
                name: "name",
                owner: "owner"
            }));
            spyOn(adapter, "delete").and.returnValue({});
            var data = "id";
            sut.delete(data)
                .then(function(result) {
                    expect(adapter.get).toHaveBeenCalledWith("id");
                    expect(adapter.delete).toHaveBeenCalledWith("id");
                    expect(result).toBeEmptyObject();
                })
                .then(done);
        });
    });

    describe("list()", function() {
        beforeEach(function() {
            spyOn(adapter, "list").and.returnValue(Promise.resolve(
                {
                    result: [
                        {
                            uuid: "idA"
                        },
                        {
                            uuid: "idB"
                        }
                    ],
                    count: 2
                })
            );
        });

        it("should return a list of resources", function(done) {

            sut.list()
                .then(function(result) {
                    expect(adapter.list).toHaveBeenCalled();
                    expect(result).toBeObject();
                    expect(result.count).toBe(2);
                    expect(result.result).toBeArrayOfSize(2);
                    expect(result.result[0]).toEqual(
                        {
                            uuid: "idA"
                        });
                    expect(result.result[1]).toEqual(
                        {
                            uuid: "idB"
                        });
                })
                .then(done);
        });
    });

    describe(".resolve()", function() {
        //TODO: implement
    });
});
