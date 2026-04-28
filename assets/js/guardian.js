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
// 4. AUTO-SOMBREADO INTELIGENTE DEL MENÚ
// ==========================================
window.addEventListener('DOMContentLoaded', () => {
    // Obtenemos todos los enlaces dentro del div del menú
    const enlacesNav = document.querySelectorAll('nav div a');
    
    // Obtenemos la URL actual limpia (sin dominio, sin barras extras y sin .html)
    // Ejemplo: "/modulo4" o "/modulo4.html" -> "modulo4"
    let urlActual = window.location.pathname.toLowerCase().replace(/^\//, '').replace('.html', '');
    
    // Si la URL está vacía, estamos en el Inicio
    if (urlActual === '') {
        urlActual = 'index';
    }
    
    enlacesNav.forEach(enlace => {
        // Limpiamos la clase activo antes de evaluar
        enlace.classList.remove('activo');
        
        // Obtenemos a dónde apunta el enlace y lo limpiamos
        let hrefEnlace = enlace.getAttribute('href').replace('.html', '');
        
        // REGLA 1: Coincidencia exacta (Inicio, Herramientas, Cursos)
        let esCoincidenciaExacta = (hrefEnlace === urlActual);
        
        // REGLA 2: Es una subpágina de cursos
        // Si la URL actual contiene "modulo" o "curso-" y el botón es "cursos"
        let esSubpaginaCursos = (
            (urlActual.includes('modulo') || urlActual.includes('curso')) && 
            hrefEnlace === 'cursos'
        );
        
        // Si cumple cualquiera de las dos, sombreamos el botón
        if (esCoincidenciaExacta || esSubpaginaCursos) {
            enlace.classList.add('activo');
        }
    });
});
