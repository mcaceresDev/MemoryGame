// Archivo Environment
class Environment {
    instance
    time
    currentLevel = 0;
    maxMovesIndicator = document.querySelector("#movTotal")
    relaxMode = false
    hasSound = true
    moves = 0
    level = document.querySelector("#nivel")
    cards = [
        ['A', 'B', 'E', 'G'],
        ['C', 'D', 'N', 'O', 'S', 'K'],
        ['M', 'H', 'V', 'L', 'X', 'Y', 'R', 'Q'],
        ['Z', 'I', 'F', 'W', '[', 'T', '_', '^', 'U', ']']
    ];

    levels = [
        {
            cardGroup: this.cards[0],
            maxMoves: 8,
            maxMinutes: 0,
            maxSeconds: 20
        },
        {
            cardGroup: this.cards[1],
            maxMoves: 12,
            maxMinutes: 0,
            maxSeconds: 40
        },
        {
            cardGroup: this.cards[2],
            maxMoves: 20,
            maxMinutes: 1,
            maxSeconds: 0
        },
        {
            cardGroup: this.cards[3],
            maxMoves: 25,
            maxMinutes: 1,
            maxSeconds: 0
        },
        {
            cardGroup: this.cards[2].concat(this.cards[0]),
            maxMoves: 30,
            maxMinutes: 1,
            maxSeconds: 20
        }
    ]
    
    constructor () {
        // console.log(`${typeof this.instance} ${this.instance}`);
        if (Environment.instance) {
            return Environment.instance
        }

        Environment.instance = Environment;
    }
}


const env = new Environment();
let { relaxMode, maxMovesIndicator, levels, currentLevel, hasSound, moves, time } = env

const modal =  new ModalCreator();
// =================================================================================================
// =================================================================================================
// Archivo de funciones del juego
class GameFunctions {

    //----- FUNCION DE ORDEN ALEATORIO ----
    shuffleCards(deck) {
      
      let clonedCards = deck.concat(deck);
      let mixedCards = clonedCards.sort(function () {
        return 0.5 - Math.random();
      });
    
      return mixedCards;
    }

