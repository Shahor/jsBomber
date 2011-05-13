var Game = {
	'socket' : null,
	'started' : false,
	'playerConnected' : false,
	'FPS' : 30,
	'board' : null,
	'player' : null,
	'loaded' : false,
	'ticks' : 5,
	'actualFrame' : 0,
	'bombs' : [],
	'oponents' : {}
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

$(function() {
	Game.socket = new io.Socket('localhost', {port: 8080, rememberTransport: false});
	Game.socket.connect();
	Game.socket.on('connect', function(){ 
		Game.playerConnected = true;
	});
	Game.socket.on('message', function(message) { 
		if (typeof bomberApi[message['msg']] === 'function')
		{
			bomberApi[message['msg']](message.parameters);
		}
		else
		{
			console.error('[Error] : Unknown action : ' + message.msg);
		}
	});
	Game.socket.on('disconnect', function() {
		console.log('disconnected'); 
	});

	setInterval(function () {
		if (!(Game.started && Game.playerConnected && Game.loaded)) return false;

		Game.board.cleanCtx();
		if (keydown.right) Game.player.move('right');
		if (keydown.left) Game.player.move('left');
		if (keydown.up) Game.player.move('up');
		if (keydown.down) Game.player.move('down');
		if (keydown.space) Game.player.placeBomb();
		
		Game.updateBombs();
		
		Game.board.drawBoard();
		Game.player.draw(Game.ctx);
		for (var oponent in Game.oponents)
		{
			Game.oponents[oponent].draw();
		}

		/*/ Update everything 5 frames
		if (Game.actualFrame % Game.ticks === 0)
		{
			Game.socket.send({
				'msg' : 'updatePlayer',
				'parameters' : {
					'coordinates' : Game.player.getRealCoordinates()
				}
			});
		}

		if (Game.actualFrame >= (1000 / Game.FPS)) 
		{
			Game.actualFrame = 0;
		}
		else
		{
			Game.actualFrame += 1;
		}
		//*/
		Game.socket.send({
			'msg' : 'updatePlayer',
			'parameters' : {
				'coordinates' : Game.player.getRealCoordinates()
			}
		});
	}, 1000 / Game.FPS);
})