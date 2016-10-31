"use strict";

var CONST = {
    MODULE_PATH: "../code/lambda/shared/Error.js"
};

describe("Error.js", function() {

    it("is defined", function() {
        expect(function() {
            require(CONST.MODULE_PATH);
        }).not.toThrow();
    });

    describe("when", function() {
        var Error = require(CONST.MODULE_PATH);
        describe("istantiated", function() {

            it("with a code, returns an object having that code", function() {
                var myCode = "my code";
                var myError = new Error(myCode);
                expect(myError).toBeDefined();
                expect(myError.code).toBe(myCode);
            });

            it("with an empty string as code, sets to INTERNAL_ERROR", function() {
                var myError = new Error();
                expect(myError).toBeDefined();
                expect(myError.code).toBe(Error.codes.INTERNAL_ERROR);
            });

        });
    });

});
