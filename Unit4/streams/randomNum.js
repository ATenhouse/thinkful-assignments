var stream = require('stream');

function Alphabet(options) {
    stream.Readable.call(this, options);
    this._start = 1;
    this._end = 100;
    this._curr = this._start;
};

Alphabet.prototype = Object.create(stream.Readable.prototype);
Alphabet.prototype.constructor = Alphabet;

Alphabet.prototype._read = function() {
    var i = this._curr;
    var buf = new Buffer(i);
    this.push(buf);
    this._curr++;
    if (i === this._end) {
        this.push(null);
    }
};

module.exports = Alphabet;
