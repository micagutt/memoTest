document.addEventListener("DOMContentLoaded", () => {
  const nombre = localStorage.getItem("nombreJugador");
  if (nombre) {
    document.getElementById("nombre-jugador").textContent = nombre;
    iniciarJuego();
  }
});

let puntaje = 0;
let primera = null;
let segunda = null;
let bloqueado = false;

function iniciarJuego() {
  const tablero = document.getElementById("tablero");
  const imagenes = [
    "Cenicienta.png", "Bella.png", "blancanieves.png", "Ariel.png", "Tiana.png", "jasmine.png"
  ];
  const pares = [...imagenes, ...imagenes];
  pares.sort(() => 0.5 - Math.random());

  pares.forEach((nombreImg) => {
    const carta = document.createElement("div");
    carta.classList.add("carta");

    // Estructura para el flip
    carta.innerHTML = `
      <div class="carta-inner">
        <div class="carta-front"></div>
        <div class="carta-back">
          <img src="./assets/img/${nombreImg}" alt="carta" />
        </div>
      </div>
    `;

    carta.dataset.imagen = nombreImg;

    carta.addEventListener("click", () => {
      if (bloqueado || carta.classList.contains("descubierta")) return;

      carta.classList.add("descubierta");

      if (!primera) {
        primera = carta;
      } else {
        segunda = carta;
        bloqueado = true;

        const img1 = primera.dataset.imagen;
        const img2 = segunda.dataset.imagen;

        if (img1 === img2) {
          puntaje++;
          document.getElementById("puntaje").textContent = puntaje;
          primera = null;
          segunda = null;
          bloqueado = false;

          if (puntaje === imagenes.length) {
            mostrarGanaste();
          }
        } else {
          setTimeout(() => {
            primera.classList.remove("descubierta");
            segunda.classList.remove("descubierta");
            primera = null;
            segunda = null;
            bloqueado = false;
          }, 1000);
        }
      }
    });

    tablero.appendChild(carta);
  });
}

// Popup de "¡GANASTE!"
function mostrarGanaste() {
  const popup = document.createElement("div");
  popup.className = "popup-ganaste-overlay";

  const mensaje = document.createElement("div");
  mensaje.className = "popup-ganaste-mensaje";
  mensaje.innerHTML = "<p>¡GANASTE!</p>";

  // Botones
  const btnReiniciar = document.createElement("button");
  btnReiniciar.textContent = "Volver a jugar";
  btnReiniciar.className = "popup-ganaste-btn";
  btnReiniciar.onclick = () => {
    document.body.removeChild(popup);
    reiniciarTablero();
  };

  const btnSalir = document.createElement("button");
  btnSalir.textContent = "Terminar el juego";
  btnSalir.className = "popup-ganaste-btn";
  btnSalir.onclick = () => {
    window.location.href = "inicio.html"; // Cambia el nombre si tu pantalla de inicio es diferente
  };

  mensaje.appendChild(btnReiniciar);
  mensaje.appendChild(btnSalir);
  popup.appendChild(mensaje);
  document.body.appendChild(popup);
}

function reiniciarTablero() {
  // Oculta todas las imágenes y quita la clase "descubierta"
  document.querySelectorAll('.carta').forEach(carta => {
    carta.classList.remove('descubierta');
    const img = carta.querySelector('img');
    if (img) img.style.visibility = 'hidden';
  });
  // Reinicia el puntaje
  puntaje = 0;
  document.getElementById("puntaje").textContent = puntaje;
  // Reinicia variables de control
  primera = null;
  segunda = null;
  bloqueado = false;
}

// Mostrar y ocultar instrucciones
document.getElementById("boton-instrucciones").onclick = function() {
  document.getElementById("contenedor-instrucciones").style.display = "block";
};
document.getElementById("cerrar").onclick = function() {
  document.getElementById("contenedor-instrucciones").style.display = "none";
};
window.onclick = function(event) {
  const modal = document.getElementById("contenedor-instrucciones");
  if (event.target === modal) {
    modal.style.display = "none";
  }
};