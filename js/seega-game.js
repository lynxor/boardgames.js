var seega = require("./seega-board.js"),
    tictac = require("./tic-tac-toe-board.js"),
    gt = require("./gametree.js"),
    _ = require("underscore");


var board = seega.instance(),
    crossMaxDepth = 1,
    circleMaxDepth = 1,
    initialPlayer = seega.BLACK,
    p = initialPlayer,
    g = gt.gametree(seega);


while(true){

    if(!board.checkWin(b.opposite(p)) && board.free().length){
        console.log(board.toString());
        var move = g.next(p, board, p === initialPlayer ? crossMaxDepth : circleMaxDepth);
        board.put(move[0], move[1], p);
        p = b.opposite(p);

    } else if(board.checkWin(b.opposite(p))){
        p = b.opposite(p);
        console.log(board.toString());
        console.log();
        console.log("Well done. "+ p + " wins!");
        break;
    } else {
        console.log(board.toString());
        console.log();
        console.log("Draw :{");
        break;
    }

}

