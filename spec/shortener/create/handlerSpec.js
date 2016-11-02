"use strict";

var _ = require("lodash"),
    helper = require("../../helper.js"),
    Index = require("../../../code/lambda/shortener/create/handler");

require("jasmine-expect");


xdescribe("shortener/Create", function() {
    var sut;

    beforeEach(function(done) {
        sut = Index;
        done();
    });

    describe("handler()", function() {
        it("should get a list of resources", function(done) {
            var event = {};

            sut.handler(event, helper.getContextMock(), function(err, result) {
                expect(err).toBeNull();
                var r = JSON.parse(result);
                /*expect(r.count).toBe(4);
                expect(r.lastKey).toBeNull();
                expect(r.result).toBeArrayOfSize(4);
                expect(r.result).toBeArrayOfObjects();
                _.each(r.result, function (o) {
                    expect(o).toHaveMember("uuid");
                    expect(o).toHaveMember("name");
                    expect(o).toHaveMember("status");
                    expect(o.created).toBeIso8601();
                    expect(o.lastModified).toBeIso8601();
                    // eslint-disable-next-line no-underscore-dangle
                    expect(o._links).toEqual({ self: { title: "XOBJECT", href: "xobject/" + o.uuid } });
                    // eslint-disable-next-line no-underscore-dangle
                    expect(o._resolved).toBe(true);
                    expect(o).toHaveMember("tags");
                    expect(o).toHaveMember("schemaNames");
                });*/
                done();

            });
        });

        it("should create a link (import)", function(done) {

        });

    });
});