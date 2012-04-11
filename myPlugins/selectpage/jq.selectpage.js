/**
 * @author liwei
 */
/**
 * @author liwei
 */
var _fightsCos = [{
	"key" : "",
	"content" : "不限"
}, {
	"key" : "CA",
	"content" : "中国国航"
}, {
	"key" : "MU",
	"content" : "东方航空"
}, {
	"key" : "CZ",
	"content" : "南方航空"
}, {
	"key" : "HU",
	"content" : "海南航空"
}, {
	"key" : "3U",
	"content" : "四川航空"
}, {
	"key" : "SC",
	"content" : "山东航空"
}, {
	"key" : "VD",
	"content" : "河南航空"
}, {
	"key" : "NS",
	"content" : "河北航空"
}, {
	"key" : "FM",
	"content" : "上海航空"
}, {
	"key" : "JD",
	"content" : "首都航空"
}, {
	"key" : "0Q",
	"content" : "重庆航空"
}, {
	"key" : "GS",
	"content" : "天津航空"
}, {
	"key" : "MF",
	"content" : "厦门航空"
}, {
	"key" : "ZH",
	"content" : "深圳航空"
}, {
	"key" : "EU",
	"content" : "成都航空"
}, {
	"key" : "9C",
	"content" : "春秋航空"
}, {
	"key" : "8L",
	"content" : "祥鹏航空"
}, {
	"key" : "PN",
	"content" : "西部航空"
}, {
	"key" : "KN",
	"content" : "中国联合航空"
}, {
	"key" : "CN",
	"content" : "大新华航空"
}, {
	"key" : "IJ",
	"content" : "长城航空"
}, {
	"key" : "HO",
	"content" : "吉祥航空"
}, {
	"key" : "G5",
	"content" : "华夏航空"
}, {
	"key" : "KY",
	"content" : "昆明航空"
}, {
	"key" : "JR",
	"content" : "幸福航空"
}];

var handleEve;
(function($) {
	$.fn["selectpage"] = function(opts, hf) {
		handleEve = hf;

		var tmp;
		for(var i = 0; i < this.length; i++) {
			tmp = new selectpage(this[i], opts);
		}
		return this.length == 1 ? tmp : this;
	};
	var selectpage = (function() {
		if(!window.WebKitCSSMatrix)
			return;
		var selectpage = function(elID, opts) {

			if( typeof elID == "string" || elID instanceof String) {
				this.el = document.getElementById(elID);
			} else {
				this.el = elID;
			}
			if(!this.el) {
				alert("Could not find element for selectpage " + elID);
				return;
			}

			if(this instanceof selectpage) {
				if( typeof (opts) == "object") {
					for(j in opts) {
						this[j] = opts[j];
					}
				}
			} else {
				return new selectpage(elID, opts);
			}

			try {
				var that = this;
				var markStart = '<div id="jq_selectpage" title="选择航空公司" data-footer="none" class="panel"><ul>';
				var markEnd = "</ul></div>";
				var markup;
				markup = $(markStart + markEnd);

				if(opts != null && typeof opts == "object") {

					var container = $(markup.children().get());
					for( i = 0; i < opts.length; i++) {
						var key = opts[i].key;
						var content = opts[i].content;
						var item = $('<li><a href="javascript:;" onclick=getValue("' + key + '","' + content + '")>' + content + '</a></li>');
						container.append(item);
					}
				}

				$(elID).find("#jq_selectpage").remove();
				selectpageEl = $(elID).append(markup);
				$("#jq_selectpage ul").scroller({});
				$.ui.loadContent("#jq_selectpage");
				markup.on("click", "a",function(){
					that.hidePage();
				});

				this.activePage = markup;

				// setTimeout(function() {
				// markup.get().style.webkitTransition = "all 200ms";
				// markup.css("bottom", "0px");
				// }, 10);
			} catch (e) {
				alert("error adding selectpage" + e);
			}
		};

		getValue = function(k, c) {
			handleEve(k,c);
		};
		
		selectpage.prototype = {
			
			activePage : null,
			hidePage : function() {
				var that = this;

				this.activePage.off("click", "a", function() {
					$.ui.goBack();
					that.hidePage()
				});

				this.activePage.remove();
				this.activePage = null;
				this.el.style.overflow = "none";

			}
		};

		return selectpage;
		
	})();
})(jq);
