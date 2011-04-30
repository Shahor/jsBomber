function Bomb (coordinates)
{
	this.power = 1;
	this.x = coordinates[0];
	this.y = coordinates[1];
	this.timeBeforeExplosion = Game.FPS * 2;

	Game.board.changeBlockType(coordinates, 4);
	Game.bombs.push(this);
}

Bomb.prototype.explode = function () {
	var blocksToUpdate = [];
	
	
	blocksToUpdate.push({
		'type' : 4,
		'coordinates' : [this.x, this.y]
	});
	
	if (this.y > 0)
	{
		blocksToUpdate.push({
			'type' : Game.board.getBlockType([this.x, this.y - 1]),
			'coordinates' : [this.x, this.y - 1]
		});
	}
	if (this.y < 14)
	{
		blocksToUpdate.push({
			'type' : Game.board.getBlockType([this.x, this.y + 1]),
			'coordinates' : [this.x, this.y + 1]
		});
	}
	if (this.x > 0)
	{
		blocksToUpdate.push({
			'type' : Game.board.getBlockType([this.x - 1, this.y]),
			'coordinates' : [this.x - 1, this.y]
		});
	}
	if (this.x < 14)
	{
		blocksToUpdate.push({
			'type' : Game.board.getBlockType([this.x + 1, this.y]),
			'coordinates' : [this.x + 1, this.y]
		});
	}
	
	console.log("blocksToUpdate lenght " + blocksToUpdate.length);
	for (var i = 0; i < blocksToUpdate.length; i++)
	{
		switch (blocksToUpdate[i].type)
		{
			case 1:
				Game.board.changeBlockType(blocksToUpdate[i].coordinates, 0);
				break;
			case 3:
				Game.board.changeBlockType(blocksToUpdate[i].coordinates, 0);
				break;
			case 4:
				Game.board.changeBlockType(blocksToUpdate[i].coordinates, 0);
				break;
			case 0: /* empty */			
			case 2: /* indestructible */
			default:
				Debug.log("block type  " + blocksToUpdate[i].type);
				break;
		}
	}
}