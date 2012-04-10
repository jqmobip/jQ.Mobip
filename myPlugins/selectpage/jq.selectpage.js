/**
 * @author liwei
 */
(function($) {
	$.fn["selectpage"] = function(opts) {
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
						var item = $('<li><a href="javascript:" onclick="getCompanyCD(' + opts[i].index + ')">' + opts[i].name + '</a></li>');
						container.append(item);
					}
				}
				function getCompanyCD(code){
					alert(code);
					$.ui.goBack();
					that.hidePage();
				}
				

				$(elID).find("#jq_selectpage").remove();
				selectpageEl = $(elID).append(markup);
				$("#jq_selectpage ul").scroller({});  
				// markup.on("click", "a", function () {
					// $.ui.goBack();
					// that.hidePage();
				// });
				
				this.activePage = markup;

				// setTimeout(function() {
				// markup.get().style.webkitTransition = "all 200ms";
				// markup.css("bottom", "0px");
				// }, 10);
			} catch (e) {
				alert("error adding selectpage" + e);
			}
		};
function getCompanyCD(code){
					alert(code);
					$.ui.goBack();
					that.hidePage();
				}
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
