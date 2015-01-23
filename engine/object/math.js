h.module("math", function(require, exports){

    var Matrix4 = function(){
        var te = this.elements = new Float32Array(16);
        te[ 0] = 1;
        te[ 5] = 1;
        te[10] = 1;
        te[15] = 1;
    };

    Matrix4.prototype.multiple4 = function(matrix4){
        var te = this.elements,
            ma = matrix4.elements;

        var te11 = te[ 0], te12 = te[ 1], te13 = te[ 2], te14 = te[ 3],
            te21 = te[ 4], te22 = te[ 5], te23 = te[ 6], te24 = te[ 7],
            te31 = te[ 8], te32 = te[ 9], te33 = te[10], te34 = te[11],
            te41 = te[12], te42 = te[13], te43 = te[14], te44 = te[15];

        var ma11 = ma[ 0], ma12 = ma[ 1], ma13 = ma[ 2], ma14 = ma[ 3],
            ma21 = ma[ 4], ma22 = ma[ 5], ma23 = ma[ 6], ma24 = ma[ 7],
            ma31 = ma[ 8], ma32 = ma[ 9], ma33 = ma[10], ma34 = ma[11],
            ma41 = ma[12], ma42 = ma[13], ma43 = ma[14], ma44 = ma[15];

        var re = new Matrix4();
        var rete = re.elements;

        rete[ 0] = te11*ma11 + te12*ma21 + te13*ma31 + te14*ma41;
        rete[ 1] = te11*ma12 + te12*ma22 + te13*ma32 + te14*ma42;
        rete[ 2] = te11*ma13 + te12*ma23 + te13*ma33 + te14*ma43;
        rete[ 3] = te11*ma14 + te12*ma24 + te13*ma34 + te14*ma44;

        rete[ 4] = te21*ma11 + te22*ma21 + te23*ma31 + te24*ma41;
        rete[ 5] = te21*ma12 + te22*ma22 + te23*ma32 + te24*ma42;
        rete[ 6] = te21*ma13 + te22*ma23 + te23*ma33 + te24*ma43;
        rete[ 7] = te21*ma14 + te22*ma24 + te23*ma34 + te24*ma44;

        rete[ 8] = te31*ma11 + te32*ma21 + te33*ma31 + te34*ma41;
        rete[ 9] = te31*ma12 + te32*ma22 + te33*ma32 + te34*ma42;
        rete[10] = te31*ma13 + te32*ma23 + te33*ma33 + te34*ma43;
        rete[11] = te31*ma14 + te32*ma24 + te33*ma34 + te34*ma44;

        rete[12] = te41*ma11 + te42*ma21 + te43*ma31 + te44*ma41;
        rete[13] = te41*ma12 + te42*ma22 + te43*ma32 + te44*ma42;
        rete[14] = te41*ma13 + te42*ma23 + te43*ma33 + te44*ma43;
        rete[15] = te41*ma14 + te42*ma24 + te43*ma34 + te44*ma44;

        return re;
    };

    Matrix4.prototype.projection = function(far){
        var te = this.elements,
            fn;

        if(te[14] !== 0) {
            fn = far / te[14];
            te[12] *= fn;
            te[13] *= fn;
            te[14] = far;


            te[0] *= fn;
            te[1] *= fn;
            te[2] *= fn;

            te[4] *= fn;
            te[5] *= fn;
            te[6] *= fn;

            te[8] *= fn;
            te[9] *= fn;
            te[10] *= fn;
        }
        return this;
    };

    var vector = function(x, y, z){
        this.x = x;
        this.y = y;
        this.z = z;
    };

    vector.prototype.unitised = function(){
        var x = this.x,
            y = this.y,
            z = this.z,
            i = Math.sqrt(x*x + y*y+ z*z);

        this.x /= i;
        this.y /= i;
        this.z /= i;
        return this;
    };

    vector.prototype.cross = function(vec){
        var x = this.y*vec.z - this.z*vec.y;
        var y = this.z*vec.x - this.x*vec.z;
        var z = this.x*vec.y - this.y*vec.x;
        this.x = x;
        this.y = y;
        this.z = z;
        return this;
    };

    vector.prototype.clone = function(){
        return new vector(this.x, this.y, this.z);
    };

    exports.Matrix4 = Matrix4;
    exports.vector = vector;

});