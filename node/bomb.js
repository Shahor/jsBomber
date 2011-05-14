var Player = require('./bomb.js').mPlayer;

function Bomb (coordinates, player, Game)
{
	this.player = player;
	this.game = Game;
	this.power = 1;
	this.x = coordinates[0];
	this.y = coordinates[1];
	this.timeBeforeExplosion = Game.FPS * 2;

	this.player.bombsAvailable -= 1;
	this.game.board.changeBlockType(coordinates, 4);
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
			'type' : this.game.board.getBlockType([this.x, this.y - 1]),
			'coordinates' : [this.x, this.y - 1],
			'direction' : 'left'
		});
	}
	if (this.y < 14)
	{
		blocksToUpdate.push({
			'type' : this.game.board.getBlockType([this.x, this.y + 1]),
			'coordinates' : [this.x, this.y + 1],
			'direction' : 'down'
		});
	}
	if (this.x > 0)
	{
		blocksToUpdate.push({
			'type' : this.game.board.getBlockType([this.x - 1, this.y]),
			'coordinates' : [this.x - 1, this.y],
			'direction' : 'left'
		});
	}
	if (this.x < 14)
	{
		blocksToUpdate.push({
			'type' : this.game.board.getBlockType([this.x + 1, this.y]),
			'coordinates' : [this.x + 1, this.y],
			'direction' : 'right'
		});
	}
	
	for (var i = 0; i < blocksToUpdate.length; i++)
	{
		switch (blocksToUpdate[i].type)
		{
			case 1:
				this.game.board.changeBlockType(blocksToUpdate[i].coordinates, 0);
				break;
			case 3:
				this.game.board.changeBlockType(blocksToUpdate[i].coordinates, 0);
				break;
			case 4:
				this.game.board.changeBlockType(blocksToUpdate[i].coordinates, 0);
				this.checkForPlayersToKill(blocksToUpdate[i].coordinates);
				break;
			case 0: /* empty */	
				this.checkForPlayersToKill(blocksToUpdate[i].coordinates);
				break;		
			case 2: /* indestructible */
			default:
				//console.log("block type  " + blocksToUpdate[i].type);
				break;
		}
	}
	this.player.bombsAvailable += 1;
	
	this.game.players[this.player.id].socket.send({
		'msg' : 'updateBoard',
		'parameters' : {
			'cells' : this.game.board.cells
		}
	});
	this.game.players[this.player.id].socket.broadcast({
		'msg' : 'updateBoard',
		'parameters' : {
			'cells' : this.game.board.cells
		}
	});
	
}

Bomb.prototype.checkForPlayersToKill = function (blockToLook) {
        for (var j in this.game.players)
        {
                if (!this.game.players[j].player.dead)
                {
                        var coords = this.game.players[j].player.isInBlock();
                        if (coords[0] === blockToLook[0] && coords[1] === blockToLook[1])
                        {
								console.log(this.game.players[j].socket.sessionId + " is dead !");
								/*/
                                this.game.players[j].player.dead = true;
								this.game.players[this.player.id].socket.send({
									'msg' : 'removePlayer',
									'parameters' : {
										'cells' : this.game.board.cells
									}
								});
								this.game.players[this.player.id].socket.broadcast({
									'msg' : 'updateBoard',
									'parameters' : {
										'cells' : this.game.board.cells
									}
								});
								//*/
                        }
                }
        }
}

exports.mBomb = Bomb;