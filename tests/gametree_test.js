var b = require("../js/board.js"),
    g = require("../js/gametree.js"),
    assert = require("assert");


describe("The gametree", function () {
    it("bla", function () {
        var res = g.next(b.CROSS, b.instance(), 2);

        assert.deepEqual([1,1], res);
    });
});
