function Player(img, x, y) {
	this.x = x || 0;
	this.y = y || 0;
	this.img = img;
	this.speed = 5;

}

Player.prototype.draw = function (ctx) {
	//Debug.log('Entering Player.draw');

	Game.board.ctx.drawImage(this.img, this.x, this.y, this.img.width, this.img.height);
};

Player.prototype.move = function(direction) {
	switch (direction) {
		case 'right': 
			if (this.x + this.img.width >= Game.board.canvas.width || this.wouldCollideWithIndestructibleWall()) {
				Debug.warn("Can't move right anymore");
				break;
			}

			this.x += this.speed; 

			break;
		case 'left':
			if (this.x <= 0) {
				Debug.warn("Can't move left anymore");
				break;
			}
			this.x -= this.speed;
			break;
		case 'up':
			if (this.y <= 0) {
				Debug.warn("Can't move upwards anymore");
				break;
			}
			
			this.y -= this.speed;
			break;
		case 'down':
			if (this.y + this.img.height >= Game.board.canvas.height)
			{
				Debug.warn("Can't move downwards anymore");
				break;
			}
			this.y += this.speed;

			break;
		default:
			throw 'MovementDirectionException';
	}
}

Player.prototype.wouldCollideWithIndestructibleWall = function () {
	var rightBorder = this.x + this.img.width;
	var bottomBorder = this.y + this.img.height;
	Debug.log(parseInt(Game.board.canvas.height / this.y));
	Debug.log(parseInt(Game.board.canvas.height / this.y) % 2);
	var collisionRight = (check.isInt(rightBorder / 40) && parseInt(Game.board.canvas.height / this.y) % 2 === 1);
	var collisionLeft;
	if (collisionRight) return true;
		
}