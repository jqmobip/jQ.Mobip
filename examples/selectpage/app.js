/**
 * @author liwei
 */

function initselectpage() {
	var sp = $("#content").selectpage(_fightsCos, handler);
	$.ui.setTitle('selectPage');
	function handler() {
		alert(sp.itemValue);
		alert(sp.itemText);
		$.ui.goBack();
	}

}