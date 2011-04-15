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
			if (this.x + this.img.width >= Game.board.canvas.width || this.wouldCollideWithIndestructibleWall(direction)) {
				Debug.warn("Can't move right anymore");
				break;
			}

			this.x += this.speed; 

			break;
		case 'left':
			if (this.x <= 0 || this.wouldCollideWithIndestructibleWall(direction)) {
				Debug.warn("Can't move left anymore");
				break;
			}
			this.x -= this.speed;
			break;
		case 'up':
			if (this.y <= 0 || this.wouldCollideWithIndestructibleWall(direction)) {
				Debug.warn("Can't move upwards anymore");
				break;
			}
			
			this.y -= this.speed;
			break;
		case 'down':
			if (this.y + this.img.height >= Game.board.canvas.height || this.wouldCollideWithIndestructibleWall(direction))
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

Player.prototype.wouldCollideWithIndestructibleWall = function (direction) {
	var rightBorder = this.x + this.img.width;
	var bottomBorder = this.y + this.img.height;
	
	var imageTopIsInLineNumber = this.y / this.img.height;
	var imageLeftIsInColumnNumber = this.x / this.img.width;
	var imageBottomIsInLineNumber = bottomBorder / this.img.height;
	var imageRightIsInColumnNumber = rightBorder / this.img.width;
	
	switch (direction)
	{
		case 'right':
			if ((!check.isInt(imageBottomIsInLineNumber) && !check.isInt(imageTopIsInLineNumber) && check.isInt(rightBorder / 40) 
				&& (parseInt(imageTopIsInLineNumber) % 2 === 0) || (parseInt(imageBottomIsInLineNumber) % 2 === 0)))
			{
				return true;
			}
			break;
		case 'left':
			if ((!check.isInt(imageBottomIsInLineNumber) && !check.isInt(imageTopIsInLineNumber) && check.isInt(this.x / 40) 
				&& (parseInt(imageTopIsInLineNumber) % 2 === 0) || (parseInt(imageBottomIsInLineNumber) % 2 === 0))) 
			{
				return true;
			}
			break;
		case 'up':
			if ((!check.isInt(imageLeftIsInColumnNumber) && !check.isInt(imageRightIsInColumnNumber) && check.isInt(this.y / 40) 
				&& (parseInt(imageRightIsInColumnNumber) % 2 === 1) || (parseInt(imageLeftIsInColumnNumber) % 2 === 1)))
			{
				return true;
			}
			break;
		case 'down':
				if ((!check.isInt(imageLeftIsInColumnNumber) && !check.isInt(imageRightIsInColumnNumber) && check.isInt(bottomBorder / 40) 
					&& (parseInt(imageRightIsInColumnNumber) % 2 === 1) || (parseInt(imageLeftIsInColumnNumber) % 2 === 1)))
				{
					return true;
				}
				break;
		
		default: 
			Debug.error('Not implemented yet');
	}
}