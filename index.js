var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/send', (req, res) => {
    console.log('send')
    io.sockets.emit('m', { newData: true })
    res.send('OK')
})

io.on('connection', (socket) => {
    // setInterval(() => {
    socket.emit('m', { data: 'Connected!' })
    // }, 2000)
    console.log('a user connected');
});

http.listen(process.env.PORT, () => {
    console.log(`listening on ${process.env.PORT}`);
});
