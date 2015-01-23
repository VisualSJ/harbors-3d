(function(w, h){

    h.load = (function(){

        var list = {};

        var request = function(urlArray, callback){
            if(typeof urlArray === "string")
                urlArray = [urlArray];
            if(urlArray.length === 0)
                console.warn("load list is empty!");

            var index = 0,
                length = urlArray.length;
            var next = function(){
                if(++index >= length){
                    callback();
                }
            };

            urlArray.forEach(function(url){
                var script = document.createElement("script");
                var cb = function(){
                    next();
                    document.body.removeChild(script);
                };
                script.addEventListener("load", cb);
                script.addEventListener("error", cb);
                script.src = url;
                document.body.appendChild(script);
            });

        };

        request.getList = function(){
            return list;
        };

        return request;

    })();

})(window, h);