var request = require('request');
var WebSocket = require('ws');
var jwt = require('jsonwebtoken');

request.post({
  url:     'https://va.idp.liveperson.net/api/account/13350576/signup',
}, function(error, response, body){

  console.log(JSON.parse(body).jwt);

  var wss = new WebSocket('wss://va.msg.liveperson.net/ws_api/account/13350576/messaging/consumer?v=3',{  headers : {
          Authorization: "jwt " + JSON.parse(body).jwt
        }});

  console.log("defining onOpen");


  wss.on('connection', function(ws) {

  		console.log("Connection");
  });


  wss.on('open', function open() {
  	
  	console.log('connected');
  	wss.send('{"kind":"req","id":1,"type":"cm.ConsumerRequestConversation"}')


   });


  wss.on('message', function incoming(data) {
  	


  	if (JSON.parse(data).code == 200){

		wss.send('{"kind":"req","id":2,"type":"ms.PublishEvent","body":{"dialogId":"'+ JSON.parse(data).body.conversationId +'","event":{"type":"ContentEvent","contentType":"text/plain","message":"Here is my first message"}}}')

  	}
  	

  });


});