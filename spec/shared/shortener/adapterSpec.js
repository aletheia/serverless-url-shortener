"use strict";
var Adapter = require("../../../code/lambda/shared/shortener/adapter.js"),
    helper = require("../../helpers/helper.js"),
    Promise = require("bluebird");

require("jasmine-expect");

describe("shared/shortener/ShortenerAdapter", function() {
    var sut, repository;

    beforeEach(function() {
        repository = {
            create: function() {
            },
            delete: function() {
            },
            get: function() {
            },
            list: function() {
            },
            touch: function() {
            },
            update: function() {
            }
        };
        sut = new Adapter(helper.getLoggerMock(), repository);
    });

    describe("create()", function() {
        it("should return a created object", function(done) {
            spyOn(repository, "create").and.returnValue(Promise.resolve("dummyObject"));
            var item = {
                uuid: "id",
                tracker: "TestTracker"
            };

            sut.create(item)
                .then(function(result) {
                    expect(repository.create).toHaveBeenCalledWith("id", {
                        uuid: "id",
                        created: jasmine.any(Number),
                        tracker: jasmine.any(String),
                        lastModified: jasmine.any(Number)
                    });
                    expect(result).toBe("dummyObject");
                })
                .then(done);
        });

        it("should return a created object", function(done) {
            spyOn(repository, "create").and.returnValue(Promise.resolve("dummyObject"));
            var item = {
                uuid: "id",
                tracker: "TestTracker"
            };

            sut.create(item)
                .then(function(result) {
                    expect(repository.create).toHaveBeenCalledWith("id", {
                        uuid: "id",
                        created: jasmine.any(Number),
                        tracker: jasmine.any(String),
                        lastModified: jasmine.any(Number)
                    });
                    expect(result).toBe("dummyObject");
                })
                .then(done);
        });

        it("should return a created object (import)", function(done) {
            spyOn(repository, "create").and.returnValue(Promise.resolve("dummyObject"));
            var item = {};
            sut.create(item)
                .then(function(result) {
                    expect(repository.create).toHaveBeenCalledWith(jasmine.any(String), {
                        uuid: jasmine.any(String),
                        created: jasmine.any(Number),
                        lastModified: jasmine.any(Number)
                    });
                    expect(result).toBe("dummyObject");
                })
                .then(done);
        });
    });
    describe("delete()", function() {
        it("should return a result", function(done) {
            spyOn(repository, "delete").and.returnValue(Promise.resolve("dummyObject"));
            sut.delete("id")
                .then(function(result) {
                    expect(repository.delete).toHaveBeenCalledWith("id");
                    expect(result).toBe("dummyObject");
                })
                .then(done);
        });
    });

    describe("touch()", function() {
        it("should touch an object", function(done) {
            spyOn(repository, "touch").and.returnValue(Promise.resolve("dummy"));
            sut.touch("dummyObject")
                .then(function(result) {
                    expect(repository.touch).toHaveBeenCalledWith("dummyObject", jasmine.any(Number));
                    expect(result).toBe("dummy");
                    done();
                });
        });
    });

    describe("list()", function() {
        it("return a list of items", function(done) {
            var expRes = {
                Count: 1,
                Items: [
                    {
                        uuid: "id1"
                    }
                ]
            };

            spyOn(repository, "list").and.returnValue(Promise.resolve(expRes));
            sut.list()
                .then(function(result) {
                    expect(repository.list).toHaveBeenCalledWith();
                    expect(result).toEqual(
                        {
                            count: 1,
                            result: [
                                {
                                    uuid: "id1"
                                }
                            ]
                        });
                    done();
                });
        });
    });

    describe("get()", function() {
        it("get an item", function(done) {
            var expRes = {
                uuid: "id1"
            };

            spyOn(repository, "get").and.returnValue(Promise.resolve(expRes));
            sut.get()
                .then(function(result) {
                    expect(repository.get).toHaveBeenCalled();
                    expect(result).toEqual(
                        {
                            uuid: "id1"
                        });
                    done();
                });
        });
    });


});
