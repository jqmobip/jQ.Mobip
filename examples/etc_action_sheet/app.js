/**
 * @author Administrator
 */
$.ui.ready(function() {
	$.ui.setTitle('action_sheet');
	initActSheet();
})
function initActSheet() {
	var title = {
		text : "123"		
	}
	var content = [{
		text : "123",
		cssClasses : '',
		handler : function() {
			alert(123);
		}
	}, {
		text : "123",
		cssClasses : '',
		handler : function() {
			alert(123);
		}
	}, {
		text : "123",
		cssClasses : '',
		handler : function() {
			alert(123);
		}
	}]
	$('#jQUi').act_sheet(title, content)
}