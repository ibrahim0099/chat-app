var path=require('path');
var express=require('express');
var port=process.env.port||3000;
var file_path=path.join(__dirname,'../public');
var app=express();
app.use(express.static(file_path));
app.listen(port,()=>{
    console.log("server is running at port no "+port);
});