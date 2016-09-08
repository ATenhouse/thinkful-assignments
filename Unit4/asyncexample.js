// async function wait(seconds) {
//   await setTimeout(function(){
//     console.log('Console log after async await:', new Date());
//   }, seconds * 1000);
// }

// console.log('Console log before calling wait:', new Date());

// wait(3);

// console.log('Console log after calling wait:', new Date());

console.log("SECOND EXAMPLE")

console.log('Console log before calling wait:', new Date());

(async function() {
  var foo = await wait(3);
  console.log('Console log after three seconds:', foo);
  var bar = await wait(1);
  console.log('Console log after one second:', bar);
  var baz = await wait(5);
  console.log('Console log after five seconds:', baz);
}());

console.log('Console log after calling wait:', new Date());