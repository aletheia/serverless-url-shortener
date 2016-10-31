"use strict";

var Error = function(code) {
    code = code || Error.codes.INTERNAL_ERROR;
    this.code = code;

};
Error.codes = {
    INTERNAL_ERROR: "INTERNAL_ERROR",
    NOT_FOUND: "NOT_FOUND",
    UNPROCESSABLE: "UNPROCESSABLE",
    CONFLICT: "CONFLICT",
    NOT_MODIFIED: "NOT_MODIFIED"
};

module.exports = Error;
