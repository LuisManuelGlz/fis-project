var socket = io();

var id = document.getElementById('id').textContent;
var name = document.getElementById('name').textContent;
var email = document.getElementById('email').textContent;
var password = document.getElementById('password').textContent;

window.addEventListener('load', function() {
    socket.emit('user:data', {
        id: id,
        name: name,
        email: email,
        password: password
    });
});

socket.on('user:getData', function() {
    socket.emit('user:data', {
        id: id,
        name: name,
        email: email,
        password: password
    });
});