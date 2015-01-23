h.module("T.main", function(require, exports){

    var director = require("director").create(),
        canvas = require("canvas").create();

    h.load([
        "./test/canvas/create.js"
    ], function(){

        director.addCanvas(canvas);
        director.start();
        window.director = director;
        window.camera = director.canvas[0].camera;

        h.module.run("T.canvas.create");
    });
});