"use strict";

var _ = require("lodash");

var ApplicationError = function(code, message) {
    code = code || ApplicationError.codes.INTERNAL_ERROR;
    if (!_.isString(code)) {
        throw new Error("Code parameter must be a string or undefined");
    }
    this.code = code;

    message = message || ApplicationError.messages[code];

    if ((message) && (!_.isString(message))) {
        throw new Error("Message parameter must be a string or undefined");
    }

    this.message = message || ApplicationError.messages[code];
    this.stack = (new Error()).stack;
};

ApplicationError.prototype = Object.create(Error.prototype);
ApplicationError.prototype.name = "ApplicationError";

ApplicationError.codes = {
    INTERNAL_ERROR: "INTERNAL_ERROR",
    NOT_FOUND: "NOT_FOUND",
    UNPROCESSABLE: "UNPROCESSABLE",
    CONFLICT: "CONFLICT",
    NOT_MODIFIED: "NOT_MODIFIED"
};

ApplicationError.messages = {
    INTERNAL_ERROR: "Internal ApplicationError.",
    NOT_FOUND: "Resource Not Found.",
    UNPROCESSABLE: "Unable to proceed due to semantic errors.",
    CONFLICT: "Conflict with the current state of the target resource.",
    NOT_MODIFIED: "Resource not modified."
};

module.exports = ApplicationError;
