var socket = io();

var id = document.getElementById('id');
var name2 = document.getElementById('name2');
var email = document.getElementById('email');
var screen = document.getElementById('screen-1');
// var computer = document.getElementById('name1').textContent;

window.addEventListener('load', function() {
    socket.emit('user:getData');
});

socket.on('user:data', function(data) {
    id.textContent = data.id;
    name1.textContent = data.name; 
    name2.textContent = data.name;
    email.textContent = data.email;
    screen.src = '../../images/blue.jpg';
});

// borrar después
socket.on('user:clean', function(data) {
    id.textContent = data.id;
    name1.textContent = 'Libre'; 
    name2.textContent = data.name;
    email.textContent = data.email;
    screen.src = '../../images/gray.jpg';
});

socket.on('disconnect', function() {
    // borrar después
    socket.emit('user:clean');
});
