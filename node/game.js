var Player = require('./player.js').mPlayer;

var Game = {
	'started' : false,
	'board' : null,
	'players' : {},
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

Game.addPlayer = function (socket) {
	var initialPosition;
	var nbPlayers = 0;
	
	for (var i in Game.players)
	{
		nbPlayers++;
	}

	switch (nbPlayers)
	{
		case 0:
			initialPosition = {'x' : 0, 'y' : 0};
			break;
		case 1:
			initialPosition = {'x' : 14, 'y' : 14};
			break;
		case 2:
			initialPosition = {'x' : 14, 'y' : 0};
			break;
		case 3:
			initialPosition = {'x' : 0, 'y' : 14};
			break;
	}
	var player = new Player(initialPosition.x, initialPosition.y);
	Game.players[socket.sessionId] = {
		'socket' : socket,
		'player' : player
	};
	
	for (var oponent in Game.players) 
	{
		if (oponent !== socket.sessionId)
		{
			socket.send({
				'msg' : 'addOponent',
				'parameters' : {
					'oponent' : Game.players[oponent].player,
					'sessionId' : oponent
				}
			});
		}
	}
	socket.broadcast({
		'msg' : 'addOponent',
		'parameters' : {
			'oponent' : player,
			'sessionId' : socket.sessionId
		}
	});
	
	return player.getRealCoordinates();
}

exports.mGame = Game;