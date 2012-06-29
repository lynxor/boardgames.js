var _ = require("underscore"),
    b = require("./board.js");



function next(originalPlayer, originalBoard, originalDepth) {

    return minmax(originalPlayer, originalBoard, originalDepth, true);

    //Level; true - max, false - min
    function minmax(p, board, depth, level) {
        function min(acc, result) {
            return result < acc ? result : acc;
        }

        function max(acc, result) {
            return result > acc ? result : acc;
        }

        function calcLevel(chooseOne, acc) {
            var free = board.free();

            var results = _.map(free, function (pos) {
                var newBoard = board.copy();
                newBoard.put(pos[0], pos[1], p);
                return minmax(b.opposite(p), newBoard, depth - 1, !level);
            });
            var chosenScore = _.reduce(results, chooseOne, acc);
            if (depth === originalDepth) {
                var scoreIndex = _.indexOf(results, chosenScore);
                return free[scoreIndex];
            } else {
                return chosenScore;
            }
        }

        //LEAFNODE
        if (!depth || !board.free().length || board.checkWin(p)) {
            return board.fitness(originalPlayer);
        }
        //MAX NODE
        else if (level) {
            return calcLevel(max, Number.NEGATIVE_INFINITY);
        }
        //MIN NODE
        else {
            return calcLevel(min, Number.POSITIVE_INFINITY);
        }
    }
}

exports.next = next;