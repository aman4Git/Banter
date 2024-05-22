const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const http = require('http').createServer(app);

//Start the server
http.listen(PORT, () => {
    console.log(`Server listening on localhost:${PORT}`);
});

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

//Socket connection
const io = require('socket.io')(http);

//Listen for connection
io.on('connection', (socket) => {

    //Receive data from client
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg);
    })
});