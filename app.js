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
// Create the websocket server, provide connection callback
var server = ws.createServer(function(conn) {
  console.log("New connection");

  // If we get text from the client, and echo it
  conn.on("text", function(str) {
    // print it out
    console.log("Received "+str)
    // Send it back (but more excited)
    conn.sendText(str.toUpperCase()+"!!!")
  });

  conn.on("hello", function(str) {
    // print it out
    console.log("Hello received "+str);
    // Send it back (but more excited)
    conn.sendText(str.toUpperCase()+"!!!");
  });

  conn.on("pizza", function(str) {
    // print it out
    console.log("Pizza received "+str);
    // Send it back (but more excited)
    conn.sendText(str.toUpperCase()+"!!!");
  });

  conn.on("sandwich", function(str) {
    // print it out
    console.log("Sandwich received "+str);
    // Send it back (but more excited)
    conn.sendText(str.toUpperCase()+"!!!");
  });

  conn.on("burrito", function(str) {
    // print it out
    console.log("Burrito received "+str);
    // Send it back (but more excited)
    conn.sendText(str.toUpperCase()+"!!!");
  });

  // When the client closes the connection, notify us
  conn.on("close", function (code, reason) {
      console.log("Connection closed")
  });
}).listen(port);

console.log('listening on port', port);


var express = require('express');
var app = express();
/**
 * Twilio
 */
//
// app.get('/twilio', function(req, res){
//   console.log(req);
//   var data = req.query;
//   // console.log(data);
//
//   var receiver = '+1' + data.receiver;
//   console.log(receiver);
//   var url = data.url;
//   console.log(url);
//
//   // console.log(receiver);
//   // console.log(url);
//
//   //require the Twilio module and create a REST client
//   var client = require('twilio')('AC74758f409864491310b59e3f0b7b5f4e', '072d3327191638250a1f55315de3ae07');
//
//   //Send an SMS text message
//   client.sendMessage({
//       to: '+18088889170', // Any number Twilio can deliver to
//       from: '+16282226227', // A number you bought from Twilio and can use for outbound communication
//       body: 'Test message', // body of the SMS message
//       mediaUrl: 'url'
//
//   }, function(err, responseData) { //this function is executed when a response is received from Twilio
//
//       if (!err) { // "err" is an error received during the request, if any
//
//           // "responseData" is a JavaScript object containing data received from Twilio.
//           // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
//           // http://www.twilio.com/docs/api/rest/sending-sms#example-1
//
//           console.log(responseData.from); // outputs "+14506667788"
//           console.log(responseData.body); // outputs "word to your mother."
//
//       }
//   });
//
//
//   res.writeHead(200, {
//     'Content-Type': 'text/plain',
//     'Access-Control-Allow-Origin' : '*',
//     'Access-Control-Allow-Methods': 'GET,POST'
//   });
//
//   res.send('Hello, World!'); //replace with your data here
// });
