var path=require('path');
var express=require('express');
var http=require('http');
var socketIO=require('socket.io');
const {generateMessage}=require('./utils/message');
var port=process.env.port||3000;
var file_path=path.join(__dirname,'../public');
var app=express();
var server=http.createServer(app);
var io=socketIO(server);
app.use(express.static(file_path));

io.on('connection',function(socket){
    console.log('new user is connected!');
   
    socket.emit('WelcomeMsg',generateMessage('admin','Welcome to chat room!'));

   socket.broadcast.emit('UserJoinMsg',generateMessage('admin','New user join!'));

    socket.on('createMsg',function(msgData,callback){
        console.log('Create msg : ',msgData);
        io.emit('newMsg',generateMessage(msgData.from,msgData.text));
        callback('This is from server');
    })
   
    socket.on('disconnect',function(){
        console.log('the user has been disconnect!');
    });

});


server.listen(port,()=>{
    console.log("server is running at port no "+port);
});