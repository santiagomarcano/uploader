// https://socketiotestio.herokuapp.com/
// var socket = require('socket.io-client')('https://socketiotestio.herokuapp.com:3000');
var socket = require('socket.io-client')('http://localhost:5000');

socket.on('connect', function () {
    console.log('connected')
});

socket.on('m', function (data) {
    console.log(data)
})
