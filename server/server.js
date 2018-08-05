var path=require('path');
var express=require('express');
var http=require('http');
var socketIO=require('socket.io');
var port=process.env.port||3000;
var file_path=path.join(__dirname,'../public');
var app=express();
var server=http.createServer(app);
var io=socketIO(server);
app.use(express.static(file_path));

io.on('connection',function(socket){
    console.log('new user is connected!');
   
    socket.emit('WelcomeMsg',{
       from: 'Admin',
       test: 'Welcome to the chat room!',
       date: new Date().getTime()
   });

   socket.broadcast.emit('UserJoinMsg',{
    from: 'Admin',
    test: 'New user join!',
    date: new Date().getTime()
   });

    socket.on('createMsg',function(msgData){
        console.log('Create msg : ',msgData);
        socket.broadcast.emit('newMsg',{
            from:msgData.from,
            text:msgData.text
        });
    })
   
    socket.on('disconnect',function(){
        console.log('the user has been disconnect!');
    });

});


server.listen(port,()=>{
    console.log("server is running at port no "+port);
});