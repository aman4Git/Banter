const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const http = require('http').createServer(app);



//Start the server
http.listen(PORT, () => {
    console.log(`Server listening on localhost:${PORT}`);
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});