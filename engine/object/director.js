h.module("director", function(require, exports){

    var director = function(option){
        this.fps     = option && option.fps  ? option.fps  : 60;
        this.mode    = option && option.mode ? option.mode : "canvas";

        this.canvas  = [];
        this.running = false;
    };

    var frame = function(director, fps, time){
        var i = 0,
            canvas = director.canvas,
            length = canvas.length;
        for(; i < length; i++){
            canvas[i].update();
        }

        if(!director.running)
            return;

        if(director.fps === 60){
            requestAnimFrame(function(){
                frame(director, fps, time);
            });
        }else{
            if(fps !== director.fps){
                fps = director.fps;
                time = 1000 / director.fps;
            }
            setTimeout(function(){
                frame(director, fps, time);
            }, time)
        }
    };

    /**
     * @param {String|Object} option
     * @param {String} [value=]
     */
    director.prototype.set = function(option, value){
        if(typeof option === "string" && typeof value === "string")
            option = {option: value};

        for(var p in option){
            this[p] = option[p];
        }
    };

    director.prototype.stop = function(){
        this.running = false;
    };

    director.prototype.start = function(){
        if(this.running === false){
            this.running = true;
            frame(this, this.fps, 1000 / this.fps);
        }
    };

    director.prototype.addCanvas = function(canvas){
        this.canvas.push(canvas);
    };

    director.prototype.removeCanvas = function(canvas){
        var list = this.canvas;
        list.splice(list.indexOf(canvas), 1);
    };

    (function(w){
        var timer = null;
        var defaultTime = 1000 / 60;

        w.requestAnimFrame =
            w.requestAnimationFrame ||
            w.webkitRequestAnimationFrame ||
            w.mozRequestAnimationFrame ||
            w.oRequestAnimationFrame ||
            w.msRequestAnimationFrame ||
            function(callback){
                timer = setTimeout(function(){
                    callback();
                }, defaultTime);
            };

        w.cancelAnimationFrame =
            w.cancelAnimationFrame ||
            w.cancelRequestAnimationFrame ||
            w.msCancelRequestAnimationFrame ||
            w.mozCancelRequestAnimationFrame ||
            w.oCancelRequestAnimationFrame ||
            w.webkitCancelRequestAnimationFrame ||
            w.msCancelAnimationFrame ||
            w.mozCancelAnimationFrame ||
            w.webkitCancelAnimationFrame ||
            w.oCancelAnimationFrame ||
            function(){
                clearTimeout(timer);
            };
    })(window);

    exports.create = function(option){
        return new director(option);
    };
});