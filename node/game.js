var Game = {
	'started' : false,
	'board' : null,
	'players' : [],
	'bombs' : []
}

Game.updateBombs = function () {
	if (this.bombs.length > 0)
	{
		for (var i = 0; i < this.bombs.length; i++)
		{
			if (this.bombs[i].timeBeforeExplosion > 0)
			{
				this.bombs[i].timeBeforeExplosion -= 1;
			}
			else
			{
				this.bombs[i].explode();
				this.bombs.shift();
			}
		}
	}
}

exports.mGame = Game;