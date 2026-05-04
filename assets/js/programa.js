// ==========================================
// SCRIPT: PROGRAMA DE CONSTRUCTORES (FOMO)
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    // Validamos que existan los elementos en la página actual antes de ejecutar
    const relojContainer = document.getElementById('reloj-cuenta-regresiva');
    const cuposElemento = document.getElementById('cupos-restantes');

    if (relojContainer && cuposElemento) {
        
        // 1. Lógica del Reloj de Cuenta Regresiva
        const fechaObjetivo = new Date('May 20, 2026 09:00:00').getTime();
        
        const actualizarReloj = setInterval(() => {
            const ahora = new Date().getTime();
            const diferencia = fechaObjetivo - ahora;
            
            if (diferencia >= 0) {
                const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
                const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
                const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);
                
                document.getElementById("dias").innerText = dias < 10 ? '0' + dias : dias;
                document.getElementById("horas").innerText = horas < 10 ? '0' + horas : horas;
                document.getElementById("min").innerText = minutos < 10 ? '0' + minutos : minutos;
                document.getElementById("seg").innerText = segundos < 10 ? '0' + segundos : segundos;
            } else {
                // Si el tiempo se acaba, detenemos el reloj y mostramos CERRADO
                clearInterval(actualizarReloj);
                relojContainer.innerHTML = "<div class='tiempo-box' style='width: 100%;'><span>CERRADO</span></div>";
            }
        }, 1000);

        // 2. Lógica del Contador de Cupos Falso (Efecto en Vivo)
        let cupos = 14; // Inicia en 14 para dar sensación de urgencia
        
        setInterval(() => {
            // Simula que alguien tomó un cupo aleatoriamente (entre 15 y 45 segundos)
            // Solo si hay más de 3 cupos restantes
            if(cupos > 3 && Math.random() > 0.5) { 
                cupos--;
                cuposElemento.innerText = cupos < 10 ? '0' + cupos : cupos;
                
                // Pequeño flash visual al cambiar de número
                cuposElemento.style.color = '#fbd38d';
                setTimeout(() => cuposElemento.style.color = 'white', 500);
            }
        }, Math.floor(Math.random() * 30000) + 15000);
    }
});

// ==========================================
// SCRIPT: TARJETAS EXPANDIBLES (MARCO TRANSFORMACIÓN)
// ==========================================
function abrirPaso(elemento) {
    // 1. Verificamos si la tarjeta que tocamos ya está abierta
    const estaActiva = elemento.classList.contains('activo');
    
    // 2. Buscamos TODAS las tarjetas y las cerramos por defecto
    const todasLasTarjetas = document.querySelectorAll('.paso-card-int');
    todasLasTarjetas.forEach(tarjeta => {
        tarjeta.classList.remove('activo');
    });

    // 3. Si la que tocamos NO estaba abierta, la abrimos. 
    // Si ya estaba abierta, se quedará cerrada (funciona como interruptor).
    if (!estaActiva) {
        elemento.classList.add('activo');
    }
}
