window.onload = function () {
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		context2 = canvas.getContext("2d"),
		width = canvas.width  = window.innerWidth,
		height = canvas.height = window.innerHeight;

	var centerY = height * .5,
		centerX = width * .5,
		offset = height * .4,
		speed = 0.1,
		angle = 0;

	render();

	function render() {

		var y = centerY + Math.sin(angle) * offset;
		var base = 200;
		var x = (angle / (Math.PI *2)) * base;

		if (x >= base) {
			angle -= Math.PI * 2;
		}

		context.clearRect(0, 0, width, height);

		for (i=0; i< 2* Math.PI; i+=0.01) {
			context2.fillRect(centerX + (i / (Math.PI *2)) * base, centerY + Math.sin(i) * offset, 1, 1);
		}
		context2.stroke();

		context.beginPath();
		context.arc(centerX + x, y, 20, 0, Math.PI * 2, false);
		context.fill()

		angle += speed;

		requestAnimationFrame(render);
	}
};
