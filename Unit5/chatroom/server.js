var socket_io = require('socket.io');
var http = require('http');
var express = require('express');

var app = express();
app.use(express.static('public'));

var server = http.Server(app);
var io = socket_io(server);

var clients = {count: 0};

io.on('connection', function (socket) {
    console.log('Client connected');
    var full_name = "";

    socket.on('username', function(username) {
        clients.count = clients.count + 1;
    	socket.broadcast.emit('message', username + ' has connected.');
        socket.broadcast.emit('clientsChanged', clients);
    });

    socket.on('message', function(message) {
        console.log('Received message:', message);
        socket.broadcast.emit('message', message);
    });

    socket.on('disconnect', function() {
        clients.count = clients.count - 1;
        socket.broadcast.emit('message', 'Someone has disconnected.');
        io.emit('clientsChanged', clients);
    });

});

server.listen(process.env.PORT || 8080);
