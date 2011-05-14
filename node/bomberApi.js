var actions = {
	'updatePlayer' : function (parameters) {
		var player = parameters.Game.players[parameters.client.sessionId].player;

		player.setCoordinates(parameters.coordinates);
		parameters.client.broadcast({
			'msg' : 'updateOponents',
			'parameters' : {
				'sessionId' : parameters.client.sessionId,
				'coordinates' : parameters.coordinates
			}
		});		
	},
	'tryToPlaceBomb' : function (parameters) {
		var player = parameters.Game.players[parameters.client.sessionId].player;
		
		player.placeBomb(parameters.Game);
		
		parameters.client.send({
			'msg' : 'updateBoard',
			'parameters' : {
				'cells' : parameters.Game.board.cells
			}
		});
		parameters.client.broadcast({
			'msg' : 'updateBoard',
			'parameters' : {
				'cells' : parameters.Game.board.cells
			}
		})
	}
}

exports.actions = actions;