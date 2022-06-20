var visible = false;

window.addEventListener('DOMContentLoaded', function() {
	document.getElementById('face').onclick = function() {
		if (!visible) {
			bounceInit(7);
			visible = true;
		} else {
			canvasClear();
			visible = false;
		}
	};
});