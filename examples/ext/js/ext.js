/**
 * import js/css files.
 *
 * @param mixed file
 *     string one file.
 *     array files.
 * @param function callback.
 * @param integer callID internel use only.
 */

var $__EXIST_JS__ = {};

function $import(jsUrl) {
	if($__EXIST_JS__[jsUrl])
		return;
	var scriptNode = document.createElement('script');
	scriptNode.type = 'text/javascript';
	scriptNode.src = jsUrl;
	var headNode = document.getElementsByTagName("head")[0];
	headNode.appendChild(scriptNode);
	$__EXIST_JS__[jsUrl] = 1;
}

function $importJS(jsfile, folder) {
	var fol = folder;
	if( typeof (fol) == "undefined") {
		fol = "";
	}else{
		fol = folder + "/";
	}
	alert(fol);
	var scriptNode = document.getElementsByTagName('script');
	var srcStart, srcEnd;
	for( i = 0; i < scriptNode.length; i++) {
		var JSsrc = scriptNode[i].src;
		if(JSsrc.match("js/ext.js") == "js/ext.js") {
			var str = new Array();
			str = JSsrc.split('/ext.js');
			srcStart = str[0];
		}
	}

	var jsUrl = srcStart + "/" + fol + jsfile + ".js";
	$import(jsUrl);
}

var $__EXIST_PLUGINS__ = {};
function $importPlugin(pluginName) {
	var scriptNode = document.getElementsByTagName('script');
	var srcStart, srcEnd;
	for( i = 0; i < scriptNode.length; i++) {
		var JSsrc = scriptNode[i].src;
		if(JSsrc.match("jq.mobi.js") == "jq.mobi.js") {
			var str = new Array();
			str = JSsrc.split('/jq.mobi');
			srcStart = str[0];
			srcEnd = str.pop();
		}

	}
	var jsUrl = srcStart + "/plugins/jq." + pluginName + srcEnd;
	$import(jsUrl);
}

var $__EXIST_CSS__ = {};
function $importCSS(cssUrl) {
	if($__EXIST_CSS__[cssUrl])
		return;
	var linkNode = document.createElement('link');
	linkNode.type = 'text/css';
	linkNode.rel = 'stylesheet';
	linkNode.href = cssUrl;
	var headNode = document.getElementsByTagName("head")[0];
	headNode.appendChild(linkNode);
	$__EXIST_CSS__[cssUrl] = 1;
}