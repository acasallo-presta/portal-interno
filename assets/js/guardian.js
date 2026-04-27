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

// ==========================================
// 4. AUTO-SOMBREADO DEL MENÚ SEGÚN LA URL
// ==========================================
window.addEventListener('DOMContentLoaded', () => {
    // Obtenemos todos los enlaces del menú
    const enlacesNav = document.querySelectorAll('nav div a');
    
    // Leemos en qué página estamos (ej: 'herramientas.html' o vacío si es la raíz)
    let urlActual = window.location.pathname.split('/').pop();
    
    // Si la URL está vacía (como pasa a veces en el inicio), asumimos index.html
    if (urlActual === '' || urlActual === '/') {
        urlActual = 'index.html';
    }
    
    enlacesNav.forEach(enlace => {
        // Primero le quitamos la clase activo a todos
        enlace.classList.remove('activo');
        
        // Si el enlace apunta a la página donde estamos, lo "encendemos"
        if (enlace.getAttribute('href') === urlActual) {
            enlace.classList.add('activo');
        }
    });
});
