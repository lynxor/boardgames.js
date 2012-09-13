## Gametree and some board game implementations(only tictactoe atm)

Using the code
------------------

Setup
-------

    var b = require("./tic-tac-toe-board.js"),
        gt = require("./gametree.js");


    var board = b.instance(),  //create an instance of the tic tac toe board
        crossMaxDepth = 3,
        circleMaxDepth = 1;

    var p = b.CROSS,
        g = gt.gametree(b); //create an gametree instance passing the board implementation as a param.

Playing
---------

After setup you can call g.next to get a move for a player.

To get a move for the CIRCLE player:

    //depth of 3.  This does NOT apply the move on the board
    var move = g.next(b.CIRCLE, board, 3); //returns something like [1,1]

    //to apply the move to board
    board.play(move, b.CIRCLE);

Other useful stuff
-------------------

 - board.free() gives all the open positions on the board eg. [ [1,1], [1,2] ... ]
   This can also be used to check for a draw in conjunction with checkWin. (No one is winning but no free positions = draw)
 - board.copy() returns a clone of the board - so you can mutate it without changing the game state
 - board.toString() returns a nice visual presentation of the board eg.
      ------
      - - X
      X X O
      - - O
      ------
- board.checkWin(player) - what you would expect


Examples
------------
See tic-tac-toe-game.js for an example of two AI's playing each other.
