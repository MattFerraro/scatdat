
function draw(canvas, statuses){
	var ctx = canvas.getContext("2d");
    // Clear the background
    ctx.fillStyle = "rgb(200,200,200)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    colorMapping = {
    	'occupied': 'brown',
    	'open': 'green'
    };

    // Draw the circles
    var i = 0;
    _.mapObject(statuses, function(val, key) {
    	console.log("a status");
    	console.log(key);
    	console.log(val);
    	drawCircle(ctx, i * 150 + 100, 200, 50, colorMapping[val.status]);
    	i++;
    })
    // for (var i = statuses.length - 1; i >= 0; i--) {
    //     var stall = statuses[i];
    //     drawCircle(ctx, i * 150 + 100, 200, 50, colorMapping[stall.status]);
    // }
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