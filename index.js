const path = require('path')
const siofu = require('socketio-file-upload')
const express = require('express')
const app = express()

app.use(siofu.router)
app.use('/uploads', express.static('uploads'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.get('/send', (req, res) => {
    io.sockets.emit('m', { newData: true })
    res.send('OK')
})


const server = app.listen(process.env.PORT || 3000, () => {
    console.log(`listening on ${process.env.PORT || 3000}`)
});

var io = require('socket.io')(server);

io.on('connection', (socket) => {
    socket.emit('m', { data: 'Connected!' })
    const uploader = new siofu()
    uploader.dir = path.join(process.cwd(), 'uploads')
    uploader.listen(socket)
    uploader.on('start', (data) => {
        console.log('Start', data.file.name)
    })
    uploader.on('saved', (data) => {
        console.log(`Saved ${data.file.name}`)
        io.sockets.emit('upload', { name: data.file.name })
    })
});

