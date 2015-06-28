var client = require('twilio')('AC74758f409864491310b59e3f0b7b5f4e', '072d3327191638250a1f55315de3ae07');

/**
 * Static Server
 */
var static = require('node-static');
var fileServer = new static.Server('./');
require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        fileServer.serve(request, response);
    }).resume();
}).listen(8080);

/**
 * Websocket Server
 */
var ws = require("nodejs-websocket");
var port = 8000;

//Create the websocket server, provide connection callback
var server = ws.createServer(function(conn) {
  console.log("New connection");
   console.log("What? Order it yourself.");

  // If we get text from the client, and echo it
  conn.on("text", function(str) {
    // print it out
    // console.log("Ahihihi");
    console.log("Received " + str);
    // Send it back (but more excited)
    conn.sendText(str.toUpperCase()+"!!!")

    if(str == "hello") {
      console.log("hello: "  + str);
      conn.sendText(str.toUpperCase()+"!!!");
      sendBody('Oh, hello there!', 'http://i.giphy.com/9qIQcHFew1dAs.gif');
    } else if(str == "pizza") {
      console.log("pizza: "  + str);
      conn.sendText(str.toUpperCase()+"!!!");
      sendBody('Thanks for ordering. Your delicious pizza is on the way!', 'http://i.giphy.com/mOTPaLpdCbiDu.gif');
    } else if(str == "sandwich") {
      console.log("sandwich: "  + str);
      conn.sendText(str.toUpperCase()+"!!!");
      sendBody('Thanks for ordering. Your delicious sandwich is on the way!', 'http://i.giphy.com/c6a2kiRrF0Pbq.gif');
    } else if(str == "burrito") {
      console.log("burrito: "  + str);
      conn.sendText(str.toUpperCase()+"!!!");
      sendBody('Thanks for ordering. Your delicious burrito is on the way!', 'http://i.giphy.com/RLWAcCIoenx9C.gif');
    }
  });

  // When the client closes the connection, notify us
  conn.on("close", function (code, reason) {
      console.log("Connection closed")
  });
}).listen(port);

console.log("Listening to port " + port);

function sendBody(str, url) {
  //Send an SMS text message
  client.sendMessage({
      to: '+18088889170', // Any number Twilio can deliver to
      from: '+16282226227', // A number you bought from Twilio and can use for outbound communication
      body: str, // body of the SMS message
      mediaUrl: url
  }, function(err, responseData) { //this function is executed when a response is received from Twilio

      if (!err) { // "err" is an error received during the request, if any

          // "responseData" is a JavaScript object containing data received from Twilio.
          // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
          // http://www.twilio.com/docs/api/rest/sending-sms#example-1

          console.log(responseData.from); // outputs "+14506667788"
          console.log(responseData.body); // outputs "word to your mother."

      }
  });
}
