var bomberApi = {
	'initBoard' : function (parameters) {
		var player = new Image();
		Game.board = new Gameboard(parameters.cells);

		player.onload = function () {
			Game.player = new Player(player, parameters.coordinates);
			Game.started = true; // Temporary
			Game.loaded = true;
		};
		player.src = 'images/bomberman_40x40.png';
	},
	'addOponent' : function (parameters) {
		var player = new Image();
		player.onload = function () {
			Game.oponents[parameters.sessionId] = new Player(player, [parameters.oponent.x, parameters.oponent.y]);
		};
		player.src = 'images/bomberman_40x40.png';
	},
	'updateOponents' : function (parameters) {
		if (Game.oponents[parameters.sessionId] instanceof Player)
			Game.oponents[parameters.sessionId].setCoordinates(parameters.coordinates);
	}
}