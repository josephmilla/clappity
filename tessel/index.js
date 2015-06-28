var tessel = require('tessel');
var ws = require("nodejs-websocket");

var port = 8000;

// Ambient setup
var ambientLib = require('ambient-attx4');
var ambient = ambientLib.use(tessel.port['A']);

// INSERT TESSEL IP ADDRESS HERE. Always prepend with 'ws://' to indicate websocket
var connection = ws.connect('ws://172.28.113.51:' + port, function() {
    console.log('Running websocket');

    // When we get text back
    // connection.on('keywords', function(text) {
    //   console.log("Echoed back from server:", text);
    // });
});

// Ambient on ready setup
ambient.on('ready', function() {
  var claps = 0;
  var lastTime = 0;
  var currentTime;
	
  ambient.setSoundTrigger(0.1);
	

  ambient.on('sound-trigger', function(sound) {
    currentTime = new Date().getTime();

    connection.sendText('clap');

    // two claps
    // time frame should be 2 seconds
    if ( currentTime - lastTime < 3000 ) {
      if ( claps === 2 ) {
        connection.sendText('pizza');
        claps = 0;
      }

      // three claps
      // time frame should be 3 seconds
      if ( claps === 3 ) {
        connection.sendText('burrito');
        claps = 0;
      }

      // four claps
      // time frame should be 4 seconds
      if ( claps === 4 ) {
        connection.sendText('sandwich');
        claps = 0;
      }  
    }

    claps++;
    lastSound = new Date().getTime();
	});


});

// var lastClap = (new Date()).getTime();

// function detectClap(data){
//   var t = (new Date()).getTime();
//   if(t - lastClap < 200) return false; // TWEAK HERE
//   var zeroCrossings = 0, highAmp = 0;
//   for(var i = 1; i < data.length; i++){
//     if(Math.abs(data[i]) > 0.25) highAmp++; // TWEAK HERE
//     if(data[i] > 0 && data[i-1] < 0 || data[i] < 0 && data[i-1] > 0) zeroCrossings++;
//   }
//   if(highAmp > 20 && zeroCrossings > 30){ // TWEAK HERE
//     //console.log(highAmp+' / '+zeroCrossings);
//     lastClap = t;
//     return true;
//   }

//   return false;
// }



// currentSound = 10
// lastSound = 5


// 10 - 5 < 2

