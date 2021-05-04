let avanza = document.querySelector("#avanzar");
avanza.addEventListener("click", subeNivel);

let salida = document.querySelectorAll(".salir");
salida.forEach(function(elemento) {
  elemento.addEventListener("click", Salir);
});

let reinicia = document.querySelectorAll(".reinicia");
reinicia.forEach(function(elemento) {
  elemento.addEventListener("click", reiniciar);
});

let reintenta = document.querySelector(".reintenta");
reintenta.addEventListener("click", reintentar);

//---------- TEMPORIZADOR -----------------
function iniciaTiempo() {
  let segundos = niveles[nivelActual].temporizadorSeg;
  let minutos = niveles[nivelActual].temporizadorMin;
  let segundosTexto;
  let minutosTexto;

  if (modoRelax = true) {
    tiempo = setInterval(actualizaTiempo, 1000);
  }
    function actualizaTiempo() {
      segundos--;
      if (segundos < 0) {
        segundos = 59;
        minutos--;
      }
      if (minutos < 0) {
        segundos = 0;
        minutos = 0;
        clearInterval(tiempo);
        gameOver();
      }
      segundosTexto = segundos;
      minutosTexto = minutos;
      if (segundos < 10) {
        segundosTexto = "0" + segundos;
      }
      if (minutos < 10) {
        minutosTexto = "0" + minutos;
      }
      document.querySelector("#minutos").innerText = minutosTexto;
      document.querySelector("#segundos").innerText = segundosTexto;
    }
  tiempo = setInterval(actualizaTiempo, 1000);
}

//---------- CONTADOR -----------------
function contadorMovimientos() {
  let totalMov = niveles[nivelActual].movimientos;
  let movimientosTexto;
  movimientos++;
  if (movimientos < 10) {
    movimientosTexto = "0" + movimientos;
  }
  movimientosTexto = movimientos;
  document.querySelector("#mov").innerText = movimientosTexto;

  if (movimientos === totalMov) {
    let perdiste = document.querySelector(".content");
    perdiste.innerHTML = "<h2>Movimientos Agotados</h2>" + "<p>Has sobrepasado el límite de movimientos</p>";
    gameOver();
  }
  return;
}


//---------- NIVELES -----------------
function subeNivel() {
  nivelActual++;
  if (nivelActual === niveles.length) {
    finalizar();
    return;
  }
  movTotal.innerText = niveles[nivelActual].movimientos;
  let nivelTexto = nivelActual + 1;


  if (nivelTexto < 10) {
    indicadorNivel.innerText = "0" + nivelTexto;
  }

  document.querySelector("#subeNivel").classList.remove("visible");
  comienza();
    iniciaTiempo();
}

//---------- GAME OVER -----------------
function gameOver() {
  document.querySelector("#gameOver").classList.add("visible");

}
//---------- FUNCION REINICIAR -----------------
function reiniciar() {
  let auxiliar = document.querySelectorAll(".auxiliar");
  auxiliar.forEach(function(elemento) {
    elemento.classList.remove('visible');
  });
  movimientos = 0;
  clearInterval(tiempo);
  nivelActual = 0;
  Iniciar();
}
//---------- FUNCION REINTENTAR -----------------
function reintentar() {
  let auxiliar = document.querySelectorAll(".auxiliar");
  movimientos = 0;
  document.querySelector("#mov").innerText = movimientos;
  clearInterval(tiempo);

  comienza();
  iniciaTiempo();

  auxiliar.forEach(function(elemento) {
    elemento.classList.remove('visible');
  });
}

//---------- FIN JUEGO -----------------
function finalizar() {
  document.querySelector("#endGame").classList.add("visible");
}

//---------- FUNCION SALIR -----------------
function Salir() {
  let intro = document.querySelector("#pistaFondo");
  let auxiliar = document.querySelectorAll(".auxiliar");
  auxiliar.forEach(function(elemento) {
    elemento.classList.remove('visible');
  });
  movimientos = 0;
  clearInterval(tiempo);
  nivelActual = 0;

  bienvenida.style.display = 'flex';
  intro.play();
}
