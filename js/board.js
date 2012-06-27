var _ = require("underscore");

exports.CROSS = "CROSS";
exports.CIRCLE = "CIRCLE";
exports.instance = function () {
    var moves = [];

    function index (r, c) {
        return c + r * 3;
    }

    function rindex(ind) {
        var c = ind % 3,
            r = (ind - c)/3;
        return [r, c];
    }

    return {
        rindex : rindex,
        index : index,
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
        checkWin: function(p){
            
        }
    }
};

