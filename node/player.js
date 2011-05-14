var Bomb = require('./bomb.js').mBomb;

function Player(x, y, id) {
	this.id = id;
	this.x = x * 40 || 0;
	this.y = y * 40 || 0;
	this.speed = 5;
	this.bombsAvailable = 1;
	this.dead = false;
}

Player.prototype.hasAvailableBombs = function () {
	return this.bombsAvailable > 0 ? true : false;
}

/**
	@brief	Moves player in given direction
	@direction	string could be left, right, up, down
*/
Player.prototype.move = function(direction) {
	if (this.dead) console.log("can't move, you're dead");

	switch (direction) {
		case 'right': 
			if (this.wouldCollide(direction)) {
				Debug.warn("Can't move right anymore");
				break;
			}

			this.x += this.speed;
			break;
		case 'left':
			if (this.wouldCollide(direction)) {
				Debug.warn("Can't move left anymore");
				break;
			}
			
			this.x -= this.speed;
			break;
		case 'up':
			if (this.wouldCollide(direction)) {
				Debug.warn("Can't move upwards anymore");
				break;
			}
			
			this.y -= this.speed;
			break;
		case 'down':
			if (this.wouldCollide(direction))
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


/**
	@brief  Returns actual coordinates
        @return array [x, y] (in pixels)
*/
Player.prototype.getRealCoordinates = function () {
	return [this.x, this.y];
}

Player.prototype.setCoordinates = function (coordinates) {
	this.x = coordinates[0];
	this.y = coordinates[1];
}

/**
	@brief	Returns actual block's position in gameboard's grid
	@return	array [x, y]
*/
Player.prototype.isInBlock = function() {
	return [parseInt(this.x / 40), parseInt(this.y / 40)];
}

Player.prototype.canWalkThroughBlock = function (blockType) {
	if (blockType === 0 || blockType === 3)
	{
		return true
	}
	else
	{
		return false;
	}
}

Player.prototype.placeBomb = function (Game) {
	if (this.hasAvailableBombs())
	{
		var actualBlock = this.isInBlock();
		var actualBlockType = Game.board.getBlockType(actualBlock);
		if (actualBlockType !== 4) /* Has no bomb yet */
		{
			var bomb = new Bomb(actualBlock, this, Game);
			
			setTimeout(function () {
				bomb.explode();
			}, 2500);
		}
		Game.players[this.id].socket.send({
			'msg' : 'updateBoard',
			'parameters' : {
				'cells' : Game.board.cells
			}
		});
		Game.players[this.id].socket.broadcast({
			'msg' : 'updateBoard',
			'parameters' : {
				'cells' : Game.board.cells
			}
		});
	}
}

Player.prototype.wouldCollide = function (direction) {
	var nextBlockType;
	var nextBlockPositionToBe;
	var currentBlockPosition = this.isInBlock();
	
	switch (direction) {
		// Board is 600x600, sprites are 40x40 => 15 cells
		/* Block codes 
		0 = empty
		1 = destructible
		2 = indestructible
		3 = bonus
		4 = bomb
		*/
		case 'right':
			if (!check.isInt(this.x / Game.board.cellSize))	return false;
			if (currentBlockPosition[0] == 14 && (this.x + this.img.width) < Game.board.canvas.width) return false;
			else if ((this.x + this.img.width) >= Game.board.canvas.width) return true;
			
			nextBlockPositionToBe = [currentBlockPosition[0] + 1, currentBlockPosition[1]];
			nextBlockType = Game.board.getBlockType(nextBlockPositionToBe);

			if (check.isInt(this.y) && !this.canWalkThroughBlock(nextBlockType)) return true;
			else if (check.isInt(this.y / Game.board.cellSize)) return false;
            
			return true;
			break;
		case 'left':
			if (!check.isInt(this.x / Game.board.cellSize))	return false;
			if (currentBlockPosition[0] == 0 && this.x > 0)	return false;
			else if (this.x <= 0) return true;
			
			nextBlockPositionToBe = [currentBlockPosition[0] - 1, currentBlockPosition[1]];
			nextBlockType = Game.board.getBlockType(nextBlockPositionToBe);

			if (check.isInt(this.y) && !this.canWalkThroughBlock(nextBlockType)) return true;
			else if (check.isInt(this.y / Game.board.cellSize)) return false;
			
			return true;
			break;
		case 'up':
			if (!check.isInt(this.y / Game.board.cellSize))	return false;
			if (currentBlockPosition[1] == 0 && this.y > 0)	return false;
			else if (this.y <= 0) return true;
			
			nextBlockPositionToBe = [currentBlockPosition[0], currentBlockPosition[1] - 1];
			nextBlockType = Game.board.getBlockType(nextBlockPositionToBe);
			
			if (check.isInt(this.x) && !this.canWalkThroughBlock(nextBlockType)) return true;
			else if (check.isInt(this.x / Game.board.cellSize))	return false;
			
			return true;
			break;
		case 'down':
			if (!check.isInt(this.y / Game.board.cellSize))	return false;
			if (currentBlockPosition[1] == 14 && (this.y + this.img.height) < Game.board.canvas.height)	return false;
			else if (this.y + this.img.height >= Game.board.canvas.height) return true;
			
			nextBlockPositionToBe = [currentBlockPosition[0], currentBlockPosition[1] + 1];
			nextBlockType = Game.board.getBlockType(nextBlockPositionToBe);
			
			if (!this.canWalkThroughBlock(nextBlockType)) return true;
			else if (check.isInt(this.x / Game.board.cellSize))	return false;
			
			return true;
			break;
		default:
			throw 'MovementDirectionException';
	}
}


// Exports for node.js
exports.mPlayer = Player;
