var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var ConversationV1 = require('watson-developer-cloud/conversation/v1');

var conversation = new ConversationV1({
  username: 'cc818385-ecd5-4846-ae33-3a18654a2a98',
  password: '1AiS0Zt6f3n3',
  path: { workspace_id: 'dc21f961-c96d-4f54-8215-f9985fdd8937' },
  version_date: '2016-07-11'
});

io.on('connection', function(socket){

  function processResponse(err, response){
    socket.emit('msg', {
      err:err,
      response:response
    })
  }

  conversation.message({}, processResponse);

  socket.on('msg', function(msg){
    conversation.message({
      input: {
        text: msg.text
      },
      context: msg.context
    }, processResponse);
  });

  console.log("user connected");

});

server.listen(8080, function(){
  console.log('listening on *:8080');
});
