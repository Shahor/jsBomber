var Bomb = require('./bomb.js').mBomb;

var actions = {
	'placeBomb' : function (parameters) {
		parameters.Game.board ='toto';
	},
	'updatePlayer' : function (parameters) {
		parameters.Game.players[parameters.client.sessionId].player.setCoordinates(parameters.coordinates);
		parameters.client.broadcast({
			'msg' : 'updateOponents',
			'parameters' : {
				'sessionId' : parameters.client.sessionId,
				'coordinates' : parameters.coordinates
			}
		});		
	}
}

exports.actions = actions;