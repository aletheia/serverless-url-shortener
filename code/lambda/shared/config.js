"use strict";

var _ = require("lodash"),
    fs = require("fs"),
    nconf = require("nconf"),
    path = require("path");

nconf.env();

/* istanbul ignore next */
var env = !_.isNil(nconf.get("ENV")) ? "." + nconf.get("ENV") : "";

var configFile = path.join(__dirname, "config/config" + env + ".json");
fs.accessSync(configFile, fs.R_OK);

nconf.use("config", {type: "file", file: configFile});

module.exports = nconf.get();
