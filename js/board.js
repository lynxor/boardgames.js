var _ = require("underscore");

exports.CROSS = "CROSS";
exports.CIRCLE = "CIRCLE";
exports.instance = function () {
    var moves = [];

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
            function iterateAnyAll(checkfunction){
                return _.any([0, 1, 2], function (a) {
                    return _.all([0, 1, 2], function (b) {
                        return checkfunction(a, b);
                    });
                })
            }
            var that = this;

                return iterateAnyAll(function(a, b){
                    return that.get(a, b) === p;
                })
                ||
                //check horizontal
                    iterateAnyAll(function(a, b){
                        return that.get(b, a) === p;
                    })
                ||
                //check diags
                _.all([[0,0], [1,1], [2,2]], function(pos){
                    return that.get(pos[0], pos[1]) === p;
                })

                || _.all([[2,0], [1,1], [0,2]], function(pos){
                return that.get(pos[0], pos[1]) === p;
                });
        }
    }
};

