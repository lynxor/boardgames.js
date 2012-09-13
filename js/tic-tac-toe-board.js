var _ = require("underscore");

var CROSS = "CROSS",
    CIRCLE = "CIRCLE",
    possibleRows = [

        //diag
        [ [0,0], [1,1], [2,2] ],
        [ [0,2], [1,1], [2,0] ],
        //horiz
        [ [0,0], [0,1], [0,2] ],
        [ [1,0], [1,1], [1,2] ],
        [ [2,0], [2,1], [2,2] ],
        //vert
        [ [0,0], [1,0], [2,0] ],
        [ [0,1], [1,1], [2,1] ],
        [ [0,2], [1,2], [2,2] ]

    ];

function opposite(p) {
    if (p === CROSS) {
        return CIRCLE;
    } else return CROSS;
}

var instance = function (initial) {
    var moves = [];
    if(initial){
        moves = initial;
    }


    function index(r, c) {
        return c + r * 3;
    }

    function rindex(ind) {
        var c = ind % 3,
            r = (ind - c) / 3;
        return [r, c];
    }

    return {
        rindex:rindex,
        index:index,
        put:function (r, c, p) {
            moves[index(r, c)] = p;
        },
        play: function(pos, p){
            this.put(pos[0], pos[1], p);
        },
        get:function (r, c) {
            return moves[index(r, c)];
        },
        free:function () {
            return _.chain(_.range(9)).map(
                function (ind) {
                    return moves[ind] ? null : ind;
                }).filter(
                function (ind) {
                    return ind !== null;
                }).map(rindex).value();
        },
        checkWin:function (p) {
            if(!p) return false;
            var that = this;
            return _.any(possibleRows, function(row){
                return _.all(row, function(pos){
                    return that.get(pos[0],pos[1]) === p;
                });
            });
        },
        fitness: function(p){

            var that = this;
            if(that.checkWin(p)){
                return Number.POSITIVE_INFINITY;
            } else if(that.checkWin(opposite(p))){
                return Number.NEGATIVE_INFINITY;
            }

            function onetwo(player, twoWeight, oneWeight){
                var twos = that.checkNum(player, 2),
                    ones =that.checkNum(player, 1);
                return twoWeight*twos + oneWeight*ones;
            }

            return  onetwo(p, 2, 1) - onetwo(opposite(p), 3, 1);

        },
        //counts the number of occurrences of the given player in each rows
        checkNum: function(p, length){
            var that = this;
            return _.reduce(possibleRows, function(acc, row){

                var items = {CROSS: 0, CIRCLE: 0};

                _.each(row, function(pos){
                    var value = that.get(pos[0],pos[1]);
                    if (value) {
                        items[value] += 1;
                    }
                });

                if(p === CROSS && items[CROSS] === length && items[CIRCLE] === 0){
                    return acc + 1;
                } else if(p === CIRCLE && items[CIRCLE] === length && items[CROSS] === 0){
                    return acc+1;
                }
                return acc;

            }, 0);
        },
        copy: function(){
            var copiedMoves = _.clone(moves);
            return instance(copiedMoves);
        },
        toString: function(){
            var that = this;
            return "------\n" +
                _.map(_.range(3), function(row){
                return _.map(_.range(3), function(col){
                    var value = that.get(row, col);
                     if(value === CROSS){
                         return "X";
                     } else if(value === CIRCLE){
                         return 'O';
                     } else {
                         return "-";
                     }
                }).join(" ");
            }).join("\n") +
                "\n------"
        },
        value: function(){
            return _.clone(moves);
        }
    }
};

exports.CROSS = CROSS;
exports.CIRCLE = CIRCLE;
exports.instance = instance;
exports.opposite = opposite;