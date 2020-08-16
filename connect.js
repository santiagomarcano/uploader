// https://socketiotestio.herokuapp.com/
const http = require('http');
const fs = require('fs');
var socket = require('socket.io-client')('https://socketiotestio.herokuapp.com');
// var socket = require('socket.io-client')('http://localhost:5000');

socket.on('connect', function () {
    console.log('connected')
});

socket.on('m', function (data) {
    console.log(data)
})

socket.on('upload', function (data) {
    const file = fs.createWriteStream(data.name);
    const request = http.get('https://socketiotestio.herokuapp.com', function (response) {
        response.pipe(file);
    });
})



