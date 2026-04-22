// 1. GUARDIÁN DE RUTA: Si no hay token en memoria, lo devuelve al inicio
if (!sessionStorage.getItem('token_google_ia')) {
    window.location.replace('index.html');
}

// 2. EXTRAER Y MOSTRAR EL NOMBRE DEL USUARIO EN LAS SUBPÁGINAS
window.addEventListener('DOMContentLoaded', () => {
    const spanNombre = document.getElementById('nombre-usuario');
    // Si la página tiene el espacio para el nombre, lo rellenamos
    if (spanNombre && sessionStorage.getItem('token_google_ia')) {
        try {
            const token = sessionStorage.getItem('token_google_ia');
            // Decodificamos el token de Google para sacar los datos
            const payload = JSON.parse(atob(token.split('.')[1]));
            // Escribimos el nombre en el menú
            spanNombre.textContent = "Hola, " + payload.name;
        } catch(e) {
            console.error("Error al leer el nombre del usuario", e);
        }
    }
});

// 3. FUNCIÓN DE CERRAR SESIÓN
function cerrarSesion() {
    sessionStorage.removeItem('token_google_ia'); // Borramos la memoria
    window.location.replace('index.html'); // Lo redirigimos a la puerta principal
}
