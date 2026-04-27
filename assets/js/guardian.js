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
    // Obtenemos solo los enlaces que están dentro del div del menú (Inicio, Herramientas, Cursos)
    const enlacesNav = document.querySelectorAll('nav div a');
    
    // Obtenemos la URL actual y la limpiamos (quitamos la barra inicial y el ".html" si lo tiene)
    // Ejemplo: "/herramientas" o "/herramientas.html" se convierte en "herramientas"
    let urlActual = window.location.pathname.toLowerCase().replace(/^\//, '').replace('.html', '');
    
    // Si la URL está vacía, significa que estamos en la raíz (Inicio)
    if (urlActual === '') {
        urlActual = 'index';
    }
    
    enlacesNav.forEach(enlace => {
        // Le quitamos la clase activo a todos por defecto
        enlace.classList.remove('activo');
        
        // Obtenemos a dónde apunta el botón y lo limpiamos también
        let hrefEnlace = enlace.getAttribute('href').replace('.html', '');
        
        // REGLA 1: Coincidencia exacta (ej: 'herramientas' === 'herramientas')
        let esCoincidenciaExacta = (hrefEnlace === urlActual);
        
        // REGLA 2: Es una subpágina de cursos (ej: la URL es 'curso-introductorio' y el botón es 'cursos')
        let esSubpaginaCursos = (urlActual.startsWith('curso-') && hrefEnlace === 'cursos');
        
        // Si cumple cualquiera de las dos reglas, encendemos el botón
        if (esCoincidenciaExacta || esSubpaginaCursos) {
            enlace.classList.add('activo');
        }
    });
});
