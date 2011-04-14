var http = require('http');
var io = require('socket.io');

server = http.createServer(function(req, res){
    res.writeHead(404);
    res.end();
});

server.listen(8080);

var socket = io.listen(server);

socket.on('connection', function(client){
  client.on('message', function(){ console.log('message'); })
  client.on('disconnect', function(){ console.log('disconnect'); })

  client.send('hello ' + client.sessionId);
  client.broadcast('testMessage from ' + client.sessionId);

  setInterval(function () {
	  console.log('calling');
	  }, 2000);
});
