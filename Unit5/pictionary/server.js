var http = require('http');
var express = require('express');
var socket_io = require('socket.io');

var app = express();
app.use(express.static('public'));

var word = ""
var server = http.Server(app);
var io = socket_io(server);

var clients = [];
var num_of_connections = 0;

io.on('connection', function(socket){
    console.log('Client connected');
    num_of_connections++;
    clients.push(socket);
    if (num_of_connections === 1) {
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
      if (guess == word) {
        socket.role = 'drawer';
        socket.emit('drawer');
        socket.broadcast.emit('guesser');
      } else {
        socket.broadcast.emit('guess', guess);
      }
    });
    socket.on('disconnect', function() {
        console.log('A user has disconnected');
        num_of_connections--;
        var i = clients.findIndex(function(el, index, array) {
          return ell.id = socket.id;
        });
        clients.splice(i,1);
        if(socket.role === 'drawer') {
          if(num_of_connections > 1) {
            clients.forEach(function(element, index, array){
              // we want ONLY the first / oldest person in the block
              // to draw after a 'reset"
              if(index === 0) {
                element.role = 'drawer';
                element.emit('drawer');
              } else {
                element.role = 'guesser';
                element.emit('guesser');
              }
            });
          } else {
            clients[0].role = 'drawer';
            clients[0].emit('drawer');
          }
        }
        
    });
    socket.on('selection', function(selection) {
      word = selection;
    });
});

server.listen(process.env.PORT || process.env.PORT);