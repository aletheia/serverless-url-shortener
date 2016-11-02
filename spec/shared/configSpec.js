"use strict";
require("jasmine-expect");
describe("shared/Config", function() {
    var sut;

    afterEach(function() {
        delete process.env.FOO;
        delete process.env.ENV;
        delete require.cache[require.resolve("../../code/lambda/shared/config.js")];
    });

    describe("index()", function() {
        it("should return a test config", function() {
            process.env.ENV = "test";
            sut = require("../../code/lambda/shared/config.js");
            expect(sut.dynamodb).toBeObject();
        });

        it("should throw error for missing config file", function() {
            process.env.ENV = "foo";
            expect(function() {
                sut = require("../../code/lambda/shared/config.js");
            }).toThrowAnyError();
        });
    });
});
