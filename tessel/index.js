var tessel = require('tessel');
var ws = require("nodejs-websocket");

var host = '10.0.0.11:';
var port = 8000;

// Ambient setup
var ambientLib = require('ambient-attx4');
var ambient = ambientLib.use(tessel.port['A']);

// INSERT TESSEL IP ADDRESS HERE. Always prepend with 'ws://' to indicate websocket
var connection = ws.connect('ws://' + host + port, function() {
    console.log('Connect to websocket on: ' + host + port );

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
	
  ambient.setSoundTrigger(0.2);
	

  ambient.on('sound-trigger', function(sound) {
    currentTime = new Date().getTime();

    console.log('currentTime', currentTime);
    console.log('lastTime - currentTime >>> ', currentTime - lastTime)
    console.log('currentTime - 400', currentTime - 400)
    console.log('claps', claps++);

    // connection.sendText('clap');

    // two claps
    // time frame should be 2 seconds
    if ( claps === 2 && currentTime - lastTime <= currentTime - 400 ) {
      connection.sendText('pizza');
      claps = 0;
    }

    // three claps
    // time frame should be 3 seconds
    if ( claps === 3 && currentTime - lastTime > currentTime - 400 && currentTime - lastTime <= currentTime - 500 ) {
      connection.sendText('burrito');
      claps = 0;
    }

    // four claps
    // time frame should be 4 seconds
    if ( claps === 4 && currentTime - lastTime > currentTime - 500 && currentTime - lastTime <= currentTime - 600 ) {
      connection.sendText('sandwich');
      claps = 0;
    }  

    claps++;

    if ( claps > 4 ) {
      claps = 0
    }

    lastTime = currentTime;

    console.log('lastTime', lastTime);
	});


});

