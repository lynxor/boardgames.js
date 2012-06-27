var b = require("../js/board.js"),
    assert = require("assert");


describe("The board", function () {
    describe("should be populated correctly", function () {
        it("put/get should work", function () {
            var board = b.instance();
            board.put(1,1, b.CROSS);

            assert.equal(b.CROSS, board.get(1,1));

        });
        it("index should work", function(){
            var board = b.instance();
            assert.strictEqual(0, board.index(0,0));
            assert.strictEqual(1, board.index(0,1));
            assert.strictEqual(2, board.index(0,2));
            assert.strictEqual(3, board.index(1,0));
            assert.strictEqual(4, board.index(1,1));
            assert.strictEqual(5, board.index(1,2));
            assert.strictEqual(8, board.index(2,2));
        });
        it("reverse index should work", function(){
            var board = b.instance();
            assert.deepEqual([0,0], board.rindex(0));
            assert.deepEqual([0,1], board.rindex(1));
            assert.deepEqual([0,2], board.rindex(2));
            assert.deepEqual([1,0], board.rindex(3));
            assert.deepEqual([1,1], board.rindex(4));
            assert.deepEqual([1,2], board.rindex(5));
            assert.deepEqual([2,0], board.rindex(6));
            assert.deepEqual([2,1], board.rindex(7));
            assert.deepEqual([2,2], board.rindex(8));

        });
        it("free should work", function(done) {
            var board = b.instance();
            board.put(1,0, b.CROSS);
            board.put(1,1, b.CROSS);
            board.put(1,2, b.CROSS);

            var free = board.free();
            assert.equal(6, free.length);
            assert.deepEqual([[0,0],[0,1],[0,2],[2,0],[2,1],[2,2]], free);
            done();
        });

    });
});