    // Crea la mesa con las cartas y configura el evento click a cada carta
    setConfig() {
        document.querySelector("#pistaFondo").load();
        maxMovesIndicator.innerText = levels[currentLevel].maxMoves;
        
        let table       = document.querySelector(".mesa");
        let deckCards   = levels[currentLevel].cardGroup;
        let mixedCards  = shuffleCards(deckCards);
      
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

    exitGame() {
        if (relaxMode === true) {
            relaxMode = false;
            btnMenu.style.display = "none";
        }
        let intro = document.querySelector("#pistaFondo");
        let auxiliar = document.querySelectorAll(".auxiliar");
        auxiliar.forEach(function(elemento) {
            elemento.classList.remove('visible');
        });

        moves = 0;
        document.querySelector("#mov").innerText = moves;
        // clearInterval(time);
        currentLevel = 0;
        mainScreen.style.display = 'flex';
        intro.play();
        console.log(`Movimientos: ${moves}`);
    }

    movesCounter = () => {
        let totalMov = levels[currentLevel].maxMoves;
        let movimientosTexto;
        moves++;
        if (moves < 10) {
            movimientosTexto = "0" + moves;
        }
        movimientosTexto = moves;
        document.querySelector("#mov").innerText = movimientosTexto;

        if (moves === totalMov && relaxMode === false) {
            let settings = {
                title: "Movimientos agotados",
                text: "Has sobrepasado el límite de movimientos de este nivel"
            };
            
            gameOver(settings);
        }
        return;
    }

    //----- FUNCION COMPARA CARTAS ----
    compareCards(descubiertas) {
        // comparamos el atributo dataset para ver si tienen el mismo contenido
        if (descubiertas[0].dataset.contenido === descubiertas[1].dataset.contenido) {
        success(descubiertas);
        if (sonido) {
            successSound.play();
        }
    
        let tarjetasAcertadas = document.querySelectorAll(".acertada");
        //validamos que todas las cartas se hayan acertado
        if (tarjetasAcertadas.length === document.querySelectorAll(".carta").length) {
            setTimeout(function () {
            movimientos = 0;
            document.querySelector("#mov").innerText = movimientos;
            finalizar();
            clearInterval(time);
            }, 1000);
        }
        else {
            movesCounter();
        }
        }
        else {
        error(descubiertas);
        if (hasSound) {
            failSound.play();
        }
        movesCounter();
        }
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

    //----- FUNCION DE ACIERTO ----
    success(lasTarjetas) {
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
      
      
    //----- FUNCION DE VOLTEO DE CARTAS ----
    flip() {
        let descubiertas;
        let totalDescubiertas = document.querySelectorAll(".descubierta");
        
        if (totalDescubiertas.length > 1) {
            return;
        }
        this.classList.add("descubierta");
        flipSound.play();
        descubiertas = document.querySelectorAll(".descubierta");
        
        if (descubiertas.length < 2) {
            return;
        }
        let tarjetas = document.querySelectorAll(".descubierta .carta-Valor");
        compareCards(tarjetas);
    }
    
}

const game = new GameFunctions()
const { setConfig, exitGame, shuffleCards, flip, compareCards, error, success, movesCounter } = game


//Archivo main
const startGame = () => {
    mainScreen.style.display = "none";
    setConfig();
    runTimer();
}

const minutesIndicator = document.querySelector("#minutos")
const secondsIndicator = document.querySelector("#segundos")
//Sonidos
btnSound       = document.getElementById("sonido");
btnMute        = document.getElementById("mute");
flipSound      = document.querySelector("#volteo")
successSound   = document.querySelector("#acertado")
failSound      = document.querySelector("#fallo")
gameOverSound  = document.querySelector("#fallaste")


const runTimer = () => {
    let segundos = levels[currentLevel].maxSeconds;
    let minutos = levels[currentLevel].maxMinutes;
    
    // if (relaxMode === true) {
    //     return;
    // }
    // else {
    //     const time = setInterval(actualizaTiempo, 1000);
    // }

    const timer = () => {
        let segundosTexto;
        let minutosTexto;
    
        segundos--;
        if (segundos < 0) {
            segundos = 59;
            minutos--;
        }
    
        if (minutos < 0) {
            segundos = 0;
            minutos = 0;
    
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
        
        minutesIndicator.innerText = minutosTexto;
        secondsIndicator.innerText = segundosTexto;
    }
    
    time = setInterval(timer, 1000);
}

const gameOver = (settings) => {
    clearInterval(time);
    const gameOverModal = document.querySelector("#gameOver");

    document.querySelector("#mov").innerText = moves;
    let modalFailed = modal.getInstance("failed");
    gameOverSound.play();
    
    if (!settings) {
        gameOverModal.innerHTML = modalFailed.render();
        gameOverModal.classList.add("visible");
        document.querySelector("#btn-exit").addEventListener("click", exitGame);
        return
    }
    gameOverModal.innerHTML = modalFailed.render(settings);
    gameOverModal.classList.add("visible");
    document.querySelector("#btn-exit").addEventListener("click", exitGame);
}

function finalizar() { //==========================================================
  if (nivelActual === niveles.length) {
    document.querySelector("#endGame").classList.add("visible");
    return;
  }
  else {
    document.querySelector("#subeNivel").classList.add("visible");
  }
}

const levelUp = () => {
  currentLevel++;
  if (currentLevel === levels.length) {
    finalizar();
  }
  maxMovesIndicator.innerText = levels[currentLevel].maxMoves;
  let levelIndicator = currentLevel + 1;

  if (levelIndicator < 10) {
    level.innerText = "0" + levelIndicator;
  }

  document.querySelector("#subeNivel").classList.remove("visible");
  setConfigs();
  runTimer();
}

//---------- FUNCION REINICIAR -----------------
function reiniciar() {
  let auxiliarModal = document.querySelectorAll(".auxiliar");
  auxiliarModal.forEach(function(elemento) {
    elemento.classList.remove('visible');
  });
  movimientos = 0;
  clearInterval(tiempo);
  nivelActual = 0;
  Iniciar();
}

// TRIGGERS
const btnStart = document.querySelector(".btn-start");
btnStart.addEventListener("click", startGame)

const mainScreen = document.querySelector(".pantallaInicio")

