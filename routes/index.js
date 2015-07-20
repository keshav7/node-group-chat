/**
 * Created by keshav.gupta on 15/07/15.
 */

var express = require("express");
var app = express();

app.set('views', __dirname + '/tpl');
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);
app.get("/", function(req, res){
    res.render("page");
});

var port = 3700;

app.get("/", function(req, res){
    res.send("It works!");
});

app.use(express.static(__dirname + '/public'));
//app.listen(port);
var io = require('socket.io').listen(app.listen(port));

io.sockets.on('connection', function (socket) {
    socket.emit('message', { message: 'lets Chat!!' });
    socket.on('send', function (data) {
        io.sockets.emit('message', data);
        console.log(data);
    });
});


console.log("Listening on port " + port);