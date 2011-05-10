var Game = {
	'socket' : null,
	'started' : false,
	'FPS' : 30,
	'board' : null,
	'player' : null,
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

$(function() {
 	var player = new Image();
	Game.board = new Gameboard();
	Game.board.build();
	
	Game.socket = new io.Socket('localhost', {port: 8080, rememberTransport: false});
	Game.socket.connect();
	Game.socket.on('connect', function(){ console.log('connected'); });
	Game.socket.on('message', function(mess){ console.log(mess); });
	Game.socket.on('disconnect', function(){console.log('disconnected'); });
	
	Game.socket.send({'msg' : 'getBoard'});
	
	player.onload = function () {
		Game.player = new Player(player);
		Game.started = true;
	};
	player.src = 'images/bomberman_40x40.png';

	setInterval(function () {
		if (!Game.started) return false;

		Game.board.cleanCtx();
		if (keydown.right) Game.player.move('right');
		if (keydown.left) Game.player.move('left');
		if (keydown.up) Game.player.move('up');
		if (keydown.down) Game.player.move('down');
		if (keydown.space) Game.player.placeBomb();
		
		Game.updateBombs();
		
		Game.board.drawBoard();
		Game.player.draw(Game.ctx);
	}, 1000 / Game.FPS);
})