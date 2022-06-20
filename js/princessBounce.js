/* Reused and modified code from an old project that never got released
   A bit messy by my current code standards
   But so it goes */

// Window resolution
var width, height;

// Canvas, context, and bookworm
var canvas, context, twiImg;

// Number of Twis to draw
var sparkles;

// Length/Height of Twi
var twiSize;

// Positional variables
var twiPos, twiVel;

var drawInterval;

function bounceInit(s) {
	// Get canvas variables
	canvas = document.getElementById("bounceCanvas");
	context = canvas.getContext("2d");
	
	resize();

	sparkles = s;

	// Set up initial pos
	var initPos = [Math.round((width * 0.5) - 1), Math.round((height * 0.5) -1)];
	twiPos = new Array(sparkles);
	for (var i = 0; i < sparkles; i++) {
		twiPos[i] = [Math.round((width * 0.5) - 1), Math.round((height * 0.5) -1)];
	}

	// Set up initial velocities
	twiVel = new Array(sparkles);
	for (var i = 0; i < sparkles; i++) {
		twiVel[i] = randomVel();
	}

	// sudo apt-get twi
	twiImg = document.getElementById('face');

	drawInterval = setInterval(draw, 25);
}

function draw() {
	// Check for window resizes
	resize(false);

	var d = (twiSize / 2);
	//context.clearRect(twiPos[0] - d - 25, twiPos[1] - d - 25, twiSize + 50, twiSize + 50);

	for (var s = 0; s < sparkles; s++) {
		//console.log("s - " + s.toString());
		//console.log("x - " + twiPos[s][0].toString() + " y - " + twiPos[s][1].toString());
		context.drawImage(twiImg, twiPos[s][0] - (twiImg.width / 2), twiPos[s][1] - (twiImg.height / 2), twiImg.width, twiImg.height);

		twiPos[s][0] += twiVel[s][0];
		twiPos[s][1] += twiVel[s][1];

		collision(s);
	}
}

function collision(s) {
	if (twiPos[s][0] - (twiImg.width / 2) <= 0) {
		twiVel[s][0] = Math.abs(twiVel[s][0]);
	} else if (twiPos[s][0] + (twiImg.width / 2) >= width) {
		twiVel[s][0] = Math.abs(twiVel[s][0]) * -1;
	} else if (twiPos[s][1] - (twiImg.height / 2) <= 0) {
		twiVel[s][1] = Math.abs(twiVel[s][1]);
	} else if (twiPos[s][1] + (twiImg.height / 2) >= height) {
		twiVel[s][1] = Math.abs(twiVel[s][1]) * -1;
	}
}

function randomVel() {
	var r = [Math.random(), Math.random(), Math.random(), Math.random()];
	var d = [1, 1];
	var v = [0.5, 0.5];

	// Get direction
	for (var i = 0; i < 2; i++) {
		if (r[i] <= 0.5) {
			d[i] = 1;
		} else {
			d[i] = -1;
		}
	}

	// Get speed
	var s = 30;

	// Get angle
	var a = ((r[3] * 0.9) + 0.05) * (Math.PI * 0.5);

	// Calculate velocities
	v[0] = (Math.sin(a) * s) * d[0];
	v[1] = (Math.cos(a) * s) * d[1];

	return v;
}

function randomRot() {
	var r = [Math.random(), Math.random()];
	var d;
	if (r[1] <= 0.5) {
		d = 1; 
	} else {
		d = -1;
	}

	return Math.floor((r[0] + 1) * 5) * d;
}

function canvasResize() {
	// Set canvas resolution
	canvas.width = width;
	canvas.height = height;
}

function resize(force) {
	// Check window resolution
	var oldWidth = width;
	var oldHeight = height;
	width = window.innerWidth;
	height = window.innerHeight;

	if (force || oldWidth !== width || oldHeight !== height) canvasResize();
}

function canvasClear() {
	clearInterval(drawInterval);
	context.clearRect(0, 0, width, height);
}