var _ = require("underscore");

function gametree(boardImpl) {
    var b = boardImpl;

    return {

        next:function (originalPlayer, originalBoard, originalDepth) {
            if (originalDepth === 0) {
                //Just pick first available move
                return originalBoard.free(originalPlayer)[0];
            }
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
                    var free = board.free(p);

                    var results = _.map(free, function (pos) {
                        var newBoard = board.copy();
                        newBoard.play(pos, p);
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

                //LEAFNODE
                if (!depth || !board.free(p).length || board.checkWin(p) || board.checkWin(b.opposite(p))) {
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
    };
}

exports.gametree = gametree;