var tessel = require('tessel');

// var ws = require("nodejs-websocket");
var socket = io.connect('http://172.28.113.51:8000');
socket.on('connect', function () {
  // socket connected
  // socket.emit('hello', { 
  //   data: 'data' 
  // });
});
// var socket = require('socket.io-client')('http://172.28.113.51:8000');

// socket.on('connect', function(){});
// socket.on('event', function(data){});
// socket.on('disconnect', function(){});


// Ambient setup
var ambientLib = require('ambient-attx4');
var ambient = ambientLib.use(tessel.port['A']);

// // INSERT TESSEL IP ADDRESS HERE. Always prepend with 'ws://' to indicate websocket
// var connection = ws.connect('ws://172.28.113.51:' + port, function() {
//     console.log('Running websocket');

//     // When we get text back
//     connection.on('keywords', function(text) {
//       console.log("Echoed back from server:", text);
//     })
// });

// Ambient on ready setup
ambient.on('ready', function() {
  var clap = 0;
  var lastClap = (new Date()).getTime();

  ambient.setSoundTrigger(0.1);

	ambient.on('sound-trigger', function(soundData) {

    socket.emit('hello', { 
      data: 'data' 
    });

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

    // connection.sendText("hello", {
    //     keyword: "Hello world"
    // });

	});


});
