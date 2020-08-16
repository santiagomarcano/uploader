var siofu = require("socketio-file-upload");
const express = require('express')
var app = express();
var io = require('socket.io')(app);

app.use(siofu.router)
app.use('/uploads', express.static('uploads'))

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
    var uploader = new siofu();
    uploader.dir = "/uploads";
    uploader.listen(socket);
    // }, 2000)
    console.log('a user connected');
});

app.listen(process.env.PORT, () => {
    console.log(`listening on ${process.env.PORT}`);
});
