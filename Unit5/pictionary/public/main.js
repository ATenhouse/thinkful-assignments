var pictionary = function() {
    
    var WORDS = [
        "word", "letter", "number", "person", "pen", "class", "people",
        "sound", "water", "side", "place", "man", "men", "woman", "women", "boy",
        "girl", "year", "day", "week", "month", "name", "sentence", "line", "air",
        "land", "home", "hand", "house", "picture", "animal", "mother", "father",
        "brother", "sister", "world", "head", "page", "country", "question",
        "answer", "school", "plant", "food", "sun", "state", "eye", "city", "tree",
        "farm", "story", "sea", "night", "day", "life", "north", "south", "east",
        "west", "child", "children", "example", "paper", "music", "river", "car",
        "foot", "feet", "book", "science", "room", "friend", "idea", "fish",
        "mountain", "horse", "watch", "color", "face", "wood", "list", "bird",
        "body", "dog", "family", "song", "door", "product", "wind", "ship", "area",
        "rock", "order", "fire", "problem", "piece", "top", "bottom", "king",
        "space"
    ];
    
    var socket = io();
    var canvas, context;
    // defaulting to false ...
    var drawing = false;
    
    var guessBox = $('#guessInput');
    var guessSpan = $("#guess span");

    var onKeyDown = function(event) {
        if (event.keyCode != 13) { // Enter
            return;
        } else {
          if(socket.role == 'guesser') {
            socket.emit('guess', guessBox.val());
          } else { //drawer
            var guessVal = guessBox.val();
            if(WORDS.indexOf(guessVal) > -1) {
              socket.emit('selection', guessVal);
              $('#words').html(guessVal);
            } else {
                var random_word = WORDS[Math.floor(Math.random()*WORDS.length)];
                alert("Be sure to select a matching word from the list. I suggest " + random_word);
            }
          }
        guessBox.val('');
      }
    };
    
    guessBox.on('keydown', onKeyDown);
    
    var guess_div = $('#guesses');

    var makeGuess = function(guess) {
        if(words.indexOf(guess) > -1){
            guess-div.text("SUCCESS!");
        }
      guess_div.text(guess);
    };

    var draw = function(position) {
        context.beginPath();
        context.arc(position.x, position.y,
                         6, 0, 2 * Math.PI);
        context.fill();
    };

    canvas = $('canvas');
    context = canvas[0].getContext('2d');
    canvas[0].width = canvas[0].offsetWidth;
    canvas[0].height = canvas[0].offsetHeight;
    
    canvas.on('mousemove', function(event) {
        if(!drawing || socket.role == "guesser") {
            return
        }
        var offset = canvas.offset();
        var position = {x: event.pageX - offset.left,
                        y: event.pageY - offset.top};
        draw(position);
        socket.emit('draw', position);
    });
    
    canvas.on('mousedown', function(event) {
        drawing = true;
    });
    
    canvas.on('mouseup', function(event) {
        drawing = false;
    });
    
    var rolesdiv = $('#roles');

    var assignDraw = function() {
      rolesdiv.text("Drawer");
      socket.role = "drawer";
      alert("DRAW SOMETHING");
      guessSpan.html('Please select a word from the list: ');
      context.clearRect(0,0,600,400);
    };

    var assignGuess = function() {
      socket.role = "guesser";
      rolesdiv.text("Guesser");
      alert("MAKE A GUESS!");
      guessSpan.html('Make a guess:');
      context.clearRect(0,0,600,400);
    };
    
    socket.on('draw', draw);
    socket.on('guess', makeGuess);
    socket.on('drawer', assignDraw);
    socket.on('guesser', assignGuess);
};

$(document).ready(function() {
    pictionary();
});