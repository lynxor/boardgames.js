var b = require("../js/board.js"),
    g = require("../js/gametree.js"),
    assert = require("assert");


describe("The gametree", function () {
//    it("obvious first move", function () {
//        var res = g.next(b.CROSS, b.instance(), 2);
//
//        assert.deepEqual([1,1], res);
//    });
//
//    it("obvious blocking", function () {
//        var board = b.instance();
//        board.put(1,1, b.CROSS);
//        board.put(0,0, b.CIRCLE);
//        board.put(1,0, b.CROSS);
//
//        var res = g.next(b.CIRCLE, board, 4);
//
//        assert.deepEqual([1,2], res);
//    });

    it("obvious winning move", function () {
        var board = b.instance();
        board.put(1,1, b.CROSS);
        board.put(0,0, b.CIRCLE);
        board.put(1,0, b.CROSS);

        console.log(board.toString());

        var res = g.next(b.CROSS, board, 3);

        assert.deepEqual([1,2], res);
    });
});
