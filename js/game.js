var b = require("./board.js"),
    g = require("./gametree.js"),
    _ = require("underscore");


var board = b.instance(),
    maxDepth = 2;

var p = b.CROSS;
while(true){

    if(!board.checkWin(b.opposite(p)) && board.free().length){
        console.log(board.toString());
        var move = g.next(p, board, maxDepth);
        board.put(move[0], move[1], p);
        p = b.opposite(p);

    } else if(board.checkWin(b.opposite(p))){
        p = b.opposite(p);
        console.log(board.toString());
        console.log();
        console.log("Well done. "+ p + " wins!");
        break;
    } else {
        console.log("Draw :{");
        break;
    }

}

