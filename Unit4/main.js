var randomNumbers = require('./streams/randomNum');
var Cache = require('./cache');
var transformy = require('./streams/transform.js')

var rando1 = new randomNumbers();
var cache = new Cache('alpha1');
var trans1 = new myTransform();

rando1.pipe(cache);


transformy.write(1);
  // Prints: 01
transformy.write(10);
  // Prints: 0a
transformy.write(100);
  // Prints: 64

cache.on('finish', function() {
    console.log('Cache store:');
    for (var key in Cache.store) {
        console.log(key, ':', Cache.store[key]);
    }
});