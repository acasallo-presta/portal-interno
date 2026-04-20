// Si no hay token en memoria, lo devuelve al inicio inmediatamente
if (!sessionStorage.getItem('token_google_ia')) {
    window.location.replace('index.html');
}
