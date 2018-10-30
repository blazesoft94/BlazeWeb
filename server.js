const express = require("express");
var app = express();
var http = require("http");
var server = http.createServer(app);
var port = process.env.PORT || 5000;

app.use(express.static(__dirname+"/public"));

app.get("/check", function(req,res){
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ _network_available: 0 }));
});

server.listen(port,()=>{
    console.log("listening on",port);
});