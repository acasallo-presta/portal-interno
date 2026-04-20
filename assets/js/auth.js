window.onload = function() {
    const tokenGuardado = sessionStorage.getItem('token_google_ia');
    if (tokenGuardado) {
        try {
            const payload = JSON.parse(atob(tokenGuardado.split('.')[1]));
            document.getElementById('nombre-usuario').innerText = "Hola, " + payload.name;
            document.getElementById('pantalla-login').style.display = 'none';
            document.getElementById('contenido-portal').style.display = 'block';
        } catch(e) {
            sessionStorage.removeItem('token_google_ia');
        }
    }
};

function manejarLoginGoogle(response) {
    const token = response.credential;
    const payload = JSON.parse(atob(token.split('.')[1]));
    const emailUsuario = payload.email;

    if(emailUsuario.endsWith('@prestamype.com') || emailUsuario.endsWith('@cambioseguro.com')) {
        sessionStorage.setItem('token_google_ia', token);
        document.getElementById('pantalla-login').style.display = 'none';
        document.getElementById('contenido-portal').style.display = 'block';
        document.getElementById('nombre-usuario').innerText = "Hola, " + payload.name;
    } else {
        alert("Acceso denegado. Usa un correo de Prestamype o Cambio Seguro.");
    }
}

function cerrarSesion() {
    sessionStorage.removeItem('token_google_ia'); 
    location.reload(); 
}
