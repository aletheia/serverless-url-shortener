"use strict";
var helper = require("../../helpers/helper.js"),
    Promise = require("bluebird"),
    Translator = require("../../../code/lambda/shared/shortener/translator.js");
require("jasmine-expect");

describe("shared/shortener/translator", function() {
    var sut, logic;

    beforeEach(function() {
        logic = {
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
            update: function() {
            }
        };
    });

    describe("create()", function() {
        it("should call the logic and return an object", function(done) {
            var expectedBody = "{\"uuid\":\"dummy\"}";
            var event = {
                body: "{\"uuid\":\"dummy\"}"
            };
            spyOn(logic, "create").and.returnValue(Promise.resolve({
                created: 123,
                lastModified: 456
            }));
            sut = new Translator(helper.getLoggerMock(), event, logic);
            sut.create()
                .then(function(result) {
                    expect(logic.create).toHaveBeenCalledWith(JSON.parse(expectedBody));
                    expect(result.created).toBeIso8601();
                    expect(result.lastModified).toBeIso8601();
                    done();
                });
        });
    });

    describe("delete()", function() {
        it("should call the logic", function(done) {
            var event = {
                pathParameters: {
                    uuid: "key"
                }
            };
            spyOn(logic, "delete").and.returnValue(Promise.resolve("dummyObject"));
            sut = new Translator(helper.getLoggerMock(), event, logic);
            sut.delete()
                .then(function(result) {
                    expect(logic.delete).toHaveBeenCalledWith("key");
                    expect(result).toBe("dummyObject");
                    done();
                });
        });
    });

    describe("list()", function() {
        it("should call the logic", function(done) {
            var event = {};
            spyOn(logic, "list").and.returnValue(Promise.resolve(
                {
                    result: [
                        {
                            uuid: "id1",
                            created: 123,
                            lastModified: 123
                        },
                        {
                            uuid: "id2",
                            created: 456,
                            lastModified: 456
                        }
                    ],
                    count: 2
                }));

            sut = new Translator(helper.getLoggerMock(), event, logic);
            sut.list()
                .then(function(result) {
                    expect(logic.list).toHaveBeenCalled();
                    expect(result.result[0]).toEqual({
                        uuid: "id1",
                        created: "1970-01-01T00:00:00.123Z",
                        lastModified: "1970-01-01T00:00:00.123Z"
                    });
                    expect(result.result[1]).toEqual({
                        uuid: "id2",
                        created: "1970-01-01T00:00:00.456Z",
                        lastModified: "1970-01-01T00:00:00.456Z"
                    });
                    expect(result.count).toBe(2);
                    done();
                });
        });
    });

});
