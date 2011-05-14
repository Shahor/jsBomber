var http = require('http');
var io = require('socket.io');

var Game = require('./game.js').mGame;
var Gameboard = require('./gameboard.js').mGameboard;
var Player = require('./player.js').mPlayer;


var actions = require('./bomberApi.js').actions;


console.log("Loading Gameboard");
if (!typeof gameboard === 'function') throw 'GameboardError';
var gameboard = new Gameboard();
Game.board = gameboard;
Game.board.build();
console.log("Board loaded");

server = http.createServer(function(req, res){
	res.writeHead(404);
	res.end();
});

server.listen(8080);

var socket = io.listen(server);

socket.on('connection', function(client){
	var coordinates = Game.addPlayer(client);

	client.on('message', function(message) { 
		if (typeof actions[message['msg']] === 'function')
		{
			message.parameters.client = client;
			message.parameters.Game = Game;
			actions[message['msg']](message.parameters);
		}
		else
		{
			console.error('[Error] : Unknown action : ' + message.msg);
		}
	});
	
	client.on('disconnect', function() { 
		delete Game.players[client.sessionId];
	});

	client.send({
		'msg' : 'initBoard', 
		'parameters' : {
			'cells' : gameboard.cells,
			'coordinates' : coordinates
		}
	});
});