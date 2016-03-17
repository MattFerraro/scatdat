
function draw(canvas, statuses){
	var ctx = canvas.getContext("2d");
    // Clear the background
    ctx.fillStyle = "rgb(200,200,200)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // mens
    ctx.fillStyle = "#D4A190";
    ctx.fillRect(0, 0, canvas.width / 3, canvas.height);

    // unisex
    ctx.fillStyle = "#C390D4";
    ctx.fillRect(canvas.width / 3, 0, canvas.width / 3, canvas.height);

    // womens
    ctx.fillStyle = "#90c3d4";
    ctx.fillRect(canvas.width / 3 * 2, 0, canvas.width / 3, canvas.height);

    ctx.fillStyle = "#000000";
    ctx.font = "30px Arial";
    ctx.fillText("Men's", 10, 40);
    ctx.fillText("Unisex", canvas.width / 3 + 10, 40);
    ctx.fillText("Women's", canvas.width / 3 * 2 + 10, 40);

    colorMapping = {
    	'occupied': 'brown',
    	'open': 'green'
    };

    var keys = _.keys(statuses);

    var mensUpstairsKeys = _.filter(keys, function(key) {
        var lower = key.toLowerCase();
        if (lower.indexOf("floor2") >= 0 && lower.indexOf("mens") >= 0) {
            return true;
        }
        return false;
    });

    var womensUpstairsKeys = _.filter(keys, function(key) {
        var lower = key.toLowerCase();
        if (lower.indexOf("floor2") >= 0 && lower.indexOf("women") >= 0) {
            return true;
        }
        return false;
    });

    var unisexUpstairsKeys = _.filter(keys, function(key) {
        var lower = key.toLowerCase();
        if (lower.indexOf("floor2") >= 0 && lower.indexOf("unisex") >= 0) {
            return true;
        }
        return false;
    });


    var mensDownstairsKeys = _.filter(keys, function(key) {
        var lower = key.toLowerCase();
        if (lower.indexOf("floor1") >= 0 && lower.indexOf("mens") >= 0) {
            return true;
        }
        return false;
    });

    var womensDownstairsKeys = _.filter(keys, function(key) {
        var lower = key.toLowerCase();
        if (lower.indexOf("floor1") >= 0 && lower.indexOf("women") >= 0) {
            return true;
        }
        return false;
    });

    var unisexDownstairsKeys = _.filter(keys, function(key) {
        var lower = key.toLowerCase();
        if (lower.indexOf("floor1") >= 0 && lower.indexOf("unisex") >= 0) {
            return true;
        }
        return false;
    });


    // Draw the circles
    var i = 0;
    _.each(mensUpstairsKeys, function(key) {
        var val = statuses[key];
        drawCircle(ctx, i * 150 + 100, 100, 50, colorMapping[val.status]);
        i++;
    });
    i = 0;
    _.each(unisexUpstairsKeys, function(key) {
        var val = statuses[key];
        drawCircle(ctx, i * 150 + 100 + canvas.width / 3, 100, 50, colorMapping[val.status]);
        i++;
    });
    i = 0;
    _.each(womensUpstairsKeys, function(key) {
        var val = statuses[key];
        drawCircle(ctx, i * 150 + 100 + canvas.width / 3 * 2, 100, 50, colorMapping[val.status]);
        i++;
    });


    i = 0;
    _.each(mensDownstairsKeys, function(key) {
        var val = statuses[key];
        drawCircle(ctx, i * 150 + 100, 250, 50, colorMapping[val.status]);
        i++;
    });
    i = 0;
    _.each(unisexDownstairsKeys, function(key) {
        var val = statuses[key];
        drawCircle(ctx, i * 150 + 100 + canvas.width / 3, 250, 50, colorMapping[val.status]);
        i++;
    });
    i = 0;
    _.each(womensDownstairsKeys, function(key) {
        var val = statuses[key];
        drawCircle(ctx, i * 150 + 100 + canvas.width / 3 * 2, 250, 50, colorMapping[val.status]);
        i++;
    });
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
