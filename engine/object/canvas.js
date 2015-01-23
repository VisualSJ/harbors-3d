h.module("canvas", function(require, exports){

    var node = require("node");
    var camera = require("camera");

    var canvas = function(elem){
        elem = elem || document.createElement("canvas");
        elem.width = 800;
        elem.height = 450;
        document.body.appendChild(elem);
        this.__private__ = {
            element: elem,
            context: elem.getContext("2d"),
            width: elem.width,
            height: elem.height
        };

        this.node = node.create();
        this.camera = camera.create();
    };

    canvas.prototype = {

        constructor: canvas,

        get width(){
            return this.__private__.width;
        },
        set width(value){
            return this.__private__.width = value;
        },

        get height(){
            return this.__private__.height;
        },
        set height(value){
            return this.__private__.height = value;
        },

        update: function(){
            var node1 = this.node,
                context = this.__private__.context;

            node1.style.__private__.matrix.elements[0] = 0.6;
            node1.style.__private__.matrix.elements[1] = 0.4;
            node1.style.__private__.matrix.elements[12] = 0;
            node1.style.__private__.matrix.elements[13] = 0;
            node1.style.__private__.matrix.elements[14] = 200;


            context.setTransform(1, 0, 0, 1, 0, 0);
            context.clearRect(0, 0, this.width, this.height);

            var re = this.camera.matrix.multiple4(node1.style.__private__.matrix).projection(this.camera.far);
            var ma = re.elements;
            context.setTransform(ma[0], ma[1], ma[4], ma[5], ma[12], ma[13]);
            context.fillRect(0, 0, 100, 100);

            var node2 = node.create();
            node2.style.__private__.matrix.elements[4] = 0.6;
            node2.style.__private__.matrix.elements[5] = 0.4;
            node2.style.__private__.matrix.elements[12] = 0;
            node2.style.__private__.matrix.elements[13] = 0;
            node2.style.__private__.matrix.elements[14] = 200;

            re = this.camera.matrix.multiple4(node2.style.__private__.matrix).projection(this.camera.far);
            ma = re.elements;
            context.setTransform(ma[0], ma[1], ma[4], ma[5], ma[12], ma[13]);
            context.fillRect(0, 0, 100, 100);

            var node3 = node.create();
//            node3.style.__private__.matrix.elements[4] = 0.6;
//            node3.style.__private__.matrix.elements[5] = 0.4;
            node3.style.__private__.matrix.elements[12] = 60;
            node3.style.__private__.matrix.elements[13] = 40;
            node3.style.__private__.matrix.elements[14] = 200;

            re = this.camera.matrix.multiple4(node3.style.__private__.matrix).projection(this.camera.far);
            ma = re.elements;
            context.setTransform(ma[0], ma[1], ma[4], ma[5], ma[12], ma[13]);
            context.fillRect(0, 0, 100, 100);
        }
    };

    exports.create = function(elem){
        return new canvas(elem);
    };

});