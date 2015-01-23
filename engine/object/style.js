h.module("style", function(require, exports){

    var math = require("math");

    var style = function(node){
        this.__private__ = {
            node: node,
            matrix: new math.Matrix4()
        };

        this.left   = 0;
        this.right  = 0;
        this.top    = 0;
        this.bottom = 0;
    };

    exports.create = function(node){
        return new style(node);
    };

});