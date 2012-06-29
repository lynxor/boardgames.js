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

        it("check win down", function(){
            var board = b.instance();
            board.put(0,0, b.CROSS);
            board.put(1,0, b.CROSS);
            board.put(2,0, b.CROSS);

            assert.ok(board.checkWin(b.CROSS));
        });

        it("check no win ", function(){
            var board = b.instance();
            board.put(0,0, b.CROSS);
            assert.ifError(board.checkWin(b.CROSS));

            var board = b.instance();
            assert.ifError(board.checkWin(b.CROSS));
            assert.ifError(board.checkWin(b.CIRCLE));
        });



        it("check win across", function(){
            var board = b.instance();
            board.put(0,0, b.CROSS);
            board.put(0,1, b.CROSS);
            board.put(0,2, b.CROSS);

            assert.ok(board.checkWin(b.CROSS));
        });

        it("check win diag 1", function(){
            var board = b.instance();
            board.put(0,0, b.CROSS);
            board.put(1,1, b.CROSS);
            board.put(2,2, b.CROSS);

            assert.ok(board.checkWin(b.CROSS));
        });

        it("check win diag 2", function(){
            var board = b.instance();
            board.put(2,0, b.CROSS);
            board.put(1,1, b.CROSS);
            board.put(0,2, b.CROSS);

            assert.ok(board.checkWin(b.CROSS));
        });

        it("fitness", function(){
            var board = b.instance();
            board.put(1,0, b.CROSS);
            board.put(1,1, b.CROSS);

            assert.strictEqual(6, board.fitness(b.CROSS));

            board.put(1,2, b.CROSS);
            assert.strictEqual(Number.MAX_VALUE, board.fitness(b.CROSS));
        });

        it("toString test", function(){
            var board = b.instance();
            board.put(1,0, b.CROSS);
            board.put(1,1, b.CROSS);
            board.put(0,0, b.CIRCLE);
            board.put(2,2, b.CIRCLE);

            var expected = "------\nO X -\n- X -\n- - O\n------";
            assert.equal(expected, board.toString());

        });

        it("copy", function(){
            var board = b.instance();
            board.put(1,0, b.CROSS);

            var nb = board.copy();
            nb.put(1,1, b.CIRCLE);

            assert.ifError(board.get(1,1));
            assert.ok(nb.get(1,1));
        });
    });
});
