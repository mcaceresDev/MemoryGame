
//---------- VARIABLES GLOBALES ------------
class Environment {
    static instance

    cards
    movesCounter   
    currentLevel
    levels
    timer
    isRelaxMode = false
    hasSound = true
    
    /* Elementos HTML */
    levelIndicator = document.querySelector("#nivel")
    movesIndicator = document.querySelector("#movTotal")
    btnCloseMenu   = document.querySelector(".btn-cierre");
    btnBurguer     = document.querySelector('#burguer')
    
    btnSound       = document.getElementById("sonido");
    btnMute        = document.getElementById("mute");
    flipSound      = document.querySelector("#volteo")
    successSound   = document.querySelector("#acertado")
    failSound      = document.querySelector("#fallo")
    gameOverSound  = document.querySelector("#fallaste")

    /* Elementos interactivos */
    cards = [
        ['A', 'B', 'E', 'G'],
        ['C', 'D', 'N', 'O', 'S', 'K'],
        ['M', 'H', 'V', 'L', 'X', 'Y', 'R', 'Q'],
        ['Z', 'I', 'F', 'W', '[', 'T', '_', '^', 'U', ']']
    ];

    levels = [
        {
            cardGroup: cards[0],
            maxMoves: 8,
            maxMinutes: 0,
            maxSeconds: 20
        },
        {
            cardGroup: cards[1],
            maxMoves: 12,
            maxMinutes: 0,
            maxSeconds: 40
        },
        {
            cardGroup: cards[2],
            maxMoves: 20,
            maxMinutes: 1,
            maxSeconds: 0
        },
        {
            cardGroup: cards[3],
            maxMoves: 25,
            maxMinutes: 1,
            maxSeconds: 0
        },
        {
            cardGroup: cards[2].concat(cards[0]),
            maxMoves: 30,
            maxMinutes: 1,
            maxSeconds: 20
        }
    ];

    constructor(){
        if (Environment.instance) {
            return Environment.instance;
        }
        
        Environment.instance = Environment;
    }
}

const env = new Environment()