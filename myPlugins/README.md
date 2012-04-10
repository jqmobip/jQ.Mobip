#新增插件：
在原有插件基础上新增插件或按需求修改原有插件，为和原有区分将新增插件前缀设为ext(extpend扩展之意)。

#ext.act_sheet

在jq.actionsheet的基础上添加带标题栏的actionsheet

用法如下：

``` js
var title = {
		text:"选择仓位",
		bgClasses:"as_bg",
		cacelClasses:""
	}
	var content = [ {
		text : '时间顺序',
		cssClasses : 'action_sheet',
		handler : function() {
			alert('时间顺序');
		}
	}, {
		text : '价格顺序',
		cssClasses : 'action_sheet',
		handler : function() {
			alert('价格顺序');
		}
	},{
		text : '默认顺序',
		cssClasses : 'action_sheet',
		handler : function() {
			sort.hideSheet();
			alert('默认顺序');			
		}
	}];
	var sort = $('#jQUi').act_sheet(title,content);
```
