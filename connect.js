const http = require('http');
const fs = require('fs');
const path = require('path')
// var socket = require('socket.io-client')('https://socketiotestio.herokuapp.com');
var socket = require('socket.io-client')('http://localhost:3000');

socket.on('connect', function () {
    console.log('connected')
});

socket.on('m', (data) => {
    console.log(data)
})

socket.on('upload', function (data) {
    // const p = path.resolve(process.cwd(), 'downloads', data.name)
    // console.log(p)
    console.log(data)
    const file = fs.createWriteStream(process.cwd() + `/downloads/${data.name}`);
    const request = http.get(`http://localhost:3000/uploads/${data.name}`, function (response) {
        response.pipe(file);
    });
})

// socket.on('', function (data) {
// })



