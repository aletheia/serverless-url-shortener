"use strict";

var winston = require("winston"),
    _ = require("lodash");

module.exports = function(config) {
    var logger = new winston.Logger();
    _.forEach(config, function(cfg, key) {
        logger.add(winston.transports[cfg.type], (
            _.assignIn({name: key}, cfg.options)
        ));
    });
    return logger;
};