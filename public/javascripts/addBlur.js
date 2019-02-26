// function addBlur() {
//     var element = document.getElementById('bg');
//     element.classList.add('blur-me');
//     // alert('hola');
// }

function addBlur() {
    var c = document.getElementsByClassName('bg');
    for (var i = 0; i < c.length; i++) {
        c[i].className += ' blur-me';
    } // end for
} // end function addBlur

window.onload = addBlur;