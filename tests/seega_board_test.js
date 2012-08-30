var b = require("../js/seega-board.js"),
    assert = require("assert");


describe("The board", function () {
    describe("should be populated correctly", function () {
        it("move should work", function () {
            var board = b.instance();
            board.play({from: [1,1], to : [1,2]}, b.BLACK);

            assert.equal(b.BLACK, board.get(1,2));
            assert.ifError(board.get(1,1));

        });
    });
});