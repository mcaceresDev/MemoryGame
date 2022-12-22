// Archivo Environment
class Environment {
    instance
    currentLevel = 0;
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
const { currentLevel } = env

// Archivo de funciones del juego
class GameFunctions {
    
}


//Archivo main
const startGame = () => {
    mainScreen.style.display = "none";
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

let segundos = niveles[currentLevel].maxSeconds;
let minutos = niveles[currentLevel].maxMinutes;

const runTimer = () => {
    let segundosTexto;
    let minutosTexto;

    if (modoRelax === true) {
        return;
    }
    else {
        const time = setInterval(actualizaTiempo, 1000);
    }
}

const timer = () => {
    segundos--;
    if (segundos < 0) {
        segundos = 59;
        minutos--;
    }

    if (minutos < 0) {
        segundos = 0;
        minutos = 0;

        clearInterval(time);
        // gameOver();
        gameOverSound.play();
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

// TRIGGERS
const btnStart = document.querySelector(".btn-start");
btnStart.addEventListener("click", startGame)

const mainScreen = document.querySelector(".pantallaInicio")

