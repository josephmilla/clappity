var tessel = require('tessel');
var ws = require("nodejs-websocket");

var host = '172.28.113.58:';
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
	
  ambient.setSoundTrigger(0.1);

  ambient.on('sound-trigger', function(sound) {
    currentTime = new Date().getTime();

    console.log('lastTime ' + lastTime + ' - ' + ' currentTime ' + currentTime);
    console.log('lastTime - currentTime >>> ', currentTime - lastTime);
    console.log('currentTime - lastTime <= 3000', currentTime - lastTime <= 3000);
    console.log('claps', claps);

    console.log('   ');
    console.log('   ');

    // connection.sendText('clap');
    

    // if(claps === 0) {
    //   claps = 1;
    // } 

    if(currentTime - lastTime <= 3000) {
      claps++;
    } else {
      // determine action based on number of claps
      if ( claps === 2 ) {
        connection.sendText('pizza');
        console.log('  pizza ');
        claps = 0;
      }

      // three claps
      // time frame should be 3 seconds
      if ( claps === 3 ) {
        connection.sendText('burrito');
        console.log('  burrito ');
        claps = 0;
      }

      // four claps
      // time frame should be 4 seconds
      if ( claps === 4 ) {
        connection.sendText('sandwich');
        console.log('  sandwich ');
        claps = 0;
      }  
    }

    if ( claps > 4 ) {
        claps = 0;
      }

    lastTime = currentTime;
	});


});

