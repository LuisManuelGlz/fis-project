function loadDarkModeButton() {
    // localStorage.clear();

    // obtenemos los elementos
    var navbarStyle = document.getElementsByClassName('navbar');
    var backgroundBody = document.getElementsByClassName('bg-admin');
    var darkModeButton = document.getElementById('toggle');
    
    darkModeButton.checked = localStorage.getItem('isDark'); // si isDark es true se lo asignamos al botón (no sirve xD)
    backgroundBody[0].className = localStorage.getItem('background'); // obtenemos el background guardado
    navbarStyle[0].className = localStorage.getItem('navbar'); // obtenemos el color del navbar
    
    // evento en el que cada vez que el botón esté checkeado, cambia el fondo, el navbar a un tono oscuro
    darkModeButton.addEventListener('change', function() {
        if (this.checked) { // si el toggle button está checkeado
            localStorage.setItem('isDark', true); // setteamos el isDark del localStorage a true
            localStorage.setItem('background', 'bg-admin bg-admin-dark'); // setteamos las clases para su acceso en el css
            localStorage.setItem('navbar', 'navbar navbar-expand-lg navbar-dark bg-dark'); // lo mismo que arriba

            backgroundBody[0].className = 'bg-admin bg-admin-dark';
            navbarStyle[0].className = 'navbar navbar-expand-lg navbar-dark bg-dark';
        } else { // sino
            localStorage.setItem('isDark', false); // setteamos el isDark del localStorage a false
            localStorage.setItem('background', 'bg-admin bg-admin-light'); // setteamos las clases para su acceso en el css
            localStorage.setItem('navbar', 'navbar navbar-expand-lg navbar-light bg-light'); // lo mismo que arriba

            backgroundBody[0].className = 'bg-admin bg-admin-light';
            navbarStyle[0].className = 'navbar navbar-expand-lg navbar-light bg-light';
        } // end if
    });
    // esta línea está en blanco, ignórala
} // end loadDarkModeButton

window.onload = loadDarkModeButton;