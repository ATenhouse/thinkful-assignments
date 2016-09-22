var http = require('http');
var express = require('express');
var socket_io = require('socket.io');

var app = express();
app.use(express.static('public'));

var server = http.Server(app);
var io = socket_io(server);
var num_of_connections = 0;

var clients = [];

io.on('connection', function(socket){
    console.log('Client connected');
    num_of_connections++;
    clients.push(socket);
    if (num_of_connections == 1) {
      socket.role = 'drawer';
      socket.emit("drawer");
    } else {
      socket.role = 'guesser';
      socket.emit('guesser');
    }
    
    socket.on('draw', function(position) {
      socket.broadcast.emit('draw', position);
    });
    socket.on('guess', function(guess) {
      socket.broadcast.emit('guess', guess);
    });
    socket.on('disconnect', function() {
        console.log('A user has disconnected');
    });
});

server.listen(process.env.PORT || process.env.PORT);