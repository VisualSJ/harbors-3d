h.module("camera", function(require, exports){

    var math = require("math");

    var camera = function(){


        this.__private__ = {



            x: 0,
            y: 0,
            z: 100,

            width: 800,
            height: 450,
            far: 200,
            near: 0
        };

        this.init();
    };

    camera.prototype = {

        constructor: camera,

        get x(){return this.__private__.x;},
        set x(value){this.__private__.x = value; this.init();},

        get y(){return this.__private__.y},
        set y(value){this.__private__.y = value; this.init();},

        get z(){return this.__private__.z},
        set z(value){this.__private__.z = value; this.init();},

        get width(){return this.__private__.width},
        set width(value){this.__private__.width = value; this.init();},

        get height(){return this.__private__.height},
        set height(value){this.__private__.height = value; this.init();},

        get far(){return this.__private__.far},
        set far(value){this.__private__.far = value; this.init();},

        get near(){return this.__private__.near},
        set near(value){this.__private__.near = value; this.init();},

        init: function(){
            var t = new math.Matrix4();
            t.elements[3] = -this.x;
            t.elements[7] = -this.y;
            t.elements[11] = -this.z;

            var r = new math.Matrix4();
            var UP = new math.vector(0, 1, 0);

            var N = new math.vector(this.x, this.y, this.z);
            var U = UP.clone().cross(N);
            var V = N.clone().cross(U);
            N.unitised();
            U.unitised();
            V.unitised();

            r.elements[0] = U.x;
            r.elements[1] = U.y;
            r.elements[2] = U.z;
            r.elements[4] = V.x;
            r.elements[5] = V.y;
            r.elements[6] = V.z;
            r.elements[8] = N.x;
            r.elements[9] = N.y;
            r.elements[10] = N.z;

            r.multiple4(t);

            this.matrix =  r;
        }
    };

    exports.create = function(){
        return new camera();
    };

});