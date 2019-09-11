window.onload = function () {
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width  = window.innerWidth,
		height = canvas.height = window.innerHeight;

	context.translate(0, height/2);
	for (i=0; i< 2* Math.PI; i+=0.01) {
		context.fillRect(i * 200, 200 * Math.sin(i), 1, 1);
	}
	for (i=0; i< 2 * Math.PI; i+=0.01) {
		context.fillRect(i * 200, 200 * Math.cos(i), 1, 1);
	}
	context.stroke();
};
