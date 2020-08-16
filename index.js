var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

const socket = io()

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/send', (req, res) => {
    console.log('send')
    socket.emit('data!', { newData: true })

})

io.on('connection', () => {
    // setInterval(() => {
    socket.emit('m', { data: 'Connected!' })
    // }, 2000)
    console.log('a user connected');
});

http.listen(process.env.PORT, () => {
    console.log(`listening on ${process.env.PORT}`);
});
