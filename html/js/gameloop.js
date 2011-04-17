var Game = {
	'started' : false,
	'FPS' : 30,
	'board' : null,
	'players' : {
		'p1' : null,
		'p2' : null
	}
}

$(function() {
 	var player = new Image();
	Game.board = new Gameboard();
	
	Game.board.build();
	
	player.onload = function () {
		Game.players.p1 = new Player(player);
		Game.started = true; /* TODO : put it where it belongs to :p */
	};
	player.src = 'images/bomberman_40x40.png';

	setInterval(function () {
		if (!Game.started) return false;

		Game.board.cleanCtx();
		if (keydown.right) Game.players.p1.move('right');
		if (keydown.left) Game.players.p1.move('left');
		if (keydown.up) Game.players.p1.move('up');
		if (keydown.down) Game.players.p1.move('down');
		if (keydown.space) /* TODO Place bombs */ Debug.log('BOMB');
		
		Game.board.drawBoard();
		Game.players.p1.draw(Game.ctx);
	}, 1000 / Game.FPS);
})

/*
window.onload = function () {
	var socket = new io.Socket('localhost', {port: 8080, rememberTransport: false});
	socket.connect();
	socket.on('connect', function(){ console.log('connected'); }) 
	socket.on('message', function(mess){ console.log(mess); }) 
	socket.on('disconnect', function(){console.log('disconnected'); }) 	
};
*/