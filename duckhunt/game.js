
//draws a few duckhunt sprites to the canvas
function draw() {
	var canvas = document.getElementById('game');
	if (canvas.getContext) {
		var ctx = canvas.getContext('2d');
		var sprite_sheet = new Image();
		sprite_sheet.src = "assets/duckhunt.png";
		sprite_sheet.onload = function() {
			//sky
			ctx.fillStyle = "#87CEEB";
			ctx.fillRect(0, 0, 800, 500);

			//tree
			ctx.drawImage(sprite_sheet, 0, 270, 75, 150, 0, 50, 250, 500);

			//ground
			ctx.fillStyle = "#C96A1B";
			ctx.fillRect(0, 550, 800, 50);
			ctx.drawImage(sprite_sheet, 0, 600, 800, 300, 0, 250, 800, 300);

			//doge
			ctx.drawImage(sprite_sheet, 0, 0, 60, 50, 230, 440, 162, 135);

			//birds
			ctx.drawImage(sprite_sheet, 0, 120, 40, 30, 200, 70, 68, 51);
			ctx.drawImage(sprite_sheet, 205, 120, 40, 30, 500, 100, 68, 51);
			ctx.drawImage(sprite_sheet, 300, 157, 40, 30, 260, 200, 68, 51);
			ctx.drawImage(sprite_sheet, 300, 120, 40, 30, 270, 110, 68, 51);
			ctx.drawImage(sprite_sheet, 40, 120, 40, 30, 600, 200, 68, 51);
		}.bind(this);
	} else {
		alert('Sorry, canvas not supported by your browser!');
	}
}