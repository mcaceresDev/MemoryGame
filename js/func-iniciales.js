//----- BOTON DE MENU DE SELECCION DE NIVELES ----
let btnMenu = document.querySelector("#burguer");
btnMenu.addEventListener('click', mostrarNiveles);

let cierre = document.querySelector(".btn-cierre");
cierre.addEventListener('click', cerrarMenu);

document.querySelector("#relax").addEventListener("click", relax);

function mostrarNiveles(evento) {
  evento.stopPropagation();
  let menu = document.querySelector(".barra-menu");
  menu.classList.add('visible');
}
function cerrarMenu() {
  let menu = document.querySelector(".barra-menu");
  menu.classList.remove('visible');
}

function relax() {
  modoRelax = true;
  btnMenu.style.display = "block";
  Iniciar();
}


//----- BOTON DE INICIO (PRIMER PANTALLA) ----
let inicia = document.querySelector(".comienzo");
inicia.addEventListener("click", Iniciar);

let bienvenida = document.querySelector(".pantallaInicio");

//------------FUNCION DE ARRANQUE--------------------
function Iniciar() {
  var nivelTexto = nivelActual + 1;
   indicadorNivel.innerText = "0" + nivelTexto;
   movTotal.innerText = "0" + niveles[nivelActual].movimientos;


  bienvenida.style.display = "none";
  comienza();

  if (modoRelax === true) {
    let menuNiveles = document.querySelector("#menuNiveles");

    niveles.forEach(function(elemento, indice) {
      let ctrlNiveles = document.createElement("li");
        ctrlNiveles.innerHTML = "<a class='nivel' data-nivel="
         + indice + "> Nivel " + (indice + 1) + "</a>";

    menuNiveles.appendChild(ctrlNiveles);
    });
    //asignamos el listener a cada elemento de la lista de seleccion de niveles
    document.querySelectorAll(".nivel").forEach(function(elemento) {
      elemento.addEventListener("click", cambiaNivel);
    });

    return;
  }

  else {
    iniciaTiempo();
  }
}

//------------FUNCION DE CREACION DE MESA DE JUEGO--------------------
function comienza() {
  document.querySelector("#pistaFondo").load();

  let mesa = document.querySelector(".mesa");
  let mazo = niveles[nivelActual].tarjetas;
  let cartas = baraja(mazo);

  mesa.innerHTML = "";

  cartas.forEach(function(elemento) {
      let carta = document.createElement("div");
      carta.setAttribute("class","carta");
      carta.innerHTML = "<div class='reverso'>" + "</div>" +
      "<div class='carta-Valor' data-contenido= " + elemento + ">" + elemento + "</div>";
      mesa.appendChild(carta);
    });

    document.querySelectorAll(".carta").forEach(function(elemento) {
      elemento.addEventListener("click", voltear);
    });
}

//----- FUNCION DE ORDEN ALEATORIO ----
function baraja(mazo) {
  let grupoTarjetas = mazo.concat(mazo);

  let resultado = grupoTarjetas.sort(function () {
    return 0.5 - Math.random();
  });
  return resultado;
}

//----- FUNCION DE VOLTEO DE CARTAS ----
function voltear() {
  let descubiertas;
  let totalDescubiertas = document.querySelectorAll(".descubierta");
  let tarjetasAcertadas;

  if (totalDescubiertas.length > 1) {
    return;
  }
    this.classList.add("descubierta");
    volteo.play();
    descubiertas = document.querySelectorAll(".descubierta");

  if (descubiertas.length < 2) {
    return;
  }
  tarjetas = document.querySelectorAll(".descubierta .carta-Valor");
  comparar(tarjetas);
}

//----- FUNCION COMPARA CARTAS ----
function comparar(descubiertas) {
  if (descubiertas[0].dataset.contenido  === descubiertas[1].dataset.contenido) {
    acierto(descubiertas);
    aciertos.play();

        let tarjetasAcertadas = document.querySelectorAll(".acertada");
        if (tarjetasAcertadas.length === document.querySelectorAll(".carta").length) {
          setTimeout(function() {
            movimientos = 0;
            document.querySelector("#mov").innerText = movimientos;
            finalizar();
            clearInterval(tiempo);
          }, 1000);
        }
        else {
          contadorMovimientos();
        }
    }
   else {
    error(descubiertas);
    fallos.play();
    contadorMovimientos();
   }
}

//----- FUNCION DE ACIERTO ----
function acierto(lasTarjetas) {
  lasTarjetas.forEach(function(elemento){
    elemento.classList.add("acertada");
  });
  setTimeout(function () {
    let totalDescubiertas = document.querySelectorAll(".descubierta");
    totalDescubiertas.forEach(function(elemento){
      elemento.classList.remove('descubierta');
      elemento.style.display = 'none';
    });
  } ,1000);

}

//----- FUNCION DE ERROR ----
function error(lasTarjetas) {

  lasTarjetas.forEach(function(elemento){
    elemento.classList.add("error");

  });

  setTimeout(
    function(){
      lasTarjetas.forEach(function(elemento){
        elemento.classList.remove("error");
      });
      let totalDescubiertas = document.querySelectorAll(".descubierta");
      totalDescubiertas.forEach(function(elemento){
        elemento.classList.remove('descubierta');
      });
    }, 1000);
}