var Bomb = require('./bomb.js').mBomb;

var actions = {
	'placeBomb' : function (parameters) {
		parameters.Game.board ='toto';
	}
}

exports.actions = actions;