"use strict";

var CONST = {
    MODULE_PATH: "../../../code/lambda/shared/error/ApplicationError.js"
};

describe("ApplicationError.js", function() {

    it("is defined", function() {
        expect(function() {
            require(CONST.MODULE_PATH);
        }).not.toThrow();
    });

    describe("when", function() {
        var Error = require(CONST.MODULE_PATH);
        describe("istantiated", function() {

            describe("with code parameter as", function() {

                it("a valid string, returns an object having that code", function() {
                    var myCode = "my code";
                    var myError = new Error(myCode);
                    expect(myError).toBeDefined();
                    expect(myError.code).toBe(myCode);
                });

                it("an empty string, sets to INTERNAL_ERROR", function() {
                    var myError = new Error();
                    expect(myError).toBeDefined();
                    expect(myError.code).toBe(Error.codes.INTERNAL_ERROR);
                });

                it("anything but a string, throws an error", function() {
                    expect(function() {
                        new Error({});
                    }).toThrow();
                });

            });

            describe("with message parameter as", function() {

                it("a valid string, returns an object having that message", function() {
                    var message = "A String message";
                    var myError = new Error("myCode", message);
                    expect(myError.message).toBe(message);
                });

                describe("an empty string, sets ", function() {
                    it("corresponding standard message for code", function() {
                        var myError = new Error(Error.codes.CONFLICT);
                        expect(myError.message).toBe(Error.messages.CONFLICT);
                    });
                    it("undefined if there is no standard mapping for that code", function() {
                        var myError = new Error("myCustomErrorCode");
                        expect(myError.message).not.toBeDefined();
                    });
                });

                it("anything but a string, throws an error", function() {
                    expect(function() {
                        new Error("mycode", {});
                    }).toThrow();
                });

            });

        });
    });

});
