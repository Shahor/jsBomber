var Game = {
	'started' : false,
	'FPS' : 30,
	'board' : null,
	'players' : {
		'p1' : null,
		'p2' : null
	},
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
	
	player.onload = function () {
		Game.players.p1 = new Player(player);
		Game.started = true;
	};
	player.src = 'images/bomberman_40x40.png';

	setInterval(function () {
		if (!Game.started) return false;

		Game.board.cleanCtx();
		if (keydown.right) Game.players.p1.move('right');
		if (keydown.left) Game.players.p1.move('left');
		if (keydown.up) Game.players.p1.move('up');
		if (keydown.down) Game.players.p1.move('down');
		if (keydown.space) Game.players.p1.placeBomb();
		
		Game.updateBombs();
		
		Game.board.drawBoard();
		Game.players.p1.draw(Game.ctx);
	}, 1000 / Game.FPS);
});