var _ = require("underscore");

var BLACK = "BLACK",
    WHITE = "WHITE",
    dimension = 7;

function opposite(p) {
    if (p === BLACK) {
        return WHITE;
    } else return BLACK;
}

var instance = function (initial, nw, nb, dim) {
        var moves = [],
            numWhite = 24,
            numBlack = 24;

        if (initial) {
            moves = initial;
        }
        if (dim) {
            dimension = dim;
        }
        if(nw && nb){
            numWhite = nw;
            numBlack = nb;
        }


        function index(r, c) {
            return c + r * dimension;
        }

        function rindex(ind) {
            var c = ind % dimension,
                r = (ind - c) / dimension;
            return [r, c];
        }

        function orthog(pos) {

            var r = pos[0],
                c = pos[1];

            return [
                [r - 1, c],
                [r + 1, c],
                [r, c - 1],
                [r, c + 1]
            ];
        }

        function validPosition(pos) {
            return pos[0] > 0 || pos[0] < dimension || pos[1] > 0 || pos[1] < dimension;
        }

        function validOrthogs(pos) {
            return _.filter(orthog(pos), validPosition);
        }

        function capturePairs(pos) {
            var all = orthog(pos),
                pairs = [all.slice(0, 2), all.slice(2, 4)];

            return _.filter(pairs, function (p) {
                return _.all(p, validPosition);
            });
        }



        function possibleCaptures(pos) {
            return _.chain(validOrthogs(pos)).map(capturePairs).filter(
                function (pair) {
                    return _.isEqual(pair[0], pos) || _.isEqual(pair[1], pos);  //pos has to be involved
                }).value();
        }


        return {
            rindex:rindex,
            index:index,
            put:function (r, c, p) {
                if (_.isArray(r) && r.length === 2) {
                    moves[index(r[0], r[1])] = c;
                } else {
                    moves[index(r, c)] = p;
                }
                if(p === WHITE) { numWhite = numWhite -1; }
                else if(p === BLACK) { numBlack = numBlack -1;}
            },
            remove:function (r, c) {
                if (_.isArray(r) && r.length === 2) {
                    this.put(r[0], r[1], undefined);
                } else {
                    this.put(r, c, undefined);
                }
            },
            move:function (pos1, pos2) {

                if (pos1 && pos1.from) {
                    var from = pos1.from;
                    pos2 = pos1.to;
                    pos1 = from;
                }

                var that = this,
                    p = this.get(pos1);

                this.put(pos1, undefined);
                this.put(pos2, p);

                //Check if something was captured (and remove it)
                _.each(possibleCaptures(pos2), function (pair) {
                    if (_.all(pair, function (pos) {
                        return that.get(pos) === p;
                    })) {
                        that.put(pair[0], undefined);
                        that.put(pair[1], undefined);
                    }
                });
            },
            play: function( m, p ){
                if(m && m.from){
                    this.move(m);
                } else{
                    this.put(m, p);
                }
            },
            get:function (r, c) {
                if (_.isArray(r)) {
                    return moves[index(r[0], r[1])];
                }
                return moves[index(r, c)];
            },
            getAll:function (p) {
                var that = this,
                    result = [];
                _.each(_.range(dimension * dimension), function (ind) {
                    if (moves[ind] === p) {
                        result.push(rindex(ind));
                    }
                });
                return result;
            },
            phase1:function () {
                return numBlack !== 0 && numWhite !== 0;
            },
            availableMoves:function (p) {
                return _.chain(this.getAll(p)).map(
                    function (stone) {
                        return _.map(validOrthogs(stone), function (orth) {
                            return {from:stone, to:orth};
                        });
                    }).flatten().value();
            },
            emptyPositions:function () {
                return _.chain(_.range(dimension * dimension)).map(
                    function (ind) {
                        return moves[ind] ? null : ind;
                    }).filter(
                    function (ind) {
                        return ind !== null && ind !==  parseInt((dimension*dimension) / 2, 10);  //can't play in center in phase1
                    }).map(rindex).value();
            },
            free:function (p) {
                var that = this;
                return this.phase1() ? this.emptyPositions() : that.availableMoves(p);
            },
            checkWin:function (p) {
                if (!p) return false;
                return !this.phase1() && _.all(moves, function (m) {
                    return m !== opposite(p);
                });
            },
            fitness:function (p) {
                if(this.phase1()){
                    return 0;
                } else{
                    return this.availableMoves(p) - this.availableMoves(opposite(p));
                }
            },
            copy:function () {
                var copiedMoves = _.clone(moves);
                return instance(copiedMoves);
            },
            toString:function () {
                var that = this;
                return "------\n" +
                    _.map(_.range(dimension),
                        function (row) {
                            return _.map(_.range(dimension),
                                function (col) {
                                    var value = that.get(row, col);
                                    if (value === BLACK) {
                                        return "B";
                                    } else if (value === WHITE) {
                                        return 'W';
                                    } else {
                                        return "-";
                                    }
                                }).join(" ");
                        }).join("\n") +
                    "\n------"
            },
            value:function () {
                return _.clone(moves);
            }
        }
    };

exports.BLACK = BLACK;
exports.WHITE = WHITE;
exports.instance = instance;
exports.opposite = opposite;