// Este menu esta disponible si se juega en modo relax
// btnBurguer.addEventListener('click', mostrarNiveles);
// btnCloseMenu.addEventListener('click', cerrarMenu);
// btnEnableRelax.querySelector("#relax").addEventListener("click", relax);

//Estas funciones solo toman accion si fallas, fracasas, aciertas o ganas. 
//Los demas audios seguiran sonando
btnSound.addEventListener("click", () => {
  btnSound.style.display = "none";
  btnMute.style.display = "block";

  hasSound = true;
});

//---------- FUNCIONES ELEMENTALES ------------
class GameOptions {

  toggleMenu = (event) => {
    event.stopPropagation();
    let menu = document.querySelector(".barra-menu")
    menu.classList.contains("visible") ? menu.classList.remove('visible') : menu.classList.add('visible');
  }

  playRelaxMode = () => {
    modoRelax = true;
    btnMenu.style.display = "block";
    this.startGame();
  }

  startGame = () => {
    console.log("Has dado click");
    mainScreen.style.display = "none";
    setConfigs();

    if (modoRelax === true) {
      let levelsMenu = document.querySelector("#menuNiveles");

      levels.forEach(function (elemento, index) {
        let btnLevel = document.createElement("li");
        btnLevel.innerHTML = "<a class='nivel' data-nivel="
          + index + "> Nivel " + (index + 1) + "</a>";

        levelsMenu.appendChild(btnLevel);
      });
      //asignamos el listener a cada elemento de la lista de seleccion de niveles
      document.querySelectorAll(".nivel").forEach(function (elemento) {
        elemento.addEventListener("click", cambiaNivel);
      });

      return;
    }

      runTimer();
  }

  // Metodo para actualizar elementos visuales por nivel
  refresh() {
    levelIndicator.innerText = `0${currentLevel + 1}`;
    movesIndicator.innerText = `0${levels[currentLevel].maxMoves}`;
  }

// btnMute.addEventListener("click", () => {
//   btnMute.style.display = "none";
//   btnSound.style.display = "block";

//   hasSound = false;
// });

//--------------------------------------------------

//----- BOTON DE INICIO (PRIMER PANTALLA) ----
// inicia = document.querySelector(".comienzo");
// inicia.addEventListener("click", Iniciar);

// bienvenida = document.querySelector(".pantallaInicio");



//------------FUNCION DE CREACION DE MESA DE JUEGO--------------------
setConfigs() {
  document.querySelector("#pistaFondo").load();

  let table       = document.querySelector(".mesa");
  let deckCards   = levels[currentLevel].cardGroup;
  let mixedCards  = this.shuffleCards(deckCards);

  table.innerHTML = "";
  mixedCards.forEach(function (value) {
    let card = document.createElement("div");
    
    card.setAttribute("class", "carta");
    card.innerHTML = "<div class='reverso'>" + "</div>" +
      "<div class='carta-Valor' data-contenido= " + value + ">" + value + "</div>";
    
    table.appendChild(card);
  });

  //asignamos el listener para poder voltear las cartas
  document.querySelectorAll(".carta").forEach(function (card) {
    card.addEventListener("click", flip);
  });
}

//----- FUNCION DE ORDEN ALEATORIO ----
 shuffleCards(deck) {
  
  let clonedCards = deck.concat(deck);
  let mixedCards = clonedCards.sort(function () {
    return 0.5 - Math.random();
  });

  return mixedCards;
}

//----- FUNCION DE VOLTEO DE CARTAS ----
 flip() {
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
 comparar(descubiertas) {
  // comparamos el atributo dataset para ver si tienen el mismo contenido
  if (descubiertas[0].dataset.contenido === descubiertas[1].dataset.contenido) {
    acierto(descubiertas);
    if (sonido) {
      aciertos.play();
    }

    let tarjetasAcertadas = document.querySelectorAll(".acertada");
    //validamos que todas las cartas se hayan acertado
    if (tarjetasAcertadas.length === document.querySelectorAll(".carta").length) {
      setTimeout(function () {
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
    if (sonido) {
      fallos.play();
    }
    contadorMovimientos();
  }
}

//----- FUNCION DE ACIERTO ----
 acierto(lasTarjetas) {
  lasTarjetas.forEach(function (elemento) {
    elemento.classList.add("acertada");
  });
  setTimeout(function () {
    let totalDescubiertas = document.querySelectorAll(".descubierta");
    totalDescubiertas.forEach(function (elemento) {
      elemento.classList.remove('descubierta');
      elemento.style.display = 'none';
    });
  }, 1000);

}

//----- FUNCION DE ERROR ----
 error(lasTarjetas) {

  lasTarjetas.forEach(function (elemento) {
    elemento.classList.add("error");

  });

  setTimeout(
    function () {
      lasTarjetas.forEach(function (elemento) {
        elemento.classList.remove("error");
      });
      let totalDescubiertas = document.querySelectorAll(".descubierta");
      totalDescubiertas.forEach(function (elemento) {
        elemento.classList.remove('descubierta');
      });
    }, 1000);
}

}

const btnStart = document.querySelector(".btn-start");
const gameOptions = new GameOptions();
btnStart.addEventListener("click", gameOptions.startGame)