var events = require('events');

var progress = new events.EventEmitter();

progress.on('start', function() {
  console.log("Starting progress!");
});

progress.on('stop', function() {
	console.log("Progress halted! (And probably completed!)");
});

progress.on('milestone', function(percentage){
	if (percentage % 10 == 0) {
		console.log(percentage+"% done!");
	}
	else console.log("...")
});

progress.emit('start');

for (var i = 1; i <= 100; i++) {
	progress.emit('milestone', i)
}

progress.emit('stop');