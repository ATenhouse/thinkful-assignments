function main(callback1, callback2, callback3){
  callback1();
  for (var i = 1; i <= 100; i++) {
  	if (i % 10 === 0) {
    	callback2(i);
    }
  }
  callback3();
}

function onStart(){
  console.log("Starting progress!");
}

function onProgress(d){
	console.log("Up to "+d+"% percent!");
}

function onEnd(){
	console.log("We're done!");
}

main(onStart, onProgress, onEnd);
