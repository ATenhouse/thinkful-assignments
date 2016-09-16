var MusicPlayer = function() {
    this.listeners = {};
};

MusicPlayer.prototype.on = function(eventName, listener) {
    if (!this.listeners.hasOwnProperty(eventName)) {
        this.listeners[eventName] = [listener];
    }
    else {
        this.listeners[eventName].push(listener);
    }
};

MusicPlayer.prototype.emit = function(eventName) {
    if (!this.listeners.hasOwnProperty(eventName)) {
        return;
    }

    var args = [];
    for (var i=1; i<arguments.length; i++) {
        args.push(arguments[i]);
    }

    this.listeners[eventName].forEach(function(listener){
        listener.apply(null, args);
    });
};

var player = new MusicPlayer();

player.on('start', function(artist, song) {
    console.log('Starting audio stream playin', artist, song);
});

player.on('stop', function() {
    console.log('Stopping audio stream');
});

player.on('start', function() {
    console.log('Updating UI to started state');
});

player.on('stop', function() {
    console.log('Updating UI to stopped state');
});

player.emit('start', 'Sleater Kinney', 'No Cities to Love');
player.emit('stop');
