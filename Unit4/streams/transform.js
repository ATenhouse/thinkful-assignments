var Transform = require('stream').Transform;

const myTransform = new Transform({
  writableObjectMode: true,

  transform(chunk, encoding, callback) {
    chunk |= 0;

    const data = chunk.toString(16);

    callback(null, '0'.repeat(data.length % 2) + data);
  }
});

myTransform.setEncoding('ascii');
myTransform.on('data', (chunk) => console.log(chunk));

module.exports = myTransform;