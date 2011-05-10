var http = require('http');
var io = require('socket.io');

var Game = require('./game.js').mGame;
var Gameboard = require('./gameboard.js').mGameboard;
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
	client.on('message', function(message) { 
		if (typeof actions[message['msg']] === 'function')
		{
			message['parameters'].Game = Game;
			actions[message['msg']](message.parameters);
		}
		else
		{
			console.log('Unknown action : ');
			console.dir(message);
		}
	});
	
	client.on('disconnect', function() { 
		console.log('disconnect'); 
	});

	client.send({'msg' : 'initBoard', 'params' : {'board' : gameboard.cells}});
	client.broadcast('testMessage from ' + client.sessionId);
});
