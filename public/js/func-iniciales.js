//----- BOTON DE MENU DE SELECCION DE NIVELES ----
// Este menu esta disponible si se juega en modo relax
btnBurguer.addEventListener('click', mostrarNiveles);

btnCloseMenu.addEventListener('click', cerrarMenu);


function mostrarNiveles(evento) {
  evento.stopPropagation();
  let menu = document.querySelector(".barra-menu");
  menu.classList.add('visible');
}

function cerrarMenu() {
  let menu = document.querySelector(".barra-menu");
  menu.classList.remove('visible');
}

// boton que inicia el modo relax
document.querySelector("#relax").addEventListener("click", relax);

function relax() {
  modoRelax = true;
  btnMenu.style.display = "block";
  Iniciar();
}
//---------------------------------------------------------


// Activar o desactivar sonido durante el juego
let btnSound = document.getElementById("sonido");
let btnMute = document.getElementById("mute");

//estas funciones solo toman accion sobre el resultado de voltear las cartas. 
//Los demas audios seguiran sonando
btnSound.addEventListener("click", () => {
  btnSound.style.display = "none";
  btnMute.style.display = "block";

  sonido = true;
}); 
btnMute.addEventListener("click", () => {
  btnMute.style.display = "none";
  btnSound.style.display = "block";

  sonido = false;
}); 

//--------------------------------------------------

//----- BOTON DE INICIO (PRIMER PANTALLA) ----
let inicia = document.querySelector(".comienzo");
inicia.addEventListener("click", Iniciar);

let bienvenida = document.querySelector(".pantallaInicio");

//------------FUNCION DE ARRANQUE--------------------
function Iniciar() {
  var nivelTexto = nivelActual + 1; //referencia al indicador de niveles.
   indicadorNivel.innerText = "0" + nivelTexto;
   movTotal.innerText = "0" + niveles[nivelActual].movimientos;

  // ocultamos la pantalla de inicio y ejecutamos la funcion comienza
  bienvenida.style.display = "none";
  comienza();

  if (modoRelax === true) {
    let menuNiveles = document.querySelector("#menuNiveles");
    //creamos la lista que contiene el menu de niveles
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
  /*seleccionamos el div donde se ubican nuestras cartas y definimos el mazo
  el mazo sera igual a la variable global niveles(arreglo) y tomamos la posicion en base al valor de
  la variable nivel actual
  Por ultimo, ejecutamos la funcion que baraja el grupo de cartas seleccionado */
  let mesa = document.querySelector(".mesa");
  let mazo = niveles[nivelActual].tarjetas;
  let cartas = baraja(mazo);

  mesa.innerHTML = "";
  /*Tomamos las cartas barajadas y recorremos el total de estas 
  para crear su contenido
  Por ultimo agregamos todas las cartas a la mesa*/
  cartas.forEach(function(elemento) {
      let carta = document.createElement("div");
      carta.setAttribute("class","carta");
      carta.innerHTML = "<div class='reverso'>" + "</div>" +
      "<div class='carta-Valor' data-contenido= " + elemento + ">" + elemento + "</div>";
      mesa.appendChild(carta);
    });
    //asignamos el listener para poder voltear las cartas
    document.querySelectorAll(".carta").forEach(function(elemento) {
      elemento.addEventListener("click", voltear);
    });
}

//----- FUNCION DE ORDEN ALEATORIO ----
function baraja(mazo) {//le enviamos el mazo de cartas desde la funcion anterior
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
  // comparamos el atributo dataset para ver si tienen el mismo contenido
  if (descubiertas[0].dataset.contenido  === descubiertas[1].dataset.contenido) {
    acierto(descubiertas);
    if(sonido){
      aciertos.play();
    }

        let tarjetasAcertadas = document.querySelectorAll(".acertada");
        //validamos que todas las cartas se hayan acertado
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
    if(sonido){
      fallos.play();
    }
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
