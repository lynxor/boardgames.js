var _ = require("underscore"),
    b = require("./board.js");


function next(originalPlayer, originalBoard, originalDepth) {

    return minmax(originalPlayer, originalBoard, originalDepth, true);

    //Level; true - max, false - min
    function minmax(p, board, depth, level) {
        function min(acc, result) {

            if (result.fitness === acc.fitness) {
                return result.depth < acc.depth ? result : acc;
            }
            return result.fitness < acc.fitness ? result : acc;
        }

        function max(acc, result) {
            if (result.fitness === acc.fitness) {
                return result.depth > acc.depth ? result : acc;
            }
            return result.fitness > acc.fitness ? result : acc;
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

                var scoreIndex = -1,
                    ind, result;

                for (ind in results) {
                    result = results[ind];
                    if (result.fitness === chosenScore.fitness && result.depth === chosenScore.depth) {
                        scoreIndex = ind;
                    }
                }

                return free[scoreIndex];
            } else {
                return chosenScore;
            }
        }

//        if (depth === 2) {
//            console.log(board.toString());
//            console.log("LEVEL 3");
//        }
        //LEAFNODE
        if (!depth || !board.free().length || board.checkWin(p) || board.checkWin(b.opposite(p))) {
            return {fitness:board.fitness(originalPlayer), depth:depth};
        }
        //MAX NODE
        else if (level) {
            return calcLevel(max, {fitness:Number.NEGATIVE_INFINITY, depth:Number.POSITIVE_INFINITY});
        }
        //MIN NODE
        else {
            return calcLevel(min, {fitness:Number.POSITIVE_INFINITY, depth:Number.NEGATIVE_INFINITY});
        }
    }
}

exports.next = next;