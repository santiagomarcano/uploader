// https://socketiotestio.herokuapp.com/
var socket = require('socket.io-client')('https://socketiotestio.herokuapp.com/');

socket.on('connect', function () {
    console.log('connected')
});

socket.on('m', function (data) {
    console.log(data)
})
