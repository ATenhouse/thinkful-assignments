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

    var addMessage = function(message) {
        messages.append('<div>' + message + '</div>');
    };

    input.on('keydown', function(event) {
        if (event.keyCode != 13) {
            return;
        }
        var message = input.val();
        addMessage(message);
        socket.emit('message', message);
        input.val('');
    });

    socket.on('message', addMessage);
});