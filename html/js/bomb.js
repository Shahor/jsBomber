function Bomb (coordinates, player)
{
	this.player = player;
	this.power = 1;
	this.x = coordinates[0];
	this.y = coordinates[1];
	this.timeBeforeExplosion = Game.FPS * 2;

	if (this.player.hasAvailableBombs())
	{
		this.player.bombsAvailable -= 1;
		Game.board.changeBlockType(coordinates, 4);
		Game.bombs.push(this);
	}
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
			'coordinates' : [this.x, this.y - 1],
			'direction' : 'left'
		});
	}
	if (this.y < 14)
	{
		blocksToUpdate.push({
			'type' : Game.board.getBlockType([this.x, this.y + 1]),
			'coordinates' : [this.x, this.y + 1],
			'direction' : 'down'
		});
	}
	if (this.x > 0)
	{
		blocksToUpdate.push({
			'type' : Game.board.getBlockType([this.x - 1, this.y]),
			'coordinates' : [this.x - 1, this.y],
			'direction' : 'left'
		});
	}
	if (this.x < 14)
	{
		blocksToUpdate.push({
			'type' : Game.board.getBlockType([this.x + 1, this.y]),
			'coordinates' : [this.x + 1, this.y],
			'direction' : 'right'
		});
	}
	
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
				this.checkForPlayersToKill(blocksToUpdate[i].coordinates);
				break;
			case 0: /* empty */	
				this.checkForPlayersToKill(blocksToUpdate[i].coordinates);
				break;		
			case 2: /* indestructible */
			default:
				Debug.log("block type  " + blocksToUpdate[i].type);
				break;
		}
	}
	this.player.bombsAvailable += 1;
}

Bomb.prototype.checkForPlayersToKill = function (blockToLook) {
        for (var j in Game.players)
        {
                if (Game.players[j] instanceof Player)
                {
                        var coords = Game.players[j].isInBlock();
                        if (coords[0] === blockToLook[0] && coords[1] === blockToLook[1])
                        {
                                Game.players[j].dead = true;
                        }
                }
        }
}