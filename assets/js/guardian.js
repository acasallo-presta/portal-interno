// 1. GUARDIÁN DE RUTA: Si no hay token en memoria, lo devuelve al inicio
if (!sessionStorage.getItem('token_google_ia')) {
    window.location.replace('index.html');
}

// 2. FUNCIÓN DE CERRAR SESIÓN: Disponible para todas las subpáginas
function cerrarSesion() {
    sessionStorage.removeItem('token_google_ia'); // Borramos la memoria
    window.location.replace('index.html'); // Lo redirigimos a la página de login
}
