/**
 * @author Administrator
 */

/**
 * jq.web.act_sheet - a act_sheet for html5 mobile apps
 * Copyright 2012 - AppMobi 
 */
(function($) {
	var title = {};
    $.fn["act_sheet"] = function(tit,opts) {
    	title = tit;
        var tmp;
        for (var i = 0; i < this.length; i++) {
            tmp = new act_sheet(this[i], opts);
        }
        return this.length == 1 ? tmp : this;
    };
    var act_sheet = (function() {
        if (!window.WebKitCSSMatrix)
            return;
        var act_sheet = function(elID,opts) {
        	
            if (typeof elID == "string" || elID instanceof String) {
                this.el = document.getElementById(elID);
            } else {
                this.el = elID;
            }
            if (!this.el) {
                alert("Could not find element for act_sheet " + elID);
                return;
            }
            
            
            if (this instanceof act_sheet) {
                if(typeof(opts)=="object"){
                for (j in opts) {
                    this[j] = opts[j];
                }
                }
            } else {
                return new act_sheet(elID, opts);
            }
            
            
            try {
                var that = this;
                $.ui.blockUI(.5);                
               
                var markStart = '<div id="jq_act_sheet"><div class="sheetTitle"><h5 id="as_title"></h5><a href="javascript:;" class="button cancel">取消</a></div><div class="as_content">';
                var markEnd = '</div></div>';
                var markup;
                 
                if (typeof opts == "string") {
                    markup = $(markStart + opts +"<div class='sheetTitle'><h5>xxxxxxxxx</h5><a href='javascript:;' class='cancel'>取消</a></div>"+markEnd);
                } else if (typeof opts == "object") {
                    markup = $(markStart + markEnd);
                    var container = $(markup.children(".as_content").get());
                       for (var i = opts.length-1; i >=0 ; i--) {
                        var item = $('<a href="javascript:;" >' + (opts[i].text || "TEXT NOT ENTERED") + '</a><hr />');
                        item[0].onclick = (opts[i].handler || function() {});
                        if (opts[i].cssClasses && opts[i].cssClasses.length > 0)
                            item.addClass(opts[i].cssClasses);
                        container.append(item);
                    }
                }
                $(elID).find("#jq_act_sheet").remove();
                act_sheetEl = $(elID).append(markup);
                if(typeof title == "object"){
                 	// alert(title);
                 	if(title.text && title.text.length > 0){
                 		$(".sheetTitle h5").text(title.text);
                 	}
                	if(title.bgClasses && title.bgClasses.length > 0){
                		$(".sheetTitle").addClass(title.bgClasses);
                	}
                	if(title.cancelClasses && title.cancelClasses > 0){
                		$(".cancle").addClass(title.cancelClasses);
                	}
                	
                }
                
                markup.get().style.webkitTransition="all 0ms";
                markup.css("bottom", (-(parseInt(markup.css("height")) + 10)) + "px");
                this.el.style.overflow = "hidden";
                markup.on("click", "a",function(){that.hideSheet()});
                this.activeSheet=markup;
                
                setTimeout(function(){markup.get().style.webkitTransition="all 200ms";markup.css("bottom","0px");},10);
            } catch (e) {
                alert("error adding act_sheet" + e);
            }
        };
        act_sheet.prototype = {
            activeSheet:null,
            hideSheet: function() {
                var that=this;
                
                this.activeSheet.off("click","a",function(){that.hideSheet()});
                this.activeSheet.remove();
                this.activeSheet=null;
                this.el.style.overflow = "none";
                $.ui.unblockUI();
            }
        };
        return act_sheet;
    })();
})(jq);