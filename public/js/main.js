





//--------------- LISTENERS ----------------------
// // boton para subir de nivel al terminar el anterior
// let avanza = document.querySelector("#avanzar");
// avanza.addEventListener("click", subeNivel);

// //boton para salir del juego
// let salida = document.querySelectorAll(".salir");
// salida.forEach(function(elemento) {
//   elemento.addEventListener("click", Salir);
// });

// // boton para reniciar desde cero
// let reinicia = document.querySelectorAll(".reinicia");
// reinicia.forEach(function(elemento) {
//   elemento.addEventListener("click", reiniciar);
// });

// //boton para reintentar
// let reintenta = document.querySelector(".reintenta");
// reintenta.addEventListener("click", reintentar);

// // Procedimiento para cambiar de temade juego
// document.querySelector("#tema").addEventListener("click", function() {
//   this.style.display = "none";
//   document.getElementById('cmbTema').href = './css/tema2.css';
//   document.getElementById('tema2').style.display = "block";
// });

// document.querySelector("#tema2").addEventListener("click", function() {
//   document.getElementById('cmbTema').href = './css/general.css';
//   this.style.display = "none";
//   document.getElementById('tema').style.display = "block";
// });

// //listeners para cerrar el menu de niveles
// document.querySelector("body").addEventListener("click", clickFueraDeMenu);

// document.addEventListener("keydown", teclaEscCierraMenu);
// //---------- TEMPORIZADOR -----------------
// function runTimer() {
//   let segundos = niveles[nivelActual].temporizadorSeg;
//   let minutos = niveles[nivelActual].temporizadorMin;
//   let segundosTexto;
//   let minutosTexto;

//     function actualizaTiempo() {
//       segundos--;
//       if (segundos < 0) {
//         segundos = 59;
//         minutos--;
//       }
//       if (minutos < 0) {
//         segundos = 0;
//         minutos = 0;
//         clearInterval(tiempo);
//         gameOver();
//         fallaste.play();
//       }
//       segundosTexto = segundos;
//       minutosTexto = minutos;
//       if (segundos < 10) {
//         segundosTexto = "0" + segundos;
//       }
//       if (minutos < 10) {
//         minutosTexto = "0" + minutos;
//       }
//       document.querySelector("#minutos").innerText = minutosTexto;
//       document.querySelector("#segundos").innerText = segundosTexto;
//     }
//   if (modoRelax === true) {
//     return;
//   }
//   else {
//     tiempo = setInterval(actualizaTiempo, 1000);
//   }
// }

// //---------- CONTADOR -----------------
// function contadorMovimientos() {
//   let totalMov = niveles[nivelActual].movimientos;
//   let movimientosTexto;
//   movimientos++;
//   if (movimientos < 10) {
//     movimientosTexto = "0" + movimientos;
//   }
//   movimientosTexto = movimientos;
//   document.querySelector("#mov").innerText = movimientosTexto;

//   if (movimientos === totalMov && modoRelax===false) {
//     let perdiste = document.querySelector(".content");
//     perdiste.innerHTML = "<h2>Movimientos Agotados</h2>" + "<p>Has sobrepasado el límite de movimientos</p>";
//     gameOver();
//     fallaste.play();
//   }
//   return;
// }


// //---------- NIVELES -----------------
// function subeNivel() {
//   nivelActual++;
//   if (nivelActual === niveles.length) {
//     finalizar();
//   }
//   movTotal.innerText = niveles[nivelActual].movimientos;
//   let nivelTexto = nivelActual + 1;


//   if (nivelTexto < 10) {
//     indicadorNivel.innerText = "0" + nivelTexto;
//   }

//   document.querySelector("#subeNivel").classList.remove("visible");
//   setConfigs();
//     runTimer();
// }

// //Funcion para establecer Niveles
// function cambiaNivel() {
//   var nvl = parseInt(this.dataset.nivel);
//   nivelActual = nvl;
//   movTotal.innerText = niveles[nivelActual].movimientos;
//   setConfigs();
// }

// //---------- GAME OVER -----------------
// function gameOver() {
//   document.querySelector("#gameOver").classList.add("visible");

// }
// //---------- FUNCION REINICIAR -----------------
// function reiniciar() {
//   let auxiliarModal = document.querySelectorAll(".auxiliar");
//   auxiliarModal.forEach(function(elemento) {
//     elemento.classList.remove('visible');
//   });
//   movimientos = 0;
//   clearInterval(tiempo);
//   nivelActual = 0;
//   Iniciar();
// }
// //---------- FUNCION REINTENTAR -----------------
// function reintentar() {
//   let auxiliar = document.querySelectorAll(".auxiliar");
//   movimientos = 0;
//   document.querySelector("#mov").innerText = movimientos;
//   clearInterval(tiempo);

//   setConfigs();
//   runTimer();

//   auxiliar.forEach(function(elemento) {
//     elemento.classList.remove('visible');
//   });
// }

// //---------- FIN JUEGO -----------------
// function finalizar() {
//   if (nivelActual === niveles.length) {
//     document.querySelector("#endGame").classList.add("visible");
//     return;
//   }
//   else {
//     document.querySelector("#subeNivel").classList.add("visible");
//   }
// }

// //---------- FUNCION SALIR -----------------
// function Salir() {
//   if (modoRelax === true) {
//     modoRelax = false;
//     btnMenu.style.display = "none";
//   }
//   let intro = document.querySelector("#pistaFondo");
//   let auxiliar = document.querySelectorAll(".auxiliar");
//   auxiliar.forEach(function(elemento) {
//     elemento.classList.remove('visible');
//   });
//   movimientos = 0;
//   clearInterval(tiempo);
//   nivelActual = 0;

//   bienvenida.style.display = 'flex';
//   intro.play();
// }
// //---------- FUNCION CERRAR MENU NIVELES -----------------

// function clickFueraDeMenu(evento) {
//   if (evento.target.closest(".barra-menu")) {
//     return;
//   }
//   document.querySelector(".barra-menu").classList.remove("visible");
// }

// function teclaEscCierraMenu(evento) {
  
//   if (evento.key === "Escape") {
//     cerrarMenu();
//   }
// }
