var socket = io();

var name1 = document.getElementsByClassName('name1');
var id = document.getElementsByClassName('id');
var name2 = document.getElementsByClassName('name2');
var email = document.getElementsByClassName('email');
var screen = document.getElementsByClassName('screen');

window.addEventListener('load', function() {
    socket.emit('user:getData');
});

socket.on('user:data', function(data) {
    var stop = false;
    
    for (let i=0; i<name1.length; i++) {
        for (let j=0; j<id.length; j++) {
            if (id[j].textContent == data.name) {
                stop = true;
                break;
            } // end if
        } // end for
        
        if (name1[i].textContent == 'Libre') {
            if (stop) {
                break;
            } // end if
            
            id[i].textContent = data.id;
            name1[i].textContent = data.name;
            name2[i].textContent = data.name;
            email[i].textContent = data.email;
            screen[i].src = '../../images/blue.jpg';

            break;
        } // end if
    } // end for
});

socket.on('disconnect', function() {
    for (let i=0; i<name1.length; i++) {        
        if (name1[i].textContent != 'Libre') {
            id[i].textContent = '';
            name1[i].textContent = 'Libre';
            name2[i].textContent = '';
            email[i].textContent = '';
            screen[i].src = '../../images/gray.jpg';
        } // end if
    } // end for
    
    socket.emit('user:getData');
});
