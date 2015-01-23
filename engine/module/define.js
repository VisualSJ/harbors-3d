(function(w, h){

    h.module = (function(){

        var list = {};

        var module = function(name, closure){
            if(list[name])
                console.warn("Replace the module: %s", name);

            list[name] = {
                name: name,
                define: closure,
                exports: {},
                loaded: false
            };
        };

        module.getList = function(){
            return list;
        };

        module.run = function(name){
            var item = list[name];
            if(!item)
                return console.error("module error: %s isn't exists", name);

            if(item.loaded === false){
                item.loaded = true;
                item.define(module.run, item.exports);
            }

            return item.exports;
        };

        return module;

    })();

})(window, h);