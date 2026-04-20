function toggleChat() {
    const ventanaChat = document.getElementById('chatbot-flotante');
    ventanaChat.style.display = (ventanaChat.style.display === 'none' || ventanaChat.style.display === '') ? 'flex' : 'none';
}

async function enviarMensaje() {
    const input = document.getElementById('input-mensaje');
    const caja = document.getElementById('caja-mensajes');
    const texto = input.value.trim();
    if (!texto) return;

    caja.innerHTML += `<div class="mensaje mensaje-usuario">${texto}</div>`;
    input.value = '';
    
    const idPensando = "pensando-" + Date.now();
    caja.innerHTML += `<div id="${idPensando}" class="mensaje mensaje-bot" style="font-style: italic; opacity: 0.7;">Analizando...</div>`;
    caja.scrollTop = caja.scrollHeight;

    try {
        // *** REEMPLAZA CON TU WORKER REAL ***
        const URL_WORKER = "https://TU_URL_DE_CLOUDFLARE_AQUI.workers.dev/";
        const tokenGuardado = sessionStorage.getItem('token_google_ia');

        const respuesta = await fetch(URL_WORKER, {
            method: "POST",
            headers: { "Content-Type": "application/json", "Authorization": "Bearer " + tokenGuardado },
            body: JSON.stringify({ mensaje: texto })
        });

        const datos = await respuesta.json();
        document.getElementById(idPensando).remove();
        caja.innerHTML += `<div class="mensaje mensaje-bot">${datos.respuesta}</div>`;
        caja.scrollTop = caja.scrollHeight;
    } catch (error) {
        if(document.getElementById(idPensando)) document.getElementById(idPensando).innerHTML = "Error de conexión.";
    }
}

function manejarEnter(event) { if (event.key === 'Enter') enviarMensaje(); }
