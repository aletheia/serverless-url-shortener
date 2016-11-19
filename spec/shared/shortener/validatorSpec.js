"use strict";
var Validator = require("../../../code/lambda/shared/shortener/validator.js"),
    helper = require("../../helpers/helper.js"),
    ApplicationError = require("../../../code/lambda/shared/error/ApplicationError"),
    Promise = require("bluebird");

require("jasmine-expect");

describe("shared/shortener/validator", function() {
    var sut, translator;
    beforeEach(function() {
        translator = {
            create: function() {
            },
            delete: function() {
            },
            get: function() {
            },
            getMetadata: function() {
            },
            list: function() {
            },
            resolve: function() {
            },
            update: function() {
            }
        };
    });
    describe("create()", function() {
        it("should return an unprocessable error", function(done) {
            var event = {};
            sut = new Validator(helper.getLoggerMock(), event, translator);
            sut.create()
                .catch(function(err) {
                    expect(err.code).toBe(ApplicationError.codes.UNPROCESSABLE);
                    expect(err.message).toBe("Missing event body");
                    expect(err).toHaveMember("stack");
                    done();
                });
        });
        it("should call the logic", function(done) {
            var event = {
                body: {
                    url: "http://test.me"
                }
            };
            spyOn(translator, "create").and.returnValue(Promise.resolve("dummyObject"));
            sut = new Validator(helper.getLoggerMock(), event, translator);
            sut.create()
                .then(function(result) {
                    expect(translator.create).toHaveBeenCalled();
                    expect(result).toBe("dummyObject");
                    done();
                });
        });
    });

    describe("delete()", function() {
        it("should return an unprocessable error, if pathParameter is not defined", function(done) {
            var event = {};
            sut = new Validator(helper.getLoggerMock(), event, translator);
            sut.delete()
                .catch(function(err) {
                    expect(err.code).toBe(ApplicationError.codes.UNPROCESSABLE);
                    expect(err.message).toBe("Missing path parameters");
                    expect(err).toHaveMember("stack");
                    done();
                });
        });
        it("should return an unprocessable error, if pathParameter does not contain uuid", function(done) {
            var event = {
                pathParameters: {}
            };
            sut = new Validator(helper.getLoggerMock(), event, translator);
            sut.delete()
                .catch(function(err) {
                    expect(err.code).toBe(ApplicationError.codes.UNPROCESSABLE);
                    expect(err.message).toBe("Missing uuid in path");
                    expect(err).toHaveMember("stack");
                    done();
                });
        });
        it("should call the logic", function(done) {
            var event = {
                pathParameters: {
                    uuid: "key"
                }
            };
            spyOn(translator, "delete").and.returnValue(Promise.resolve("dummyObject"));
            sut = new Validator(helper.getLoggerMock(), event, translator);
            sut.delete()
                .then(function(result) {
                    expect(translator.delete).toHaveBeenCalled();
                    expect(result).toBe("dummyObject");
                    done();
                });
        });
    });

    describe("resolve()", function() {
        it("should return an unprocessable error, if pathParameter is not defined", function(done) {
            var event = {};
            sut = new Validator(helper.getLoggerMock(), event, translator);
            sut.resolve()
                .catch(function(err) {
                    expect(err.code).toBe(ApplicationError.codes.UNPROCESSABLE);
                    expect(err.message).toBe("Missing path parameters");
                    expect(err).toHaveMember("stack");
                    done();
                });
        });
        it("should return an unprocessable error, if pathParameter does not contain tracker", function(done) {
            var event = {
                pathParameters: {
                    uuid: "A38F3980-4174-468F-AE55-EE59C274F2FB"
                }
            };
            sut = new Validator(helper.getLoggerMock(), event, translator);
            sut.resolve()
                .catch(function(err) {
                    expect(err.code).toBe(ApplicationError.codes.UNPROCESSABLE);
                    expect(err.message).toBe("Missing tracker in path");
                    expect(err).toHaveMember("stack");
                    done();
                });
        });
        it("should call the logic", function(done) {
            var event = {
                pathParameters: {
                    tracker: "edFes23"
                }
            };
            spyOn(translator, "resolve").and.returnValue(Promise.resolve("dummyObject"));
            sut = new Validator(helper.getLoggerMock(), event, translator);
            sut.resolve()
                .then(function(result) {
                    expect(translator.resolve).toHaveBeenCalled();
                    expect(result).toBe("dummyObject");
                    done();
                });
        });
    });

    describe("list()", function() {
        it("should call the logic", function(done) {
            var event = {};
            spyOn(translator, "list").and.returnValue(Promise.resolve("dummyObject"));
            sut = new Validator(helper.getLoggerMock(), event, translator);
            sut.list()
                .then(function(result) {
                    expect(translator.list).toHaveBeenCalled();
                    expect(result).toBe("dummyObject");
                    done();
                });
        });
    });
});
