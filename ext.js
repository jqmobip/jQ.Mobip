/**
 * import js/css files.
 *
 * @param mixed file
 *     string one file.
 *     array files.
 * @param function callback.
 * @param integer callID internel use only.
 */
function $importJS(file){
	
	
}
function $importCSS(){
	
}
function include(file, callback, callID) {
    var f = arguments.callee;
 
    f.head = document.head || document.getElementsByTagName( "head" )[0] || document.documentElement;
    if (typeof f.queue === "undefined") {
        // Scan exist scripts.
        f.queue = (function () {
            var queue   = {},
                scripts = document.getElementsByTagName("script"),
                styles  = document.getElementsByTagName("link");
            for (var i = 0, l = scripts.length; i < l; i++) {
                scripts[i].src ? queue[scripts[i].src] = true : null;
            }
            for (var i = 0, l = styles.length; i < l; i++) {
                styles[i].href ? queue[styles[i].href] = true : null;
            }
            return queue;
        })();
    }
    // Include single file.
    if (typeof file === "string") {
        var elem, src, type = file.split(".").pop();
        if (type === "js") {
            elem = document.createElement("script");
            elem.setAttribute("type", "text/javascript");
            elem.setAttribute("async", "async");
            elem.setAttribute("src", file);
        } else {
            elem = document.createElement("link");
            elem.setAttribute("rel", "stylesheet");
            elem.setAttribute("type", "text/css");
            elem.setAttribute("href", file);
        }
        src = type === "js" ? elem.src : elem.href;
        if (typeof f.queue[src] === "undefined") {
            f.queue[src] = false;
        }
        // File is loaded, just run callback.
        if (f.queue[src] === true) {
            elem = null;
            f.recall[callID] && f.recall[callID].isNotLoad--;
            callback && callback();
            return;
        } else {
            elem.onload = elem.onreadystatechange = function () {
                if ( !elem.readyState || /loaded|complete/.test(elem.readyState) ) {
                    f.queue[src] = true;
                    f.recall[callID].isNotLoad--;
                    // Handle memory leak in IE
                    elem.onload = elem.onreadystatechange = null;
                    // Dereference the script
                    elem = undefined;
                    callback && callback();
                    if (! f.recall[callID].isNotLoad) {
                        f.recall[callID].callback && f.recall[callID].callback();
                    }
                }
            };
        }
        f.head.appendChild(elem);
    } else {
        if (typeof f.ID === "undefined") {
            f.ID = 0;
            f.recall = {};
        }
        f.ID++;
        // Include array files.
        f.recall[f.ID] = {callback: callback, isNotLoad: file.length};
        for (var i = 0, l = file.length; i < l; i++) {
            var _file = typeof file[i] === "string" ? file[i] : file[i][0],
                _call = typeof file[i] === "string" ? function () {} : file[i][1];
            arguments.callee(_file, _call, f.ID);
        }
    }
}