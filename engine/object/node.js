h.module("node", function(require, exports){

    var style = require("style");

    var node = function(option){

        this.children = [];
        this.style = style.create(this);
    };

    exports.create = function(option){
        return new node(option);
    };

});