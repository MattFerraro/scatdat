function initialize() {
	var stalls = [];
	var oneStall = {
		'floor': 1,
		'status': 'occupied',
		'gender': 'm'
	};

	var twoStall = {
		'floor': 1,
		'status': 'occupied',
		'gender': 'm'
	};

	var redStall = {
		'floor': 0,
		'status': 'open',
		'gender': 'm'
	};

	var blueStall = {
		'floor': 0,
		'status': 'open',
		'gender': 'm'
	};

	var alphaStall = {
		'floor': 0,
		'status': 'open',
		'gender': 'm'
	};

	var betaStall = {
		'floor': 0,
		'status': 'occupied',
		'gender': 'm'
	};

	stalls.push(oneStall);
	stalls.push(twoStall);
	stalls.push(redStall);
	stalls.push(blueStall);
	stalls.push(alphaStall);
	stalls.push(betaStall);
	return stalls;
}

function draw(canvas, stalls){
	var ctx = canvas.getContext("2d");
    // Clear the background
    ctx.fillStyle = "rgb(200,200,200)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    colorMapping = {
    	'occupied': 'brown',
    	'open': 'green'
    };

    // Draw the circles
    for (var i = stalls.length - 1; i >= 0; i--) {
        var stall = stalls[i];
        drawCircle(ctx, i * 150 + 100, 200, 50, colorMapping[stall.status]);
    }
}

function drawCircle(ctx, x, y, r, color) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI, false);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#003300';
    ctx.stroke();
}