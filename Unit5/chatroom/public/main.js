$(document).ready(function() {
    var nick = null;
    while (!nick) {
        nick = window.prompt("Please enter a handle:", "");
    }

    $('#userhandle').html(nick);

    var socket = io();
    socket.emit('username', nick);

    var input = $('input');
    var messages = $('#messages');
    var clientCount = $('#clientCount');
    var activeTyping = $('#activeTyping');

    var addMessage = function(message, nick) {
        messages.append('<div> ' + nick + " : "+ message + '</div>');
    };

    // update client count
    var updateClients = function(clients) {
        clientCount.html('# of connected users:' + clients['count']);
    };

    var userIsTyping = function(nick) {
        typing.html(nick + ' is typing.');
    };

    var noUserIsTyping = function() {
        typing.html('');
    };

    input.on('keydown', function(event) {
        if (event.keyCode != 13) {
            return;
        }
        var message = input.val();
        addMessage(message, nick);
        socket.emit('message', message);
        input.val('');
    });

    socket.on('message', addMessage);
    socket.on('clientsChanged', updateClients);
    socket.on('keydown', userIsTyping);
    socket.on('keyup', noUserIsTyping);
});