const express = require("express");
var app = express();
var http = require("http");
var server = http.createServer(app);
var port = process.env.PORT || 5000;

app.use(express.static(__dirname+"/public"));

server.listen(port,()=>{
    console.log("listening on",port);
});